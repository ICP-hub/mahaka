import Types "./Types";
import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import NFTactor "../DIP721-NFT/Nft";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Error "mo:base/Error";
import List "mo:base/List";
import StableTrieMap "mo:stable-trie/Map";
import Cycles "mo:base/ExperimentalCycles";
import Nat64 "mo:base/Nat64";
import Region "mo:base/Region";
import Utils "./Utils";

actor {
     public type Index = Nat64;
     public type Elem = {
        pos : Nat64;
        size : Nat64;
     };

     public type state = {
        bytes : Region.Region;
        var bytes_count : Nat64;
        elems : Region.Region;
        var elems_count : Nat64;
     };

     var _venueMap = TrieMap.TrieMap<Text, Index>(Text.equal,Text.hash);
     private stable var _stableVenueArray :[(Text,Index)] = [];

     stable var Venue_state = {
        bytes = Region.new();
        var bytes_count : Nat64 = 0;
        elems = Region.new ();
        var elems_count : Nat64 = 0;
    };

    // ---------------------------------------------------------------------------------------------------------------------------------
    func regionEnsureSizeBytes(r : Region, new_byte_count : Nat64) {
        let pages = Region.size(r);
        if (new_byte_count > pages << 16) {
        let new_pages = ((new_byte_count + ((1 << 16) - 1)) / (1 << 16)) - pages;
        assert Region.grow(r, new_pages) == pages
        }
    };

    let elem_size = 16 : Nat64;

    func stable_get(index : Index , state : state) : async Blob {
        assert index < state.elems_count;
        let pos = Region.loadNat64(state.elems, index * elem_size);
        let size = Region.loadNat64(state.elems, index * elem_size + 8);
        let elem = { pos ; size };
        Region.loadBlob(state.bytes, elem.pos, Nat64.toNat(elem.size))
    };

    func stable_add(blob : Blob , state : state) : async Index {
        let elem_i = state.elems_count;
        state.elems_count += 1;

        let elem_pos = state.bytes_count;
        state.bytes_count += Nat64.fromNat(blob.size());

        regionEnsureSizeBytes(state.bytes, state.bytes_count);
        Region.storeBlob(state.bytes, elem_pos, blob);

        regionEnsureSizeBytes(state.elems, state.elems_count * elem_size);
        Region.storeNat64(state.elems, elem_i * elem_size + 0, elem_pos);
        Region.storeNat64(state.elems, elem_i * elem_size + 8, Nat64.fromNat(blob.size  ()));
        elem_i
  }; 

  func update_stable(index : Index , blob : Blob , state : state) : async Index {
    assert index < state.elems_count;
    let pos = Region.loadNat64(state.elems, index * elem_size);
    let size = Region.loadNat64(state.elems, index * elem_size + 8);
    let elem = { pos ; size };
    Region.storeBlob(state.bytes, elem.pos, blob);
    Region.storeNat64(state.elems, index * elem_size + 8, Nat64.fromNat(blob.size()));
    index
    };

//     --------------------------------------------------------------------------------------------------------------------

     
     public shared ({caller}) func createVenue(collection_details : Types.venueCollectionParams, _title : Text,_capacity : Nat, _details : Types.venueDetails , _description : Text) : async (id : Text,  venue :Types.Venue) {
          let id = caller;
          Cycles.add<system>(500_500_000_000);
          let venueCollection = await NFTactor.Dip721NFT(collection_details.custodian, collection_details.collection_args);
          ignore await venueCollection.wallet_receive();
          let venueCollectionId = await venueCollection.getCanisterId();
          let venue_id =  _title # "-" # Principal.toText(venueCollectionId) ;
          let Venue : Types.Venue = {
               Collection_id : Principal = venueCollectionId;
               Description : Text = _description;
               Details : Types.venueDetails = _details;
               Events : List.List<Types.Events> = List.nil<Types.Events>();
               Title : Text = _title;
               capacity : Nat = _capacity;
               id : Text = venue_id;
          };
          let venue_blob = to_candid(Venue);
          let Venue_index = await stable_add(venue_blob, Venue_state);
          _venueMap.put(venue_id, Venue_index);
          return (venue_id,Venue);
     };

     public shared ({caller}) func getVenue(Venue_id : Text) : async (Principal, Types.Venue) {
          let venue_blob: ?Index = _venueMap.get(Venue_id);
          switch (venue_blob) {
               case null {
                    throw Error.reject("Venue not found");
               };
               case (?v){
                    let venue_blob = await stable_get(v, Venue_state);
                    let venue : ?Types.Venue = from_candid(venue_blob);
                    switch (venue) {
                         case null {
                              throw Error.reject("Venue not found");
                         };
                         case (?v) {
                              return (caller, v);
                         };
                    };
               };
          };
     };

     public shared ({caller}) func updateVenue( Venue_id : Text , Venue : Types.Venue) : async (Principal, Types.Venue) {
          let id = caller;
          switch(_venueMap.get(Venue_id)){
               case null {
                    throw Error.reject("Venue not found");
               };
               case (?v){
                    let venue_blob = to_candid(Venue);
                    let Venue_index = await update_stable(v, venue_blob, Venue_state);
                    _venueMap.put(Venue_id, Venue_index);
                    return (caller, Venue);
               };
          };
     };

     public shared func deleteVenue(Venue_id : Text) : async (Bool,?Types.Venue) {
          switch(_venueMap.get(Venue_id)){
               case null {
                    throw Error.reject("Venue not found");
               };
               case (?v){
                    let venue_blob = await stable_get(v, Venue_state);
                    let venue : ?Types.Venue = from_candid(venue_blob);
                    _venueMap.delete(Venue_id);
                    return (true,venue);
               };
          };
     };

     public shared func getAllVenues(chunkSize : Nat , pageNo : Nat) : async {data : [Types.Venue] ; current_page : Nat ; Total_pages : Nat} {
          var venues = List.nil<Types.Venue>();
          for ((venue_id, venue_index) in _venueMap.entries()) {
               let venue_blob = await stable_get(venue_index, Venue_state);
               let venue : ?Types.Venue = from_candid(venue_blob);
               switch (venue) {
                    case null {
                         throw Error.reject("Venue not found");
                    };
                    case (?v) {
                         venues := List.push(v,venues);
                    };
               };
          };
          let index_pages = Utils.paginate<Types.Venue>(List.toArray(venues), chunkSize);
          if (index_pages.size() < pageNo) {
            throw Error.reject("Page not found");
          };
          if (index_pages.size() == 0) {
            throw Error.reject("No products found");
          };
          let pages_data = index_pages[pageNo];
          return {data = pages_data; current_page = pageNo + 1 ; Total_pages = index_pages.size()};
     };


}
