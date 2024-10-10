import Types "./Types";
import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import NFTactor "../DIP721-NFT/Nft";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Error "mo:base/Error";
import List "mo:base/List";
// import StableTrieMap "mo:stable-trie/Map";
import Cycles "mo:base/ExperimentalCycles";
import Nat64 "mo:base/Nat64";
import Region "mo:base/Region";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
// import Uuid "mo:uuid/UUID";
import Utils "./Utils";
import nftTypes "../DIP721-NFT/Types";
import ICRCactor "../ICRC/ICRC"
actor mahaka {


     var _venueMap = TrieMap.TrieMap<Text, Types.Index>(Text.equal,Text.hash);
     private stable var _stableVenueArray :[(Text,Types.Index)] = [];

     stable var Venue_state = {
        bytes = Region.new();
        var bytes_count : Nat64 = 0;
        elems = Region.new ();
        var elems_count : Nat64 = 0;
    };

     var _EventsMap = TrieMap.TrieMap<Text, Types.Index>(Text.equal,Text.hash);
     private stable var _stableEventsArray : [(Principal,Types.Index)] = [];

     stable var Events_state = {
        bytes = Region.new();
        var bytes_count : Nat64 = 0;
        elems = Region.new ();
        var elems_count : Nat64 = 0;
     };

     var _WahanaMap = TrieMap.TrieMap<Text, Types.Index>(Text.equal, Text.hash);
     private stable var _stableWahanaArray : [(Principal, Types.Index)] = [];

     stable var Wahana_state = {
          bytes = Region.new();
          var bytes_count : Nat64 = 0;
          elems = Region.new ();
          var elems_count : Nat64 = 0;
     };

     // private stable var _eventList : List.List<(Types.venueId, List.List<Types.completeEvent>)> = List.nil<(Types.venueId, List.List<Types.completeEvent>)>();

     private var Users = TrieMap.TrieMap<Principal, Types.Index>(Principal.equal, Principal.hash);
     private var _stableusers : [(Principal, Types.Index)] = [];

     stable var Users_state = {
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
        };
     };

    let elem_size = 16 : Nat64;

    func stable_get(index : Types.Index , state : Types.state) : async Blob {
        assert index < state.elems_count;
        let pos = Region.loadNat64(state.elems, index * elem_size);
        let size = Region.loadNat64(state.elems, index * elem_size + 8);
        let elem = { pos ; size };
        Region.loadBlob(state.bytes, elem.pos, Nat64.toNat(elem.size))
    };

    func stable_add(blob : Blob , state :Types.state) : async Types.Index {
        let elem_i = state.elems_count;
        state.elems_count += 1;

        let elem_pos = state.bytes_count;
        state.bytes_count += Nat64.fromNat(blob.size());

        regionEnsureSizeBytes(state.bytes, state.bytes_count);
        Region.storeBlob(state.bytes, elem_pos, blob  );

        regionEnsureSizeBytes(state.elems, state.elems_count * elem_size);
        Region.storeNat64(state.elems, elem_i * elem_size + 0, elem_pos);
        Region.storeNat64(state.elems, elem_i * elem_size + 8, Nat64.fromNat(blob.size  ()));
        elem_i
  }; 

  func update_stable(index : Types.Index , blob : Blob , state : Types.state) : async Types.Index {
    assert index < state.elems_count;
    let pos = Region.loadNat64(state.elems, index * elem_size);
    let size = Region.loadNat64(state.elems, index * elem_size + 8);
    let elem = { pos ; size };
    Region.storeBlob(state.bytes, elem.pos, blob);
    Region.storeNat64(state.elems, index * elem_size + 8, Nat64.fromNat(blob.size()));
    index
    };

//     --------------------------------------------------------------------------------------------------------------------

     
     public shared ({caller = user}) func createVenue(collection_details : Types.venueCollectionParams, _title : Text,_capacity : Nat, _details : Types.venueDetails , _description : Text) : async (id : Text,  venue :Types.Venue) {
          Cycles.add<system>(500_500_000_000);
          let venueCollection = await NFTactor.Dip721NFT(Principal.fromActor(mahaka), collection_details.collection_args);
          ignore await venueCollection.wallet_receive();
          let new_custodian = await venueCollection.addcustodians(user);
          Debug.print(" New added custodian is : " # debug_show (new_custodian));
          let nftcustodians = await venueCollection.showcustodians();
          Debug.print("These are the list of current custodians : " #debug_show (nftcustodians));
          let venueCollectionId = await venueCollection.getCanisterId();
          let venue_id =  _title # "#" # Principal.toText(venueCollectionId) ;
          let Venue : Types.Venue = {
               logo = collection_details.collection_args.logo;
               banner = collection_details.collection_args.banner;
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
          let venue_blob: ?Types.Index = _venueMap.get(Venue_id);
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

     public shared ({caller}) func updateVenue( Venue_id : Text, events : [Types.Events] ,  Title : Text,
        Description : Text,
        Details : Types.venueDetails,
        capacity : Nat,
        logo : Types.LogoResult,
        banner : Types.LogoResult
        ) : async (Principal, Types.Venue) {
          
          switch(_venueMap.get(Venue_id)){
               case null {
                    throw Error.reject("Venue not found");
               };
               case (?v){
                    let collection_id = await Utils.extractCanisterId(Venue_id);
                    let Venue : Types.Venue = {
                         id = Venue_id;
                         Title = Title;
                         logo = logo;
                         banner = banner;
                         Description : Text;
                         Details = Details;
                         Events = List.fromArray(events);
                         capacity = capacity;
                         Collection_id = Principal.fromText(collection_id);
                    };
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

     public shared ({caller = user})  func createEvent( venueId : Types.venueId, Event : Types.Events, eCollection : Types.eventCollectionParams) : async  Types.completeEvent {
          Cycles.add<system>(500_500_000_000);
          let eventCollection = await NFTactor.Dip721NFT(Principal.fromActor(mahaka), eCollection.collection_args);
          let new_custodian = await eventCollection.addcustodians(user);
          Debug.print(" New added custodian is : " # debug_show (new_custodian));
          let nftcustodians = await eventCollection.showcustodians();
          Debug.print("These are the list of current custodians : " #debug_show (nftcustodians));
          ignore await eventCollection.wallet_receive();
          let eventCollectionId = await eventCollection.getCanisterId();
          let eventId =  Event.title # "#" # Principal.toText(eventCollectionId);
          let _event : Types.completeEvent = {
               id = eventId;
               description = Event.description;
               details = Event.details;
               logo = Event.logo;
               banner =Event.banner ;
               gTicket_limit = Event.gTicket_limit;
               sTicket_limit = Event.sTicket_limit;
               title = Event.title;
               vTicket_limit = Event.vTicket_limit;
               event_collectionid = await eventCollection.getCanisterId();
          };
          let Events : Types.Events_data = {
               Events = List.push(_event, List.nil<Types.completeEvent>()); 
          };

          let event_blob = to_candid(Events);
          let Event_index = await stable_add(event_blob, Events_state);
          _EventsMap.put(venueId, Event_index);
          return _event;
     };

     public shared func getallEventsbyVenue(chunkSize : Nat , pageNo : Nat, venueId : Types.venueId) : async {data : [Types.completeEvent] ; current_page : Nat ; Total_pages : Nat} {
          let events_object = _EventsMap.get(venueId);
          switch (events_object){
               case null {
                    throw (Error.reject("No event found in the venue"));
               };
               case (?v){
                    let events_object_blob = await stable_get(v,Events_state);
                    let events_object : ?Types.Events_data = from_candid(events_object_blob);
                    switch (events_object){
                         case null {
                              throw (Error.reject("No object found in the memory"));
                         };
                         case (?v){
                              let events_list = v;
                              let index_pages = Utils.paginate<Types.completeEvent>(List.toArray(events_list.Events), chunkSize);
                              if (index_pages.size() < pageNo) {
                                   throw Error.reject("Page not found");
                              };
                              if (index_pages.size() == 0) {
                                   throw Error.reject("No products found");
                              };
                              let pages_data = index_pages[pageNo];
                              return {data = pages_data; current_page = pageNo + 1; Total_pages = index_pages.size()};
                         };
                    };
               };
          }; 
     };

     public shared ({caller = user}) func edit_event(eventId : Text, venueId : Types.venueId ,  _eCollection : Types.eventCollectionParams , _event : Types.Events) : async Text {
          let events_object = _EventsMap.get(venueId);
          switch (events_object){
               case null {
                    throw (Error.reject("No Events Found in the Venue"));
               };
               case (?v){
                    let events_object_blob = await stable_get(v,Events_state);
                    let events_object : ?Types.Events_data = from_candid(events_object_blob);
                    switch (events_object) {
                         case null {
                              throw (Error.reject("No object found in the memory"));
                         };
                         case (?val){
                              var events_list = val.Events;
                              let event = List.find<Types.completeEvent>(
                                   events_list,
                                   func x {x.id == eventId}
                              );
                              switch(event){
                                   case null {
                                        throw (Error.reject("Event not found in the list"));
                                   };
                                   case (?event){
                                        let result = await Utils.is_event_editable(event);
                                        assert( result == true);
                                        Cycles.add<system>(500_500_000_000);
                                        let eventCollection = await NFTactor.Dip721NFT(Principal.fromActor(mahaka), _eCollection.collection_args);
                                        let new_custodian = await eventCollection.addcustodians(user);
                                        Debug.print(" New added custodian is : " # debug_show (new_custodian));
                                        let nftcustodians = await eventCollection.showcustodians();
                                        Debug.print("These are the list of current custodians : " #debug_show (nftcustodians));
                                        ignore await eventCollection.wallet_receive();
                                        let eventCollectionId = await eventCollection.getCanisterId();
                                        let eventId =  _event.title # "#" # Principal.toText(eventCollectionId);
                                        let _events : Types.completeEvent = {
                                             id = eventId;
                                             description = _event.description;
                                             details =_event.details;
                                             logo = _event.logo;
                                             banner =_event.banner ;
                                             gTicket_limit = _event.gTicket_limit;
                                             sTicket_limit = _event.sTicket_limit;
                                             title = _event.title;
                                             vTicket_limit = _event.vTicket_limit;
                                             event_collectionid = await eventCollection.getCanisterId();
                                        };
                                        events_list := List.push(_events,events_list);
                                        return "Event Edited and created";
                                   };
                              };
                         };
                    };
               };
          };
     };



     /*********************************************************/
     /*                   Tickets Handlig                     */
     /*********************************************************/

    
     public shared ({caller}) func buyVenueTicket(venueId : Types.venueId, _ticket_type : Types.ticket_info, _metadata : nftTypes.MetadataDesc ) : async nftTypes.MintReceipt {
          let collection_id = await Utils.extractCanisterId(venueId);
          let collection_actor = actor (collection_id) : actor {
               logoDip721 : () -> async Types.LogoResult;
               mintDip721 : (to : Principal, metadata : Types.MetadataDesc ,ticket_details : nftTypes.ticket_type, logo : Types.LogoResult) -> async nftTypes.MintReceipt;
          };
          let _logo = await collection_actor.logoDip721();
          let _ticket = await collection_actor.mintDip721(caller,_metadata,_ticket_type.ticket_type,_logo);
     
          return _ticket;
     };

     public shared ({caller}) func buyEventTicket(_venueId : Text,_eventId : Text, _ticket_type : Types.ticket_info, _metadata : nftTypes.MetadataDesc) : async nftTypes.MintReceipt {
          switch(_EventsMap.get(_venueId)){
               case null {
                    throw(Error.reject("No venue dound for the events"));
               };
               case (?Event_index){
                    let event_blob = await stable_get(Event_index,Events_state);
                    let event_object :?Types.Events_data = from_candid(event_blob);
                    switch(event_object){
                         case null {
                              throw(Error.reject("No object found for this blob in the memory"));
                         };

                         case (?e){
                              let events_list = e.Events;
                              let event = List.find<Types.completeEvent>(
                                   events_list,
                                   func x {x.id == _eventId}
                              );
                              switch (event){
                                   case null (
                                        throw (Error.reject("No Event found")) 
                                   );
                                   case (?_event){
                                        let collection_actor = actor (Principal.toText(_event.event_collectionid)) : actor {
                                        logoDip721 : () -> async Types.LogoResult;
                                        mintDip721 : (to : Principal, metadata : Types.MetadataDesc ,ticket_details : nftTypes.ticket_type, logo : Types.LogoResult) -> async nftTypes.MintReceipt;                                        
                                        };
                                        let _logo = await collection_actor.logoDip721();
                                        let _ticket = await collection_actor.mintDip721(caller,_metadata,_ticket_type.ticket_type,_logo);
                                        return _ticket;
                                   };
                              };                           
                         };
                    };
               };
          };
     };

     /*********************************************************/
     /*                   User CRUD                           */
     /*********************************************************/

    public shared ({ caller }) func updateUser(email : Text, firstName : Text, lastName : Text) : async Result.Result<(Types.User, Types.Index), Types.UpdateUserError> {
        /*  if (Principal.isAnonymous(msg.caller)) {
      return #err(#UserNotAuthenticated); // We require the user to be authenticated,
    }; */

        if (email == "") { return #err(#EmptyEmail) };
        if (firstName == "") { return #err(#EmptyFirstName) };
        if (lastName == "") { return #err(#EmptyLastName) };

        let user = {
            id = caller;
            email = email;
            firstName = firstName;
            lastName = lastName;
        };
        switch(Users.get(caller)){

            case null {
                let user_blob = to_candid(user);
                Debug.print(debug_show(user_blob));
                let user_index = await stable_add(user_blob, Users_state);
                Users.put(caller, user_index);
                return #ok(user, user_index);
            };
            case (?v){
                let user_blob = to_candid(user);
                let user_index = await update_stable(v, user_blob, Users_state);
                return #ok(user, user_index);
            };
        };
    };

    public shared ({ caller }) func getUserdetailsbycaller() : async Result.Result<Types.User, Types.GetUserError> {
        let index = Users.get(caller);
        switch(index){
            case null {
                return #err(#UserNotFound);
            };

            case (?val){
                let user_blob = await stable_get(val, Users_state);
                Debug.print("The blob for the " # debug_show(caller) # " is: " # debug_show(user_blob));
                let user : ?Types.User = from_candid(user_blob);
                Debug.print("The user data for the " # debug_show(caller) # " is: " # debug_show(user));
                switch(user){
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case(?v){
                        return #ok(v);
                    };
                };
            };
        };
    };

    public shared func getUserdetailsbyid(id : Principal) : async Result.Result<Types.User, Types.GetUserError> {
        let user = Users.get(id);
        switch(user){
            case null {
                return #err(#UserNotFound);
            };

            case (?val){
                let user_blob = await stable_get(val, Users_state);
                Debug.print("The blob for the " # debug_show(id) # " is: " # debug_show(user_blob));
                let user : ?Types.User = from_candid(user_blob);
                Debug.print("The user data for the " # debug_show(id) # " is: " # debug_show(user));
                switch(user){
                    case null {
                        throw Error.reject("no blob found in stable memory for the caller");
                    };
                    case(?v){
                        return #ok(v);
                    };
               };
          };
     };        
};

    // 📍📍📍📍📍
    public shared func listUsers(chunkSize : Nat , PageNo : Nat) : async{data : [Types.User]; current_page : Nat; total_pages : Nat} {
        let index_pages =  Utils.paginate<(Principal , Types.Index)>(Iter.toArray(Users.entries()), chunkSize);
        if (index_pages.size() < PageNo) {
            throw Error.reject("Page not found");
        };
        if (index_pages.size() == 0) {
            throw Error.reject("No users found");
        };

        // let data_page:[Types.User] = Array.tabulate<>(index_pages[pageNo],func x(1) = from_candid(x(1)));
        var pages_data = index_pages[PageNo];
        var user_list = List.nil<Types.User>();
        for ((k,v) in pages_data.vals()) {
            
            let user_blob = await stable_get(v, Users_state);
            let user : ?Types.User = from_candid(user_blob);
            switch(user){
                case null {
                    throw Error.reject("no blob found in stable memory for the caller");
                };
                case(?val){
                    user_list := List.push(val, user_list);
                };
            };
        };
        return { data = List.toArray(user_list); current_page = PageNo + 1; total_pages = index_pages.size(); };
    };

     /*********************************************************/
     /*                   Wahana Handling                     */
     /*********************************************************/

     public shared ({caller = user}) func createWahana(venueId : Text,_name : Text , _symbol : Text, _decimals : Nat8 , _totalSupply :Nat , description : Text , banner : Types.LogoResult, priceinusd : Text) : async Types.wahana_details {
          Cycles.add<system>(500_000_000_000);
          let initial_mints = [{
               account = { owner = Principal.fromActor(mahaka); subaccount = null };
               amount = _totalSupply;
          }];

          let init = {
               decimals : Nat8 = _decimals;
               initial_mints : [{
               account : {
                    owner : Principal;
                    subaccount : ?Blob;
               };
               amount : Nat;
               }] = initial_mints;
               minting_account : {
                    owner : Principal;
                    subaccount : ?Blob;
               } = { owner = user; subaccount = null };
               token_name : Text = _name;
               token_symbol : Text = _symbol;
               transfer_fee : Nat = 0;
          };

          let Wahanatokens = await ICRCactor.Ledger(init);
          let wahana_id = Principal.fromActor(Wahanatokens);
          ignore await Wahanatokens.wallet_receive();
          
          let wahana_details : Types.wahana_details = {
               id = Principal.toText(wahana_id);
               banner = banner;
               description = description;
               priceinusd = priceinusd;
               ride_title = _name;
          };

          let wahana_blob = to_candid(wahana_details);
          let wahana_index = await stable_add(wahana_blob,Wahana_state);
          _WahanaMap.put(venueId,wahana_index);
          return wahana_details;
     }; 


}

