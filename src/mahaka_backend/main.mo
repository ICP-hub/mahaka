import Types "./Types";
import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import NFTactor "../DIP721-NFT/Nft";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Error "mo:base/Error";
import StableTrieMap "mo:stable-trie/Map";

actor {
     var _venueMap = StableTrieMap.Map({
          aridity : Nat = 2;
          key_size : Nat = 2;
          pointer_size : Nat =  2;
          root_aridity : ?Nat = null;
          value_size : Nat = 2;
     });

     public shared ({caller}) func createVenue(_title : Text,_capacity : Nat, _details : Types.venueDetails , _description : Text) : async (Principal, Types.Venue) {
          let id = Principal.toBlob(caller);

          let venueCollection = NFTactor.createCollection();

          let Venue : Types.Venue = {
               Collection_id : Principal = ;
               Description : Text = _description;
               Details : venueDetails = _details;
               Events : List<Events>;
               Title : Text = _title;
               capacity : Nat = _capacity;
               id : Text = ;
          };
          let venue_blob = to_candid(Venue);
          _venueMap.put(id, venue_blob);
          return (caller, Venue);
     };

     public shared ({caller}) func getVenue() : async (Principal, Types.Venue) {
          let id = Principal.toBlob(caller);
          let venue_blob: ?Blob = _venueMap.get(id);
          switch (venue_blob) {
               case null {
                    throw Error.reject("Venue not found");
               };
               case (?v){
                    let venue : ?Types.Venue = from_candid(v);
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

     public shared ({caller}) func updateVenue(Venue : Types.Venue) : async (Principal, Types.Venue) {
          let id = Principal.toBlob(caller);
          let venue_blob = to_candid(Venue);
          _venueMap.put(id, venue_blob);
          return (caller, Venue);
     };

     public shared ({caller}) func deleteVenue() : async Bool {
          let id = Principal.toBlob(caller);
           let deleted_blob : ?Blob = _venueMap.remove(id);
           switch (deleted_blob) {
               case null {
                    return false;
               };
               case (?v){
                    return true;
               };
           };
     };



}
