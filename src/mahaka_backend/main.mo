import Types "./Types";
import TypesICRC "../ICRC/Types";
import Validation "./Validation";
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
import Time "mo:base/Time";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Float "mo:base/Float";
import Nat16 "mo:base/Nat16";
import Timer "mo:base/Timer";
// import Uuid "mo:uuid/UUID";
import Utils "./Utils";
import nftTypes "../DIP721-NFT/Types";
import ICRCactor "../ICRC/ICRC";
import icrcTypes "../ICRC/Types";
import Http "../FiatPayment/http";
import FiatTypes "../FiatPayment/types";
import Interface "../ic-management-interface";


actor mahaka {

     let IC = "aaaaa-aa";
     let ic = actor(IC) : Interface.Self;


     var _venueMap = TrieMap.TrieMap<Text, Types.Index>(Text.equal,Text.hash);
     private stable var _stableVenueArray :[(Text,Types.Index)] = [];

     stable var Venue_state = {
        bytes = Region.new();
        var bytes_count : Nat64 = 0;
        elems = Region.new ();
        var elems_count : Nat64 = 0;
    };

     var _EventsMap = TrieMap.TrieMap<Text, Types.Index>(Text.equal,Text.hash);
     private stable var _stableEventsArray : [(Text,Types.Index)] = [];

     stable var Events_state = {
        bytes = Region.new();
        var bytes_count : Nat64 = 0;
        elems = Region.new ();
        var elems_count : Nat64 = 0;
     };

     var _WahanaMap = TrieMap.TrieMap<Text, Types.Index>(Text.equal, Text.hash);
     private stable var _stableWahanaArray : [(Text, Types.Index)] = [];

     stable var Wahana_state = {
          bytes = Region.new();
          var bytes_count : Nat64 = 0;
          elems = Region.new ();
          var elems_count : Nat64 = 0;
     };

     var _VenueTicketsMap = TrieMap.TrieMap<Text, Types.Index>(Text.equal, Text.hash);
     private stable var _stableVenueTicketsArray : [(Text, Types.Index)] = [];

     var _EventTicketsMap = TrieMap.TrieMap<Text, Types.Index>(Text.equal, Text.hash);
     private stable var _stableEventTicketsArray : [(Text, Types.Index)] = [];

     var _WahanaTicketsMap = TrieMap.TrieMap<Text, Types.Index>(Text.equal, Text.hash);
     private stable var _stableWahanaTicketsArray : [(Text, Types.Index)] = [];

     stable var Ticket_state = {
          bytes = Region.new();
          var bytes_count : Nat64 = 0;
          elems = Region.new ();
          var elems_count : Nat64 = 0;
     };


     private var Users = TrieMap.TrieMap<Principal, Types.Index>(Principal.equal, Principal.hash);
     private stable var _stableusers : [(Principal, Types.Index)] = [];

     stable var Users_state = {
          bytes = Region.new();
          var bytes_count : Nat64 = 0;
          elems = Region.new ();
          var elems_count : Nat64 = 0;
     };

     private stable var _AttractionBanner : [Types.AttractionBanner] = [];
     private stable var _thirdPartyBanner : [Types.AttractionBanner] = [];
     private stable var pendingPayments : [(Nat,Types.ArgsStore)] = [];
     private stable var pendingPaymentsWahana : [(Nat,Types.ArgsStoreWahana)] = [];


     private var testimonial = TrieMap.TrieMap<Principal, Types.Index>(Principal.equal, Principal.hash);
     private stable var _stableTestimonial : [(Principal, Types.Index)] = [];

     stable var Testimonial_state = {
          bytes = Region.new();
          var bytes_count : Nat64 = 0;
          elems = Region.new ();
          var elems_count : Nat64 = 0;
     };


     // Dashboard stats
     private stable var totalTickets : Nat = 0;
     private stable var totalRevenue : Float = 0.0;
     private stable var users : Nat = 0;

     var eventTimerMap = TrieMap.TrieMap<Text, Timer.TimerId>(Text.equal, Text.hash);
     private stable var _stableeventTimerMap : [(Text, Timer.TimerId)] = [];


     // Payment recepient
     private stable var recepient : Principal = Principal.fromText("7yywi-leri6-n33rr-vskr6-yb4nd-dvj6j-xg2b4-reiw6-dljs7-slclz-2ae");

     public shared ({ caller }) func getRecepient() : async Result.Result<Principal, Text> {
          if (not Principal.isController(caller)) {
               throw Error.reject("You cannot control this canister");
               return #err("You cannot control this canister");
          };
          return #ok(recepient);
     };

     public shared ({ caller }) func setRecepient(recepientPrincipal : Principal) : async Result.Result<Principal, Text> {
          if (not Principal.isController(caller)) {
               throw Error.reject("You cannot control this canister");
               return #err("You cannot control this canister");
          };
          recepient := recepientPrincipal;
          return #ok(recepient);
     };

     public query func availableCycles() : async Nat {
        return Cycles.balance();
     };


//      let LedgerCanister = actor "ryjl3-tyaaa-aaaaa-aaaba-cai" : actor {
//         account_balance : shared query Types.BinaryAccountBalanceArgs -> async Types.Tokens;
//         icrc2_transfer_from : shared Types.TransferFromArgs -> async Types.Result_3;
//     };

     let FiatPayCanister = actor "bkyz2-fmaaa-aaaaa-qaaaq-cai" : actor {
        create_invoice : shared (Principal,FiatTypes.Request.CreateInvoiceBody) -> async Http.Response<Http.ResponseStatus<FiatTypes.Response.CreateInvoiceBody, {}>>;
        get_invoice : (Nat)->async Http.Response<Http.ResponseStatus<FiatTypes.Invoice, {}>>;
        get_all_invoices_to_admin : () -> async Http.Response<Http.ResponseStatus<[FiatTypes.Invoice], {}>>
    };

     system func preupgrade(){
          _stableVenueArray := Iter.toArray(_venueMap.entries());
          _stableEventsArray := Iter.toArray(_EventsMap.entries());
          _stableWahanaArray := Iter.toArray(_WahanaMap.entries());
          _stableVenueTicketsArray := Iter.toArray(_VenueTicketsMap.entries());
          _stableEventTicketsArray := Iter.toArray(_EventTicketsMap.entries());
          _stableWahanaTicketsArray := Iter.toArray(_WahanaTicketsMap.entries());
          _stableusers := Iter.toArray(Users.entries());
          _stableTestimonial := Iter.toArray(testimonial.entries());
          _stableeventTimerMap := Iter.toArray(eventTimerMap.entries());
     };

     system func postupgrade(){
          _venueMap := TrieMap.fromEntries(_stableVenueArray.vals(), Text.equal, Text.hash);
          _EventsMap := TrieMap.fromEntries(_stableEventsArray.vals(), Text.equal, Text.hash);
          _WahanaMap := TrieMap.fromEntries(_stableWahanaArray.vals(), Text.equal, Text.hash);
          _VenueTicketsMap := TrieMap.fromEntries(_stableVenueTicketsArray.vals(), Text.equal, Text.hash);
          _EventTicketsMap := TrieMap.fromEntries(_stableEventTicketsArray.vals(), Text.equal, Text.hash);
          _WahanaTicketsMap := TrieMap.fromEntries(_stableWahanaTicketsArray.vals(), Text.equal, Text.hash);
          Users := TrieMap.fromEntries(_stableusers.vals(), Principal.equal, Principal.hash);
          testimonial := TrieMap.fromEntries(_stableTestimonial.vals(), Principal.equal, Principal.hash);
          eventTimerMap := TrieMap.fromEntries(_stableeventTimerMap.vals(), Text.equal, Text.hash);

     };


    // ----------------------------------------f-----------------------------------------------------------------------------------------
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

     func update_stable(index: Types.Index, blob: Blob, state: Types.state): async Types.Index {
          assert index < state.elems_count;

          let prev_pos = Region.loadNat64(state.elems, index * elem_size);
          let prev_size = Region.loadNat64(state.elems, index * elem_size + 8);
          let new_size = Nat64.fromNat(blob.size());

          if (new_size > prev_size) {
               let new_pos = state.bytes_count;
               state.bytes_count += new_size;

               regionEnsureSizeBytes(state.bytes, state.bytes_count);
               Region.storeBlob(state.bytes, new_pos, blob);
               Region.storeNat64(state.elems, index * elem_size, new_pos);
          } else {
          
               Region.storeBlob(state.bytes, prev_pos, blob);
          };

          Region.storeNat64(state.elems, index * elem_size + 8, new_size);
          index
     };

     public func getDIPdetails(id : Principal) : async nftTypes.Dip721NonFungibleToken{
          let collectionActor = actor (Principal.toText(id)) : actor {
               getDIP721details : ()-> async nftTypes.Dip721NonFungibleToken;
          };
          let details = await collectionActor.getDIP721details();
          return details;
     };

     func handleTransferError(error : Types.TransferFromError) : Text {
        switch (error) {
            case (#GenericError(record)) {
                return "Generic error: " # record.message # " (code: " # Nat.toText(record.error_code) # ")";
            };
            case (#InsufficientAllowance(record)) {
                return "Insufficient allowance: " # Nat.toText(record.allowance);
            };
            case (#BadBurn(record)) {
                return "Bad burn amount, minimum required: " # Nat.toText(record.min_burn_amount);
            };
            case (#Duplicate(record)) {
                return "Duplicate transaction of: " # Nat.toText(record.duplicate_of);
            };
            case (#BadFee(record)) {
                return "Bad fee, expected fee: " # Nat.toText(record.expected_fee);
            };
            case (#CreatedInFuture(record)) {
                return "Transaction created in the future. Ledger time: " # Nat.toText(Nat64.toNat(record.ledger_time));
            };
            case (#TooOld) {
                return "Transaction is too old.";
            };
            case (#InsufficientFunds(record)) {
                return "Insufficient funds. Available balance: " # Nat.toText(record.balance);
            };
            case (#TemporarilyUnavailable) {
                return "The system is temporarily unavailable. Please try again later.";
            };
        };
    };


    public shared ({caller}) func addBanner(_details: [Types.AttractionBanner]): async Result.Result<Text, Text> {
         // if (Principal.isAnonymous(user)) {
          //      return #err(#UserNotAuthenticated); 
          // }; 
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not ((await Validation.check_for_sysAdmin(role)) or (await Validation.check_for_Admin(role)))) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
        try {
            for (banner in _details.vals()) {
                switch (banner.category) {
                    case (#Attraction) {
                        _AttractionBanner := Array.append(_AttractionBanner, [banner]);
                    };
                    case (#ThirdParty) {
                        _thirdPartyBanner := Array.append(_thirdPartyBanner, [banner]);
                    };
                };
            };
            return #ok("Banners added successfully");
        } catch (err) {
            return #err("Failed to add banners");
        };
    };

    public shared ({caller}) func getBannerByImageURL(imageUrl: Text): async Result.Result<Types.AttractionBanner, Text> {
        let foundBanner = Array.find<Types.AttractionBanner>(
          Array.append(_AttractionBanner, _thirdPartyBanner),
            func (banner) { banner.redirectUrl == imageUrl }
        );
        switch foundBanner {
            case (?banner) return #ok(banner);
            case null return #err("Banner not found with the given image URL");
        };
    };

    public shared ({caller}) func getAllBanners(category: Types.BannerCategory): async [Types.AttractionBanner] {
        switch (category) {
            case (#Attraction) return _AttractionBanner;
            case (#ThirdParty) return _thirdPartyBanner;
        };
    };

    public shared ({caller}) func updateBannerByImage(imageUrl: Text, updatedBanner: Types.AttractionBanner): async Result.Result<Types.AttractionBanner, Text> {
         // if (Principal.isAnonymous(user)) {
          //      return #err(#UserNotAuthenticated); 
          // }; 
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not ((await Validation.check_for_sysAdmin(role)) or (await Validation.check_for_Admin(role)))) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
        var updated = false;
        switch (updatedBanner.category) {
            case (#Attraction) {
                _AttractionBanner := Array.map<Types.AttractionBanner, Types.AttractionBanner>(
                    _AttractionBanner,
                    func (banner) {
                        if (banner.redirectUrl == imageUrl) {
                            updated := true;
                            return updatedBanner;
                        } else {
                            return banner;
                        };
                    }
                );
            };
            case (#ThirdParty) {
                _thirdPartyBanner := Array.map<Types.AttractionBanner, Types.AttractionBanner>(
                    _thirdPartyBanner,
                    func (banner) {
                        if (banner.redirectUrl == imageUrl) {
                            updated := true;
                            return updatedBanner;
                        } else {
                            return banner;
                        };
                    }
                );
            };
        };

        if (updated) {
            return #ok(updatedBanner);
        } else {
            return #err("Banner not found with the given image URL");
        };
    };

    public shared ({caller}) func deleteBannerByImage(imageUrl: Text): async Result.Result<Text, Text> {
      // if (Principal.isAnonymous(user)) {
          //      return #err(#UserNotAuthenticated); 
          // }; 
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not ((await Validation.check_for_sysAdmin(role)) or (await Validation.check_for_Admin(role)))) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
        let initialAttractionSize = Array.size(_AttractionBanner);
        let initialThirdPartySize = Array.size(_thirdPartyBanner);

        _AttractionBanner := Array.filter<Types.AttractionBanner>(
            _AttractionBanner,
            func (banner) { banner.redirectUrl != imageUrl }
        );

        _thirdPartyBanner := Array.filter<Types.AttractionBanner>(
            _thirdPartyBanner,
            func (banner) { banner.redirectUrl != imageUrl }
        );

        if (Array.size(_AttractionBanner) < initialAttractionSize or Array.size(_thirdPartyBanner) < initialThirdPartySize) {
            return #ok("Banner deleted successfully");
        } else {
            return #err("Banner not found with the given image URL");
        };
    };

    public shared ({caller}) func clearAllBanners(category: Types.BannerCategory): async Result.Result<Text, Text> {
      // if (Principal.isAnonymous(user)) {
          //      return #err(#UserNotAuthenticated); 
          // }; 
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not ((await Validation.check_for_sysAdmin(role)) or (await Validation.check_for_Admin(role)))) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          switch (category) {
               case (#Attraction) {
                    _AttractionBanner := [];
                    return #ok("All attraction banners cleared");
               };
               case (#ThirdParty) {
                    _thirdPartyBanner := [];
                    return #ok("All third-party banners cleared");
               };
          };
     };

     /*********************************************************/
     /*                   Dashboard                           */
     /*********************************************************/

     func getTop3EventsRevenue(): async List.List<{
          eventId: Text;
          totalRevenue: Float;
     }> {
          let eventTickets = await fetchAllCategoryTickets(_EventTicketsMap);

          var revenueByEvent = TrieMap.TrieMap<Text,Float>(Text.equal, Text.hash);
          for (ticket in List.toArray(eventTickets).vals()) {
               let eventId = ticket.categoryId;
               let price : Float = ticket.price;

               revenueByEvent.put(
                    eventId,
                    switch (revenueByEvent.get(eventId)) {
                         case (null) {
                               price
                         };
                         case (?existing) { 
                              existing + price 
                         };
                    }
               );
          };

          let revenueArray: [(Text,Float)] = Iter.toArray(revenueByEvent.entries());

          let res : [(Text, Float)] = Array.sort<(Text, Float)>(revenueArray, func (a, b) {
               let (_, revenue1) = a;
               let (_, revenue2) = b;

               if (revenue1 > revenue2) {
                    return #greater;
               } else if (revenue1 < revenue2) {
                    return #less;
               } else {
                    return #equal;
               };
          });

          let top3List = Array.take(res,3);
          let result = List.map<(Text, Float), { eventId: Text; totalRevenue: Float }>(
               List.fromArray(top3List),
               func (entry) {
                    let (eventId, totalRevenue) = entry;
                    {
                         eventId = eventId;
                         totalRevenue = totalRevenue;
                    }
               }
          );

          return result;
     };




     public shared ({caller}) func dashboardStats() : async Types.DashboardStats {

          let top3Events : List.List<{eventId: Text; totalRevenue: Float;}> = await getTop3EventsRevenue();
          let allInvoices = await FiatPayCanister.get_all_invoices_to_admin();
          let latestTxs : [Types.Invoice] = switch(allInvoices.body){
               case(#err(e)){
                    []
               };
               case(#success(invoices)){
                    let latestOnes =  Array.take(invoices,4);
                    latestOnes
               }
          };
          return {
               totalRevenue = totalRevenue;
               totalTickets = totalTickets;
               totalUsers = users;
               top3Events = top3Events;
               latestTxs = latestTxs;
          };
     };
   
     /*********************************************************/
     /*                       Venue                           */
     /*********************************************************/

     
     public shared ({caller = user}) func createVenue(
          collection_details : Types.venueCollectionParams, 
          _title : Text,
          _capacity : Nat,
          _details : Types.venueDetails , 
          _description : Text
     ) : async Result.Result<(id : Text,  venue :Types.Venue), Types.UpdateUserError> {
          // if (Principal.isAnonymous(user)) {
          //      return #err(#UserNotAuthenticated); 
          // }; 
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not ((await Validation.check_for_sysAdmin(role)) or (await Validation.check_for_Admin(role)))) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          /* if (collection_details.collection_args.sTicket_price < 10000.0
               or collection_details.collection_args.vTicket_price < 10000.0
               or collection_details.collection_args.gTicket_price < 10000.0)
          {
               return #err(#TicketPriceError);
          }; */
          let availablecycles : Nat = await availableCycles(); 
          if(availablecycles < 800_510_000_000 ){
               return #err(#CyclesError);
          };
          Cycles.add<system>(800_500_000_000);
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
               Events : [Text] = [];
               Wahanas : [Text] = [];
               Title : Text = _title;
               capacity : Nat = _capacity;
               id : Text = venue_id;
               creator = user;
          };
          let venue_blob = to_candid(Venue);
          let Venue_index : Types.Index = await stable_add(venue_blob, Venue_state);
          _venueMap.put(venue_id, Venue_index);
          return #ok(venue_id,Venue);
     };

     public shared ({caller}) func getVenue(Venue_id : Text) : async Result.Result<Types.Venue, Types.CommonErrors> {
          let venue_blob: ?Types.Index = _venueMap.get(Venue_id);
          switch (venue_blob) {
               case null {
                    throw Error.reject("Venue not found");
                    return #err(#VenueNotFound);
               };
               case (?v){
                    let venue_blob = await stable_get(v, Venue_state);
                    let venue : ?Types.Venue = from_candid(venue_blob);
                    switch (venue) {
                         case null {
                              throw Error.reject("Venue not found");
                              return #err(#VenueNotFound);
                         };
                         case (?v) {
                              return #ok(v);
                         };
                    };
               };
          };
     };

     func getVenueforUpdates(Venue_id : Text) : async Types.Venue {
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
                              return v;
                         };
                    };
               };
          };
     };

     // public shared ({caller}) func updateVenue( 
     //    collection_details : Types.venueCollectionParams, 
     //    Venue_id : Text, 
     //    Title : Text,
     //    Description : Text,
     //    Details : Types.venueDetails,
     //    capacity : Nat,
     //    logo : Types.LogoResult,
     //    banner : Types.LogoResult
     // ) : async Result.Result<(Principal, Types.Venue), Types.UpdateUserError> {
     //      // if (Principal.isAnonymous(caller)) {
     //      //      return #err(#UserNotAuthenticated); 
     //      // }; 
     //      // let roleResult = await getRoleByPrincipal(caller);
     //      // switch (roleResult) {
     //      //      case (#err(error)) {
     //      //           return #err(#RoleError);
     //      //      };
     //      //      case (#ok(role)) {
     //      //           if (not ((await Validation.check_for_sysAdmin(role)) or (await Validation.check_for_Admin(role)))) {
     //      //                return #err(#UserNotAuthorized);
     //      //           };
     //      //      };
     //      // };
     //      switch(_venueMap.get(Venue_id)){
     //           case null {
     //                throw Error.reject("Venue not found");
     //           };
     //           case (?v){
     //                let venues_object_blob = await stable_get(v,Venue_state);
     //                let venues_object : ?Types.Venue = from_candid(venues_object_blob);
     //                switch(venues_object){
     //                     case null{
     //                          throw (Error.reject("No object found in the memory"));
     //                     };
     //                     case (?obj){
     //                          Cycles.add<system>(500_500_000_000);
     //                          let venueCollection = await NFTactor.Dip721NFT(Principal.fromActor(mahaka), collection_details.collection_args);
     //                          ignore await venueCollection.wallet_receive();
     //                          let new_custodian = await venueCollection.addcustodians(caller);
     //                          Debug.print(" New added custodian is : " # debug_show (new_custodian));
     //                          let nftcustodians = await venueCollection.showcustodians();
     //                          Debug.print("These are the list of current custodians : " #debug_show (nftcustodians));
     //                          let collection_id = await venueCollection.getCanisterId();
     //                          let venue_id =  Title # "#" # Principal.toText(collection_id) ;
     //                          let Venue : Types.Venue = {
     //                               id = venue_id;
     //                               Title = Title;
     //                               logo = logo;
     //                               banner = banner;
     //                               Description : Text;
     //                               Details = Details;
     //                               Events = obj.Events;
     //                               Wahanas = obj.Wahanas;
     //                               capacity = capacity;
     //                               Collection_id = collection_id;
     //                               creator = caller;
     //                          };
     //                          let venue_blob = to_candid(Venue);
     //                          let Venue_index = await update_stable(v, venue_blob, Venue_state);
     //                          _venueMap.put(venue_id, Venue_index);
     //                          _venueMap.delete(Venue_id);
     //                          switch(_EventsMap.get(Venue_id)){
     //                               case null{

     //                               };
     //                               case (?index) {
     //                                    _EventsMap.put(venue_id,index);
     //                                    _EventsMap.delete(Venue_id); 
     //                               }
     //                          };
     //                          switch(_WahanaMap.get(Venue_id)){
     //                               case null{
                                        
     //                               };
     //                               case (?index) {
     //                                    _WahanaMap.put(venue_id, index);
     //                                    _WahanaMap.delete(Venue_id);
     //                               }
     //                          };
     //                          return #ok(caller, Venue);
     //                     };
     //                };
                    
     //           };
     //      };
     // };

     func updateVenuewithEvents( Venue_id : Text, events : [Text]) : async Types.Venue {
          switch(_venueMap.get(Venue_id)){
               case null {
                    throw Error.reject("Venue not found");
               };
               case(?v){
                    let venue = await getVenueforUpdates(Venue_id);
                    let Venue : Types.Venue = {
                         id = venue.id;
                         Title = venue.Title;
                         Description = venue.Description;
                         logo = venue.logo;
                         banner = venue.banner;
                         Details = venue.Details;
                         Events = events;
                         Wahanas = venue.Wahanas;
                         capacity = venue.capacity;
                         Collection_id = venue.Collection_id;
                         creator = venue.creator;
                    };
                    let venue_blob = to_candid(Venue);
                    let Venue_index = await update_stable(v, venue_blob, Venue_state);
                    _venueMap.put(Venue_id, Venue_index);
                    return Venue;
               }
          }
     };


     func updateVenuewithWahanas( Venue_id : Text, wahanas : [Text]) : async Types.Venue {
          switch(_venueMap.get(Venue_id)){
               case null {
                    throw Error.reject("Venue not found");
               };
               case(?v){
                    let venue = await getVenueforUpdates(Venue_id);
                    let Venue : Types.Venue = {
                         id = venue.id;
                         Title = venue.Title;
                         Description = venue.Description;
                         logo = venue.logo;
                         banner = venue.banner;
                         Details = venue.Details;
                         Wahanas = wahanas;
                         Events = venue.Events;
                         capacity = venue.capacity;
                         Collection_id = venue.Collection_id;
                         creator = venue.creator;
                    };
                    let venue_blob = to_candid(Venue);
                    let Venue_index = await update_stable(v, venue_blob, Venue_state);
                    _venueMap.put(Venue_id, Venue_index);
                    return Venue;
               }
          }
     };

     public shared ({caller = user}) func deleteVenue(Venue_id : Text) : async Result.Result<(Bool,?Types.Venue), Types.UpdateUserError> {
          // if (Principal.isAnonymous(user)) {
          //      return #err(#UserNotAuthenticated); 
          // }; 
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not ((await Validation.check_for_sysAdmin(role)) or (await Validation.check_for_Admin(role)))) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          switch(_venueMap.get(Venue_id)){
               case null {
                    throw Error.reject("Venue not found");
               };
               case (?v){
                    let venue_blob = await stable_get(v, Venue_state);
                    let venue : ?Types.Venue = from_candid(venue_blob);
                    switch(venue){
                         case null {
                              throw Error.reject("No memory found for this index");
                         };
                         case(?v){
                              let eventIds : [Text] = v.Events;
                              let wahanaIds : [Text] = v.Wahanas;
                              _venueMap.delete(Venue_id);
                              let allEventsAndWahanas : [Text] = Array.append(eventIds, wahanaIds);
                              await deleteCanistersByIds(allEventsAndWahanas);
                              _EventsMap.delete(Venue_id);
                              _WahanaMap.delete(Venue_id);
                              let venueCanisterId = await Utils.extractCanisterId(Venue_id);
                              await ic.stop_canister({ canister_id = Principal.fromText(venueCanisterId) });
                              await ic.delete_canister({ canister_id = Principal.fromText(venueCanisterId) });
                              return #ok(true,venue);
                         }
                    }
               };
          };
     };

     public shared func deleteCanistersByIds(ids: [Text]) : async () {
          for (id in ids.vals()) {
               let canisterId = await Utils.extractCanisterId(id);
               await ic.stop_canister({ canister_id = Principal.fromText(canisterId) });
               await ic.delete_canister({ canister_id = Principal.fromText(canisterId) });
          };

     };



     public shared func getAllVenues(chunkSize : Nat , pageNo : Nat) : async {data : [Types.Venue] ; current_page : Nat ; Total_pages : Nat} {
           // if (Principal.isAnonymous(user)) {
          //      return #err(#UserNotAuthenticated); 
          // }; 
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not ((await Validation.check_for_sysAdmin(role)) or (await Validation.check_for_Admin(role)))) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
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


     // Search venues 
     public shared func searchVenues(searchTerm: Text, chunkSize: Nat, pageNo: Nat) : async {data: [Types.Venue]; current_page: Nat; total_pages: Nat} {
          
          var matchingVenues = List.nil<Types.Venue>();
          let loweredSearchTerm = Text.toLowercase(searchTerm);

          for ((venue_id, venue_index) in _venueMap.entries()) {
               let venue_blob = await stable_get(venue_index, Venue_state);
               let venue: ?Types.Venue = from_candid(venue_blob);
               
               switch (venue) {
                    case null {
                         throw Error.reject("Venue not found");
                    };
                    case (?v) {
                         if (Text.contains(Text.toLowercase(v.Title), #text loweredSearchTerm) or Text.contains(Text.toLowercase(v.Description), #text loweredSearchTerm)) {
                              matchingVenues := List.push(v, matchingVenues);
                         };
                    };
               };
          };

          let matchingVenuesArray = List.toArray(matchingVenues);
          let indexPages = Utils.paginate<Types.Venue>(matchingVenuesArray, chunkSize);
          
          if (indexPages.size() < pageNo) {
               throw Error.reject("Page not found");
          };
          if (indexPages.size() == 0) {
               throw Error.reject("No venues found matching the search Pattern");
          };
          
          let pageData = indexPages[pageNo];
          return { data = pageData; current_page = pageNo + 1; total_pages = indexPages.size() };
     };



     public shared ({caller = user}) func createEvent(
          venueId: Types.venueId, 
          Event: Types.Events, 
          eCollection: Types.eventCollectionParams
     ): async Result.Result<Types.completeEvent, Types.UpdateUserError> {
          // if (Principal.isAnonymous(user)) {
          //      return #err(#UserNotAuthenticated); 
          // };
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)))
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          /* if (eCollection.collection_args.sTicket_price < 10000 
               or eCollection.collection_args.vTicket_price < 10000 
               or eCollection.collection_args.gTicket_price < 10000) 
          {
               return #err(#TicketPriceError);
          }; */
          let availablecycles : Nat = await availableCycles(); 
          if(availablecycles < 800_510_000_000 ){
               return #err(#CyclesError);
          };
          Cycles.add<system>(800_500_000_000);
          let eventCollection = await NFTactor.Dip721NFT(Principal.fromActor(mahaka), eCollection.collection_args);
          let new_custodian = await eventCollection.addcustodians(user);
          Debug.print("New added custodian is: " # debug_show(new_custodian));
          let nftcustodians = await eventCollection.showcustodians();
          Debug.print("These are the list of current custodians: " # debug_show(nftcustodians));
          ignore await eventCollection.wallet_receive();
          let eventCollectionId = await eventCollection.getCanisterId();
          let eventId = Event.title # "#" # Principal.toText(eventCollectionId);
          let time = Time.now();
          let eventEndTime = Event.details.EndTime;
          let eventStartTime = Event.details.StartTime;
          let status : Types.EventStatus = if(time >= eventStartTime){
               #Ongoing
          } else {
               #AboutToStart
          };

          let newEvent: Types.completeEvent = {
               id = eventId;
               description = Event.description;
               details = Event.details;
               logo = Event.logo;
               banner = Event.banner;
               gTicket_limit = Event.gTicket_limit;
               sTicket_limit = Event.sTicket_limit;
               title = Event.title;
               vTicket_limit = Event.vTicket_limit;
               event_collectionid = await eventCollection.getCanisterId();
               creator = user;
               venueId = venueId;
               status = status;
          };

          let existingEvents = _EventsMap.get(venueId);

          let updatedEvents: Types.Events_data = switch (existingEvents) {
               case null {
                    let Events : Types.Events_data = {
                         Events = List.fromArray([newEvent]);
                         EventIds = List.fromArray([newEvent.id]);
                    };
                    Events
               };
               case (?eventIndex) {
                    let eventsBlob = await stable_get(eventIndex, Events_state);
                    let existingData: ?Types.Events_data = from_candid(eventsBlob);
                    switch (existingData) {
                         case null {
                              let Events : Types.Events_data = {
                                   Events = List.fromArray([newEvent]);
                                   EventIds = List.fromArray([newEvent.id]);
                              };
                              Events

                         };
                         case (?data) {
                              let Events : Types.Events_data = {
                                   Events = List.append(data.Events, List.fromArray([newEvent]));
                                   EventIds = List.append(data.EventIds, List.fromArray([newEvent.id]));
                              };
                              Events
                         };
                    }
               };
          };

          let updatedVenue = await updateVenuewithEvents(venueId, List.toArray(updatedEvents.EventIds));

          let eventBlob = to_candid(updatedEvents);
          let eventIndex = switch (existingEvents) {
               case null { await stable_add(eventBlob, Events_state) };
               case (?index) { await update_stable(index, eventBlob, Events_state) };
          };
          _EventsMap.put(venueId, eventIndex);

          if (status == #AboutToStart) {
               await scheduleEventUpdate(eventId, venueId, eventStartTime, #Ongoing);
          };
          await scheduleEventUpdate(eventId, venueId, eventEndTime, #Expired);
          
          return #ok(newEvent);
     };

     func scheduleEventUpdate(eventId : Text, venueId : Text, expiration : Time.Time, targetStatus : Types.EventStatus) : async () {
        let now = Time.now();
        let duration = if (expiration > now) expiration - now else now - expiration;
        let natDuration = Nat64.toNat(Nat64.fromIntWrap(duration));
        if (duration > 0) {
            let id = Timer.setTimer<system>(
                #nanoseconds natDuration,
                func() : async () {
                    await updateEvent(eventId, venueId, targetStatus);
                },
            );
            eventTimerMap.put(eventId, id);
        };
    };

    func updateEvent(eventId : Text, venueId : Text, newStatus : Types.EventStatus) : async () {
          let events_object = _EventsMap.get(venueId);
          switch (events_object) {
               case null {
                    throw (Error.reject("No Events Found in the Venue"));
               };
               case (?v) {
                    let events_object_blob = await stable_get(v, Events_state);
                    let events_object : ?Types.Events_data = from_candid(events_object_blob);
                    switch (events_object) {
                         case null {
                              throw (Error.reject("No object found in the memory"));
                         };
                         case (?val) {
                              var events_list = val.Events;
                              let updatedEvents = List.map<Types.completeEvent, Types.completeEvent>(
                              events_list,
                              func(_event : Types.completeEvent) {
                                   if (_event.id == eventId) {
                                        return {
                                             id = _event.id;
                                             description = _event.description;
                                             details = _event.details;
                                             logo = _event.logo;
                                             banner = _event.banner;
                                             gTicket_limit = _event.gTicket_limit;
                                             sTicket_limit = _event.sTicket_limit;
                                             title = _event.title;
                                             vTicket_limit = _event.vTicket_limit;
                                             event_collectionid = _event.event_collectionid;
                                             creator = _event.creator;
                                             venueId = _event.venueId;
                                             status = newStatus;
                                        };
                                   } else {
                                        return _event;
                                   }
                              }
                         );
                              let updatedData : Types.Events_data = {
                              Events = updatedEvents;
                              EventIds = val.EventIds;
                              };

                              let updatedBlob = to_candid(updatedData);
                              let updatedIndex = await update_stable(v, updatedBlob, Events_state);
                              _EventsMap.put(venueId, updatedIndex);
                         };
                    };
               };
          };
          };

     public shared ({caller = user}) func getallEventsbyVenue(chunkSize : Nat , pageNo : Nat, venueId : Types.venueId) : async Result.Result<{data : [Types.completeEvent] ; current_page : Nat ; Total_pages : Nat}, Types.UpdateUserError> {
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)) or 
          //                (await Validation.check_for_Manager(role)) or 
          //                (await Validation.check_for_Bod(role)))
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
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
                              return #ok{data = pages_data; current_page = pageNo + 1; Total_pages = index_pages.size()};
                         };
                    };
               };
          }; 
     };

     public shared ({caller}) func getAllEventsPaginated(chunkSize : Nat, pageNo : Nat) : async Result.Result<{data : [Types.completeEvent]; current_page : Nat; Total_pages : Nat}, Types.CommonErrors> {
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)) or 
          //                (await Validation.check_for_Manager(role)) or 
          //                (await Validation.check_for_Bod(role)))
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          
          var allEvents : List.List<Types.completeEvent> = List.nil();

          for ((_, eventIndex) in _EventsMap.entries()) {
               let event_object_blob = await stable_get(eventIndex, Events_state);
               let event_object : ?Types.Events_data = from_candid(event_object_blob);
               
               switch (event_object) {
                    case (null) {
                         return #err(#DataNotFound);
                    };
                    case (?eventData) {
                         allEvents := List.append(allEvents, eventData.Events);
                    };
               };
          };

          let index_pages = Utils.paginate<Types.completeEvent>(List.toArray(allEvents), chunkSize);
          if (index_pages.size() < pageNo) {
               throw Error.reject("Page not found");
          };
          if (index_pages.size() == 0) {
               throw Error.reject("No data found");
          };
          let pages_data = index_pages[pageNo];
          return #ok{data = pages_data; current_page = pageNo + 1; Total_pages = index_pages.size()};
     };


     public shared ({caller}) func getAllEvents() : async Result.Result<[Types.completeEvent], Types.CommonErrors> {
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)) or 
          //                (await Validation.check_for_Manager(role)) or 
          //                (await Validation.check_for_Bod(role)))
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          var allEvents : List.List<Types.completeEvent> = List.nil();

          for ((_, eventIndex) in _EventsMap.entries()) {
               let event_object_blob = await stable_get(eventIndex, Events_state);
               let event_object : ?Types.Events_data = from_candid(event_object_blob);
               
               switch (event_object) {
                    case (null) {
                         return #err(#DataNotFound);
                    };
                    case (?eventData) {
                         allEvents := List.append(allEvents, eventData.Events);
                    };
               };
          };

     
          return #ok(List.toArray(allEvents));
     };

     public shared ({caller}) func getOngoingEvents(chunkSize : Nat, pageNo : Nat) : async Result.Result<{data : [Types.completeEvent]; current_page : Nat; Total_pages : Nat}, Types.CommonErrors> {
          let allEventsResult = await getAllEvents();
          switch (allEventsResult) {
               case (#err(error)) {
                    return #err(error);
               };
               case (#ok(allEventsData)) {
                    let currentTime = Time.now();
                    
                    let ongoingEvents = Array.filter<Types.completeEvent>(
                         allEventsData,
                         func (event) {
                              (event.details.StartDate <= currentTime) and (event.details.EndDate > currentTime)
                         }
                    );

                    if (Array.size(ongoingEvents) == 0) {
                         return #err(#DataNotFound);
                    };

                    let index_pages = Utils.paginate<Types.completeEvent>(ongoingEvents, chunkSize);
                    if (index_pages.size() < pageNo) {
                         throw Error.reject("Page not found");
                    };
                    if (index_pages.size() == 0) {
                         throw Error.reject("No ongoing events found");
                    };

                    let pages_data = index_pages[pageNo];
                    return #ok{data = pages_data; current_page = pageNo + 1; Total_pages = index_pages.size()};
               };
          };
     };


     public shared ({caller}) func getEvent(eventId : Text, venueId : Text) : async Result.Result<Types.completeEvent, Types.CommonErrors> {
          
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)) or 
          //                (await Validation.check_for_Manager(role)) or 
          //                (await Validation.check_for_Bod(role)))
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          let eventIndex = _EventsMap.get(venueId);
          switch(eventIndex){
               case null {
                    throw Error.reject("No event found in the venue");
                    return #err(#EventNotFound);
               };
               case (?e){
                    let events_object_blob = await stable_get(e,Events_state);
                    let events_object : ?Types.Events_data = from_candid(events_object_blob);
                    switch(events_object){
                         case null {
                              throw (Error.reject("No object found in the memory"));
                              return #err(#EventNotFound);
                         };
                         case (?e){
                              let events_list : List.List<Types.completeEvent> = e.Events;
                              let event = List.find<Types.completeEvent>(
                                   events_list,
                                   func x {x.id == eventId}
                              );
                              switch(event){
                                   case null {
                                        throw Error.reject("No Event found");
                                        return #err(#EventNotFound);
                                   };
                                   case (?_event){
                                        return #ok(_event);
                                   }
                              }
                         }
                    }
               };
          }
     };

     // public shared ({caller = user}) func edit_event(eventId : Text, venueId : Types.venueId ,  _eCollection : Types.eventCollectionParams , _event : Types.Events) : async Result.Result<(Types.completeEvent, Text), Types.UpdateUserError> {
     //      // if (Principal.isAnonymous(user)) {
     //      //      return #err(#UserNotAuthenticated); 
     //      // }; 
     //      // let roleResult = await getRoleByPrincipal(user);
     //      // switch (roleResult) {
     //      //      case (#err(error)) {
     //      //           return #err(#RoleError);
     //      //      };
     //      //      case (#ok(role)) {
     //      //           if (not (
     //      //                (await Validation.check_for_sysAdmin(role)) or 
     //      //                (await Validation.check_for_Admin(role)) or
     //      //                (await Validation.check_for_SuperVisor(role))
     //      //           )) {
     //      //                return #err(#UserNotAuthorized);
     //      //           };
     //      //      };
     //      // };
     //      let events_object = _EventsMap.get(venueId);
     //      switch (events_object){
     //           case null {
     //                throw (Error.reject("No Events Found in the Venue"));
     //           };
     //           case (?v){
     //                let events_object_blob = await stable_get(v,Events_state);
     //                let events_object : ?Types.Events_data = from_candid(events_object_blob);
     //                switch (events_object) {
     //                     case null {
     //                          throw (Error.reject("No object found in the memory"));
     //                     };
     //                     case (?val){
     //                          var events_list = val.Events;
     //                          let event = List.find<Types.completeEvent>(
     //                               events_list,
     //                               func x {x.id == eventId}
     //                          );
     //                          var eventIds_list = val.EventIds;
     //                          let exists_eventId = List.find<Text>(
     //                               eventIds_list,
     //                               func x {x == eventId}
     //                          );
     //                          switch(event){
     //                               case null {
     //                                    throw (Error.reject("Event not found in the list"));
     //                               };
     //                               case (?event){
     //                                    let result = await Utils.is_event_editable(event);
     //                                    assert( result == true);
     //                                    Cycles.add<system>(500_500_000_000);
     //                                    let eventCollection = await NFTactor.Dip721NFT(Principal.fromActor(mahaka), _eCollection.collection_args);
     //                                    let new_custodian = await eventCollection.addcustodians(user);
     //                                    Debug.print(" New added custodian is : " # debug_show (new_custodian));
     //                                    let nftcustodians = await eventCollection.showcustodians();
     //                                    Debug.print("These are the list of current custodians : " #debug_show (nftcustodians));
     //                                    ignore await eventCollection.wallet_receive();
     //                                    let eventCollectionId = await eventCollection.getCanisterId();
     //                                    let event_id =  _event.title # "#" # Principal.toText(eventCollectionId);
     //                                    let updated_event : Types.completeEvent = {
     //                                         id = event_id;
     //                                         description = _event.description;
     //                                         details =_event.details;
     //                                         logo = _event.logo;
     //                                         banner =_event.banner ;
     //                                         gTicket_limit = _event.gTicket_limit;
     //                                         sTicket_limit = _event.sTicket_limit;
     //                                         title = _event.title;
     //                                         vTicket_limit = _event.vTicket_limit;
     //                                         event_collectionid = await eventCollection.getCanisterId();
     //                                         creator = user;
     //                                         venueId = venueId;
     //                                    };
     //                                    let updated_events_list = List.map<Types.completeEvent, Types.completeEvent>(
     //                                         events_list,
     //                                         func(existing_event) {
     //                                              if (existing_event.id == eventId) {
     //                                                   updated_event
     //                                              } else {
     //                                                   existing_event
     //                                              }
     //                                         }
     //                                    );
     //                                    let updated_eventId_list = List.map<Text, Text>(
     //                                         eventIds_list,
     //                                         func(existing_eventId) {
     //                                              if (existing_eventId == eventId) {
     //                                                   updated_event.id
     //                                              } else {
     //                                                   existing_eventId
     //                                              }
     //                                         }
     //                                    );
     //                                    let updated_events_data: Types.Events_data = {
     //                                         Events = updated_events_list;
     //                                         EventIds = updated_eventId_list;
     //                                    };

     //                                    let updatedVenue = await updateVenuewithEvents(venueId,List.toArray(updated_events_data.EventIds));
     //                                    let eventBlob = to_candid(updated_events_data);
     //                                    let eventIndex = await update_stable(v,eventBlob, Events_state);
     //                                    _EventsMap.put(venueId, eventIndex);

     //                                    return #ok(updated_event,"Event Edited");

     //                               };
     //                          };
     //                     };
     //                };
     //           };
     //      };
     // };

     public shared ({caller = user}) func deleteEvent (venue_id : Types.venueId, eventId : Text) : async Result.Result<(Bool, Types.Index), Types.UpdateUserError> {
          // if (Principal.isAnonymous(user)) {
          //      return #err(#UserNotAuthenticated); 
          // };
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or
          //                (await Validation.check_for_Staff(role)))
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          switch(_EventsMap.get(venue_id)){
               case null {
                    throw(Error.reject("No venue found for the events"));
               };
               case (?Event_index){
                    let event_blob = await stable_get(Event_index,Events_state);
                    let event_object :?Types.Events_data = from_candid(event_blob);
                    switch(event_object){
                         case null {
                              throw(Error.reject("No object found for this blob in the memory"));
                         };
                         case (?e){
                              let updated_events_list = List.filter<Types.completeEvent>(
                                   e.Events,
                                   func x { x.id != eventId }
                              );
                              let updated_eventIds_list = List.filter<Text>(
                                   e.EventIds,
                                   func x { x != eventId }
                              );
                              let updated_event_data = {
                                   Events = updated_events_list;
                                   EventIds = updated_eventIds_list;
                              };
                              let event_blob = to_candid(updated_event_data);
                              let event_index = await update_stable(Event_index, event_blob, Events_state);
                              let updatedVenue = await updateVenuewithEvents(venue_id,List.toArray(updated_event_data.EventIds));
                              _EventsMap.put(venue_id, Event_index);
                              let eventCanisterId = await Utils.extractCanisterId(eventId);
                              await ic.stop_canister({ canister_id = Principal.fromText(eventCanisterId) });
                              await ic.delete_canister({ canister_id = Principal.fromText(eventCanisterId) });
                              return #ok(true, event_index);
                         };
                    };
               };
          };
     };


    // Search events
     public shared func searchEvents(searchTerm: Text, chunkSize: Nat, pageNo: Nat) : async {data: [Types.completeEvent]; current_page: Nat; total_pages: Nat} {
          var matchingEvents = List.nil<Types.completeEvent>();
          let loweredSearchTerm = Text.toLowercase(searchTerm);

          for ((venue_id, event_index) in _EventsMap.entries()) {
               let event_blob = await stable_get(event_index, Events_state);
               let eventsList: ?Types.Events_data = from_candid(event_blob);
               
               switch (eventsList) {
                    case null {
                         throw Error.reject("No Events found");
                    };
                    case (?list) {
                         let filteredEvents : List.List<Types.completeEvent> = List.filter<Types.completeEvent>(list.Events, func (e : Types.completeEvent) : Bool {
                              Text.contains(Text.toLowercase(e.title), #text loweredSearchTerm) or Text.contains(Text.toLowercase(e.description),#text loweredSearchTerm) 
                         });
                         for (event in List.toArray(filteredEvents).vals()) {
                              matchingEvents := List.push(event, matchingEvents);
                         };
                    };
               };
          };

          // Convert the list of matching events to an array for pagination
          let matchingEventsArray = List.toArray(matchingEvents);
          Debug.print(debug_show(matchingEventsArray));
          let indexPages = Utils.paginate<Types.completeEvent>(matchingEventsArray, chunkSize);
          
          // Handle pagination
          if (indexPages.size() < pageNo) {
               throw Error.reject("Page not found");
          };
          if (indexPages.size() == 0) {
               throw Error.reject("No Events found matching the search pattern");
          };
          
          let pageData = indexPages[pageNo];
          return { data = pageData; current_page = pageNo + 1; total_pages = indexPages.size() };
     };





     /*********************************************************/
     /*                   Tickets Handlig                     */
     /*********************************************************/

    
     // public shared ({caller}) func buyVenueTicket(venueId : Types.venueId, _ticket_type : Types.ticket_info, _metadata : nftTypes.MetadataDesc ) : async Result.Result<nftTypes.MintReceipt, Types.UpdateUserError> {
     //      // if (Principal.isAnonymous(caller)) {
     //      //      return #err(#UserNotAuthenticated); 
     //      // }; 
     //      // let roleResult = await getRoleByPrincipal(caller);
     //      // switch (roleResult) {
     //      //      case (#err(error)) {
     //      //           return #err(#RoleError);
     //      //      };
     //      //      case (#ok(role)) {
     //      //           if (not ((await Validation.check_for_sysAdmin(role)) or (await Validation.check_for_Admin(role)))) {
     //      //                return #err(#UserNotAuthorized);
     //      //           };
     //      //      };
     //      // };
     //      let collection_id = await Utils.extractCanisterId(venueId);
     //      let collection_actor = actor (collection_id) : actor {
     //           logoDip721 : () -> async Types.LogoResult;
     //           mintDip721 : (to : Principal, metadata : Types.MetadataDesc ,ticket_details : nftTypes.ticket_type, logo : Types.LogoResult) -> async nftTypes.MintReceipt;
     //      };
     //      let _logo = await collection_actor.logoDip721();
     //      let _ticket = await collection_actor.mintDip721(caller,_metadata,_ticket_type.ticket_type,_logo);
     
     //      return #ok(_ticket);
     // };

     // public shared ({caller}) func buyEventTicket(_venueId : Text,_eventId : Text, _ticket_type : Types.ticket_info, _metadata : nftTypes.MetadataDesc) : async Result.Result<nftTypes.MintReceipt, Types.UpdateUserError> {
     //      // if (Principal.isAnonymous(caller)) {
     //      //      return #err(#UserNotAuthenticated); 
     //      // }; 
     //      // let roleResult = await getRoleByPrincipal(caller);
     //      // switch (roleResult) {
     //      //      case (#err(error)) {
     //      //           return #err(#RoleError);
     //      //      };
     //      //      case (#ok(role)) {
     //      //           if (not ((await Validation.check_for_sysAdmin(role)) or (await Validation.check_for_Admin(role)))) {
     //      //                return #err(#UserNotAuthorized);
     //      //           };
     //      //      };
     //      // };
     //      switch(_EventsMap.get(_venueId)){
     //           case null {
     //                throw(Error.reject("No venue found for the events"));
     //           };
     //           case (?Event_index){
     //                let event_blob = await stable_get(Event_index,Events_state);
     //                let event_object :?Types.Events_data = from_candid(event_blob);
     //                switch(event_object){
     //                     case null {
     //                          throw(Error.reject("No object found for this blob in the memory"));
     //                     };

     //                     case (?e){
     //                          let events_list = e.Events;
     //                          let event = List.find<Types.completeEvent>(
     //                               events_list,
     //                               func x {x.id == _eventId}
     //                          );
     //                          switch (event){
     //                               case null (
     //                                    throw (Error.reject("No Event found")) 
     //                               );
     //                               case (?_event){
     //                                    let collection_actor = actor (Principal.toText(_event.event_collectionid)) : actor {
     //                                    logoDip721 : () -> async Types.LogoResult;
     //                                    mintDip721 : (to : Principal, metadata : Types.MetadataDesc ,ticket_details : nftTypes.ticket_type, logo : Types.LogoResult) -> async nftTypes.MintReceipt;                                        
     //                                    };
     //                                    let _logo = await collection_actor.logoDip721();
     //                                    let _ticket = await collection_actor.mintDip721(caller,_metadata,_ticket_type.ticket_type,_logo);
     //                                    return #ok(_ticket);
     //                               };
     //                          };                           
     //                     };
     //                };
     //           };
     //      };
     // };

     // public shared ({caller}) func buyWahanaToken(wahanaId : Text, receiver : Principal )  {
     //      // if (Principal.isAnonymous(caller)) {
     //      //      return #err(#UserNotAuthenticated); 
     //      // }; 
     //      // let roleResult = await getRoleByPrincipal(caller);
     //      // switch (roleResult) {
     //      //      case (#err(error)) {
     //      //           return #err(#RoleError);
     //      //      };
     //      //      case (#ok(role)) {
     //      //           if (not ((await Validation.check_for_sysAdmin(role)) or (await Validation.check_for_Admin(role)))) {
     //      //                return #err(#UserNotAuthorized);
     //      //           };
     //      //      };
     //      // };
     //      let collection_actor = actor (wahanaId) : actor {
     //           icrc1_transfer : ({
     //                from_subaccount : ?TypesICRC.Subaccount;
     //                to : TypesICRC.Account;
     //                amount : TypesICRC.Tokens;
     //                fee : ?TypesICRC.Tokens;
     //                memo : ?TypesICRC.Memo;
     //                created_at_time : ?TypesICRC.Timestamp;
     //                }) -> async TypesICRC.Result<TypesICRC.TxIndex, TypesICRC.TransferError>
     //      };
     //      let transferObj = {
     //           from_subaccount = null : ?TypesICRC.Subaccount;
     //           to = { owner = receiver; subaccount = null } : TypesICRC.Account;
     //           amount = 1 : TypesICRC.Tokens;
     //           memo = null : ?TypesICRC.Memo;
     //           created_at_time = null : ?TypesICRC.Timestamp;
     //           fee = null : ?TypesICRC.Tokens;
     //      };

     //      let response = await  collection_actor.icrc1_transfer(transferObj);
     //      Debug.print(debug_show(response));

     // };

     /*********************************************************/
     /*                 Offline  Tickets Handlig              */
     /*********************************************************/

     private func processMint(
          collectionActor: actor {
               logoDip721: () -> async Types.LogoResult;
               bannerDip721: () -> async Types.LogoResult;
               mintDip721: (to: Principal, metadata: Types.MetadataDesc, ticket_details: nftTypes.ticket_type, logo: Types.LogoResult) -> async nftTypes.MintReceipt;
               getDIP721details : () -> async nftTypes.Dip721NonFungibleToken;
               totalSupplyDip721 : () -> async Nat64;
               getMaxLimitDip721 : () -> async Nat16
          },
          metadata: nftTypes.MetadataDesc,
          ticketType: Types.ticket_info,
          receiver: Principal,
          numOfVisitors: Nat,
          categoryId: Text,
          paymentType: Types.PaymentType,
          ticketPrice: Float,
          offlineOrOnline : Types.TicketType,
          saleDate : Time.Time,
          saleType: Types.category,
          recepient : Principal,
          caller : Principal
     ) : async Result.Result<[nftTypes.MintReceiptPart], Types.MintError> {
          let _logo = await collectionActor.logoDip721();
          let _banner = await collectionActor.bannerDip721();
          let nftDetails = await collectionActor.getDIP721details();
          var mintReceipts: List.List<nftTypes.MintReceiptPart> = List.nil();
          // if (numOfVisitors > Array.size(receivers)) {
          //      throw Error.reject("Receivers Count doesnot match number of visitors");
          //      return #err(#ReceiversCountError);
          // };
          for (i in Iter.range(0, numOfVisitors - 1)) {
               let _ticketResult = await collectionActor.mintDip721(receiver, metadata, ticketType.ticket_type, _logo);
               
               switch (_ticketResult) {
                    case (#Ok(mintReceipt)) {
                         mintReceipts := List.push(mintReceipt, mintReceipts);
                         Debug.print(debug_show(ticketPrice));
                         let ticketSaleInfo: Types.TicketSaleInfo = {
                              ticketId = Nat64.toNat(mintReceipt.token_id);
                              category = saleType;
                              categoryId = categoryId;
                              paymentType = paymentType;
                              numOfVisitors = 1;
                              saleDate = saleDate;
                              createdAt = Time.now();
                              ticketIssuer = caller;
                              ticketType = offlineOrOnline; 
                              recepient = recepient;
                              price = ticketPrice;
                              banner = _banner.data;
                         };
                         let res = await recordTicketSale(categoryId, ticketSaleInfo, saleType);
                         totalTickets := totalTickets + 1;
                         totalRevenue := totalRevenue + ticketPrice;
                    };
                    case (#Err(e)) {
                         return #err(#MintErr);
                    };
               };
          };
          return #ok(List.toArray(mintReceipts));
     };

     // Helper to perform ICRC transfer for wahana tokens
     private func processTransfer(
          collectionActor: actor {
               icrc1_transfer: ({
                    from_subaccount: ?TypesICRC.Subaccount;
                    to: TypesICRC.Account;
                    amount: TypesICRC.Tokens;
                    fee: ?TypesICRC.Tokens;
                    memo: ?TypesICRC.Memo;
                    created_at_time: ?TypesICRC.Timestamp;
               }) -> async TypesICRC.Result<TypesICRC.TxIndex, TypesICRC.TransferError>
          },
          receiver: Principal,
          numOfVisitors: Nat,
          wahanaId: Text,
          paymentType: Types.PaymentType,
          offlineOrOnline : Types.TicketType,
          saleDate : Time.Time,
          ticketPrice: Float,
          recepient : Principal,
          caller : Principal,
          banner : Text
     ) : async Result.Result<[icrcTypes.TxIndex], icrcTypes.TransferError> {
          var transferReceipts: List.List<icrcTypes.TxIndex> = List.nil();

          // if (numOfVisitors > Array.size(receivers)) {
          //      throw Error.reject("Receivers Count doesnot match number of visitors");
          //      return #err(#ReceiversCountError);
          // };

          for (i in Iter.range(0, numOfVisitors - 1)) {
               let transferObj = {
                    from_subaccount = null;
                    to = { owner = receiver; subaccount = null };
                    amount = 1;
                    memo = null;
                    created_at_time = null;
                    fee = null;
               };
               
               let _ticketResult = await collectionActor.icrc1_transfer(transferObj);
               switch (_ticketResult) {
                    case (#Ok(transferReceipt)) {
                         transferReceipts := List.push(transferReceipt, transferReceipts);
                         let ticketSaleInfo: Types.TicketSaleInfo = {
                              ticketId = transferReceipt;
                              category = #Wahana;
                              categoryId = wahanaId;
                              paymentType = paymentType;
                              numOfVisitors = 1;
                              saleDate = saleDate;
                              createdAt = Time.now();
                              ticketIssuer = caller;
                              ticketType = offlineOrOnline; 
                              recepient = recepient;
                              price = ticketPrice;
                              banner = banner;
                         };
                         let res = await recordTicketSale(wahanaId, ticketSaleInfo, #Wahana);
                         totalTickets := totalTickets + 1;
                         totalRevenue := totalRevenue + ticketPrice;
                    };
                    case (#Err(e)) {
                         return #err(e);
                    };
               };
          };
          return #ok(List.toArray(transferReceipts));
     };

     public shared ({caller}) func processPendingPayment(invoiceId: Nat, category : Types.category) : async Result.Result<[nftTypes.MintReceiptPart] or [icrcTypes.TxIndex], Text> {
          let status = await FiatPayCanister.get_invoice(invoiceId);
          switch (status.body){
               case(#success(invoice)){
                    if(invoice.status != "Completed" ){
                         if(invoice.owner != caller){
                              return #err("You are not the owner of Invoice");
                         };
                         return #err("Invoice is still Pending");
                    };
               };
               case(#err(e)){
                    return #err("invoice not found" #debug_show(e));
               }
          };
          
          switch (category) {
               case ( #Venue or #Event ) {
                    let pendingPaymentOpt = Array.find<(Nat, Types.ArgsStore)>(pendingPayments, func (payment) {
                         payment.0 == invoiceId
                    });
                    switch (pendingPaymentOpt) {
                         case null {
                              return #err("No pending payment found for the given invoice ID in the venue/event.");
                         };
                         case (?payment) {
                              let args = payment.1;

                              let mintResult = await processMint(
                                   args.collectionActor,
                                   args.metadata,
                                   args.ticketType,
                                   args.receiver,
                                   args.numOfVisitors,
                                   args.categoryId,
                                   args.paymentType,
                                   args.ticketPrice,
                                   args.offlineOrOnline,
                                   args.saleDate,
                                   args.saleType,
                                   args.recepient,
                                   args.caller
                              );

                              switch (mintResult) {
                                   case (#ok(mintReceipts)) {
                                        pendingPayments := Array.filter<(Nat, Types.ArgsStore)>(pendingPayments, func (payment) {
                                             payment.0 != invoiceId
                                        });
                                        return #ok(mintReceipts);
                                   };
                                   case (#err(e)) {
                                        return #err("Minting failed: " # debug_show(e));
                                   };
                              };
                         };
                    };
               };
               case (#Wahana) {
                    let pendingPaymentOpt = Array.find<(Nat, Types.ArgsStoreWahana)>(pendingPaymentsWahana, func (payment) {
                         payment.0 == invoiceId
                    });

                    switch (pendingPaymentOpt) {
                         case null {
                              return #err("No pending payment found for the given invoice ID in the wahana.");
                         };
                         case (?payment) {
                              let args = payment.1;

                              let transferResult = await processTransfer(
                                   args.collectionActor,
                                   args.receiver,
                                   args.numOfVisitors,
                                   args.wahanaId,
                                   args.paymentType,
                                   args.offlineOrOnline,
                                   args.saleDate,
                                   args.price,
                                   args.recepient,
                                   args.caller,
                                   args.banner
                              );
                              switch (transferResult) {
                                   case (#ok(txIndices)) {
                                        pendingPaymentsWahana := Array.filter<(Nat, Types.ArgsStoreWahana)>(pendingPaymentsWahana, func (payment) {
                                             payment.0 != invoiceId
                                        });

                                        return #ok(txIndices);
                                   };
                                   case (#err(e)) {
                                        return #err("Transfer failed: " # debug_show(e));
                                   };
                              };
                         };
                    };
               };
               case(_) {
                    return #err("Invalid category specified. Please use 'venue', 'event', or 'wahana'.");
               };
          };
     };

     // private func performICPTransfer(
     //      user : Principal,
     //      amount : Nat,
     // ) : async Types.Result_3 {

     //      let fromAccount : Types.Account = {
     //           owner = user;
     //           subaccount = null;
     //      };

     //      let toAccount : Types.Account = {
     //           owner = recepient;
     //           subaccount = null;
     //      };
     //      let balanceCheck = Principal.toLedgerAccount(user, null);
     //      let balanceResult = await LedgerCanister.account_balance({
     //           account = balanceCheck;
     //      });
     //      Debug.print(
     //           "Transferring "
     //           # " balance "
     //           # debug_show (balanceResult)
     //      );
     //      if (Nat64.toNat(balanceResult.e8s) < amount) {
     //           throw Error.reject("Insufficient balance to create collection. Please ensure you have enough ICP.");
     //      };
     //      let transferArgs : Types.TransferFromArgs = {
     //        to = toAccount;
     //        fee = null;
     //        spender_subaccount = null;
     //        from = fromAccount;
     //        memo = null;
     //        created_at_time = null;
     //        amount = amount;
     //    };
     //    let transferResponse = await LedgerCanister.icrc2_transfer_from(transferArgs);
     //    transferResponse
     // };

     public shared ({caller}) func buyVenueTicket(
          venueId: Types.venueId,
          _ticket_type: Types.ticket_info,
          _metadata: nftTypes.MetadataDesc,
          receiver: Principal,
          paymentType: Types.PaymentType,
          saleDate : Time.Time,
          numOfVisitors: Nat
     ) : async Result.Result<Http.Response<Http.ResponseStatus<FiatTypes.Response.CreateInvoiceBody, {}>>, Text> {
          
          let venueResult = await getVenue(venueId);
          switch(venueResult){
               case (#ok(venue)){
                    let collectionId = await Utils.extractCanisterId(venueId);
                    let collectionActor = actor (collectionId) : actor {
                         logoDip721: () -> async Types.LogoResult;
                         bannerDip721: () -> async Types.LogoResult;
                         mintDip721: (to: Principal, metadata: Types.MetadataDesc, ticket_details: nftTypes.ticket_type, logo: Types.LogoResult) -> async nftTypes.MintReceipt;
                         getDIP721details : ()-> async nftTypes.Dip721NonFungibleToken;
                         totalSupplyDip721 : () -> async Nat64;
                         getMaxLimitDip721 : () -> async Nat16
                    };
                    let totalTickets = await collectionActor.totalSupplyDip721();
                    let maxLimit = await collectionActor.getMaxLimitDip721();
                    let dipDetails = await collectionActor.getDIP721details();
                    if (totalTickets >= Nat64.fromNat(Nat16.toNat(maxLimit))) {
                         return #err("Max ticket limit reached for the venue.");
                    };
                    var selectedTicketLimit: Nat = 0;
                    switch (_ticket_type.ticket_type) {
                         case (#SinglePass) {
                              selectedTicketLimit := dipDetails.sTicket_limit;
                         };
                         case (#VipPass) {
                              selectedTicketLimit := dipDetails.vTicket_limit;
                         };
                         case (#GroupPass) {
                              selectedTicketLimit := dipDetails.gTicket_limit;
                         };
                    };
                    var selectedTicketPrice: Float = 0.0;
                    switch (_ticket_type.ticket_type) {
                         case (#SinglePass) {
                              selectedTicketPrice := dipDetails.sTicket_price;
                         };
                         case (#VipPass) {
                              selectedTicketPrice := dipDetails.vTicket_price;
                         };
                         case (#GroupPass) {
                              selectedTicketPrice := dipDetails.gTicket_price;
                         };
                    };
                    if(_ticket_type.price != selectedTicketPrice){
                         return #err("Price doesnt match with ticket price set by admin");
                    };
                    let currentTicketCountResult = await getTicketsCountByType(#Venue, venueId, _ticket_type.ticket_type);
                    switch (currentTicketCountResult) {
                         case (#err(e)) {
                              return #err("Error fetching ticket count by type: " # e);
                         };
                         case (#ok(currentTicketCount)) {
                              if (currentTicketCount >= selectedTicketLimit) {
                                   return #err("Selected ticket type limit reached.");
                              };
                         };
                    };


                    switch (paymentType) {
                         case (#Cash) {
                              // throw Error.reject("Cash option is not available");
                              return #err("Cash option is not available");
                              // await processMint(collectionActor, _metadata, _ticket_type.ticket_type, receivers, numOfVisitors, venueId, paymentType, _ticket_type.price, "venue", caller);
                         };
                         case (#Card) {
                              var items : [FiatTypes.Item] = [];
                              
                              for (i in Iter.range(0, numOfVisitors - 1)) {
                                   items := Array.append(items, [{
                                        id = i;
                                        categoryId = venueId;
                                        categoryTitle = venue.Title;
                                        name = "Venue Ticket";
                                        quantity = 1;
                                        price = _ticket_type.price;
                                   }]);
                              };
                              let visitorsCount = Float.fromInt(numOfVisitors);
                              let invoice : FiatTypes.Request.CreateInvoiceBody = {
                                   amount = _ticket_type.price * visitorsCount ;
                                   paymentMethod = "Stripe";
                                   currency = "IDR";
                                   items = items
                              };
                              let create_invoice_response : Http.Response<Http.ResponseStatus<FiatTypes.Response.CreateInvoiceBody, {}>> = await FiatPayCanister.create_invoice(caller, invoice);
                              Debug.print(debug_show(create_invoice_response));
                              switch (create_invoice_response.body) {
                                   case (#success(responseBody)) {
                                        let invoice_id = responseBody.id;
                                        let args : Types.ArgsStore = {
                                             collectionActor = collectionActor;
                                             metadata = _metadata;
                                             ticketType = _ticket_type;
                                             receiver = receiver;
                                             numOfVisitors = numOfVisitors;
                                             categoryId = venueId;
                                             paymentType = paymentType;
                                             ticketPrice = _ticket_type.price;
                                             offlineOrOnline = #Online;
                                             saleDate = saleDate;
                                             saleType = #Venue;
                                             recepient = receiver;
                                             caller = caller;
                                        };
                                        pendingPayments := Array.append<(Nat,Types.ArgsStore)>([(invoice_id,args)],pendingPayments);
                                        return #ok(create_invoice_response);
                                   };
                                   case (#err(error)) {
                                        return #err(debug_show(error));
                                   };
                              };
                         };
                    };
               };
               case (#err(e)) { return #err("Venue not found"#debug_show(e)); };
          };
          
     };


      public shared ({caller}) func buyEventTicket(
          _venueId: Text,
          _eventId: Text,
          _ticket_type: Types.ticket_info,
          _metadata: nftTypes.MetadataDesc,
          receiver: Principal,
          saleDate : Time.Time,
          numOfVisitors: Nat,
          paymentType: Types.PaymentType
     ) : async Result.Result<Http.Response<Http.ResponseStatus<FiatTypes.Response.CreateInvoiceBody, {}>>, Text> {
          let eventResult = await getEvent(_eventId, _venueId);
          switch (eventResult) {
               case (#ok(event)) {
                    let collectionActor = actor (Principal.toText(event.event_collectionid)) : actor {
                         logoDip721: () -> async Types.LogoResult;
                         bannerDip721: () -> async Types.LogoResult;
                         mintDip721: (to: Principal, metadata: Types.MetadataDesc, ticket_details: nftTypes.ticket_type, logo: Types.LogoResult) -> async nftTypes.MintReceipt;
                         getDIP721details : ()-> async nftTypes.Dip721NonFungibleToken;
                         totalSupplyDip721 : () -> async Nat64;
                         getMaxLimitDip721 : () -> async Nat16
                    };
                    if(event.status != #Ongoing){
                         return #err("Check the event start and end timeline");
                    };
                    let totalTickets = await collectionActor.totalSupplyDip721();
                    let maxLimit = await collectionActor.getMaxLimitDip721();
                    let dipDetails = await collectionActor.getDIP721details();
                    if (totalTickets >= Nat64.fromNat(Nat16.toNat(maxLimit))) {
                         return #err("Max ticket limit reached for the venue.");
                    };
                    var selectedTicketLimit: Nat = 0;
                    switch (_ticket_type.ticket_type) {
                         case (#SinglePass) {
                              selectedTicketLimit := dipDetails.sTicket_limit;
                         };
                         case (#VipPass) {
                              selectedTicketLimit := dipDetails.vTicket_limit;
                         };
                         case (#GroupPass) {
                              selectedTicketLimit := dipDetails.gTicket_limit;
                         };
                    };
                    var selectedTicketPrice: Float = 0.0;
                    switch (_ticket_type.ticket_type) {
                         case (#SinglePass) {
                              selectedTicketPrice := dipDetails.sTicket_price;
                         };
                         case (#VipPass) {
                              selectedTicketPrice := dipDetails.vTicket_price;
                         };
                         case (#GroupPass) {
                              selectedTicketPrice := dipDetails.gTicket_price;
                         };
                    };
                    if(_ticket_type.price != selectedTicketPrice){
                         return #err("Price doesnt match with ticket price set by admin");
                    };
                    let currentTicketCountResult = await getTicketsCountByType(#Event, _eventId, _ticket_type.ticket_type);
                    switch (currentTicketCountResult) {
                         case (#err(e)) {
                              return #err("Error fetching ticket count by type: " # e);
                         };
                         case (#ok(currentTicketCount)) {
                              if (currentTicketCount >= selectedTicketLimit) {
                                   return #err("Selected ticket type limit reached.");
                              };
                         };
                    };
                    switch (paymentType) {
                         case (#Cash) {
                              // throw Error.reject("Cash option is not available");
                              return #err("Cash option is not available");
                              // await processMint(collectionActor, _metadata, _ticket_type.ticket_type, receivers, numOfVisitors, _eventId, paymentType, _ticket_type.price, "event", caller);
                         };
                         case (#Card) {
                              var items : [FiatTypes.Item] = [];
                              
                              for (i in Iter.range(0, numOfVisitors - 1)) {
                                   items := Array.append(items, [{
                                        id = i;
                                        categoryId = _eventId;
                                        categoryTitle = event.title;
                                        name = "Event Ticket";
                                        quantity = 1;
                                        price = _ticket_type.price;
                                   }]);
                              };
                              let visitorsCount = Float.fromInt(numOfVisitors);
                              let invoice : FiatTypes.Request.CreateInvoiceBody = {
                                   amount = _ticket_type.price * visitorsCount;
                                   paymentMethod = "Stripe";
                                   currency = "IDR";
                                   items = items
                              };
                              let create_invoice_response : Http.Response<Http.ResponseStatus<FiatTypes.Response.CreateInvoiceBody, {}>> = await FiatPayCanister.create_invoice(caller, invoice);
                              Debug.print(debug_show(create_invoice_response));
                              switch (create_invoice_response.body) {
                                   case (#success(responseBody)) {
                                        let invoice_id = responseBody.id;
                                        let args : Types.ArgsStore = {
                                             collectionActor = collectionActor;
                                             metadata = _metadata;
                                             ticketType = _ticket_type;
                                             receiver = receiver;
                                             numOfVisitors = numOfVisitors;
                                             categoryId = _eventId;
                                             paymentType = paymentType;
                                             ticketPrice = _ticket_type.price;
                                             offlineOrOnline = #Online;
                                             saleDate = saleDate;
                                             saleType = #Event;
                                             recepient = receiver;
                                             caller = caller;
                                        };
                                        pendingPayments := Array.append<(Nat,Types.ArgsStore)>([(invoice_id,args)],pendingPayments);
                                        return #ok(create_invoice_response);
                                   };
                                   case (#err(error)) {
                                        return #err(debug_show(error));
                                   };
                              };
                         };
                    };
               };
               case (#err(e)) { return #err("Event not found"#debug_show(e)); };
          };
     };

     public shared ({caller}) func buyWahanaToken(
          venueId: Text,
          wahanaId: Text,
          receiver: Principal,
          saleDate : Time.Time,
          numOfVisitors: Nat,
          paymentType: Types.PaymentType
     ) : async Result.Result<Http.Response<Http.ResponseStatus<FiatTypes.Response.CreateInvoiceBody, {}>>, Text> {
          let wahanaResult = await getWahana(wahanaId, venueId);
          Debug.print(debug_show(wahanaResult));
          switch (wahanaResult) {
               case (#ok(wahana)) {
                    let collId = await Utils.extractCanisterId(wahana.id);
                    let collectionActor = actor (collId) : actor {
                         icrc1_transfer: ({
                              from_subaccount: ?TypesICRC.Subaccount;
                              to: TypesICRC.Account;
                              amount: TypesICRC.Tokens;
                              fee: ?TypesICRC.Tokens;
                              memo: ?TypesICRC.Memo;
                              created_at_time: ?TypesICRC.Timestamp;
                         }) -> async TypesICRC.Result<TypesICRC.TxIndex, TypesICRC.TransferError>;
                         icrc1_total_supply : ()-> async Types.Tokens
                    };
                    let maxLimit = await collectionActor.icrc1_total_supply();
                    let totalTickets = await getTicketsCountByType(#Venue, venueId, #SinglePass);
                    switch(totalTickets){
                         case(#err(e)){
                              return #err(e);
                         };
                         case(#ok(count)){
                              let e8s : Nat64 = Nat64.fromNat(count);
                              if ( count >= Nat64.toNat(maxLimit.e8s)) {
                                   return #err("Max ticket limit reached for the venue.");
                              };
                         };
                    };
                    switch (paymentType) {
                         case (#Cash) {
                              // throw Error.reject("Cash option is not available");
                              return #err("Cash option is not available");
                              // await processTransfer(collectionActor, receivers, numOfVisitors, wahanaId, paymentType, wahana.price,caller);
                         };
                         case (#Card) {
                              var items : [FiatTypes.Item] = [];
                              for (i in Iter.range(0, numOfVisitors - 1)) {
                                   items := Array.append(items, [{
                                        id = i;
                                        categoryId = wahanaId;
                                        categoryTitle = wahana.ride_title;
                                        name = "Wahana Ticket";
                                        quantity = 1;
                                        price = wahana.price;
                                   }]);
                              };
                              let visitorsCount = Float.fromInt(numOfVisitors);
                              let invoice : FiatTypes.Request.CreateInvoiceBody = {
                                   amount = wahana.price * visitorsCount;
                                   paymentMethod = "Stripe";
                                   currency = "IDR";
                                   items = items
                              };
                              let create_invoice_response : Http.Response<Http.ResponseStatus<FiatTypes.Response.CreateInvoiceBody, {}>> = await FiatPayCanister.create_invoice(caller, invoice);
                              Debug.print(debug_show(create_invoice_response));
                              switch (create_invoice_response.body) {
                                   case (#success(responseBody)) {
                                        let invoice_id = responseBody.id;
                                        let args : Types.ArgsStoreWahana = {
                                             collectionActor = collectionActor;
                                             receiver = receiver;
                                             numOfVisitors = numOfVisitors;
                                             wahanaId = wahanaId;
                                             paymentType = paymentType;
                                             offlineOrOnline = #Online;
                                             saleDate = saleDate;
                                             price = wahana.price;
                                             recepient = receiver;
                                             caller = caller;
                                             banner = wahana.banner.data
                                        };
                                        pendingPaymentsWahana := Array.append<(Nat,Types.ArgsStoreWahana)>([(invoice_id,args)],pendingPaymentsWahana);
                                        return #ok(create_invoice_response);
                                   };
                                   case (#err(error)) {
                                        return #err(debug_show(error));
                                   };
                              };
                         };
                    };
                    // await processTransfer(collectionActor, receivers, numOfVisitors, wahanaId, paymentType, wahana.price,caller);
               };
               case (#err(e)) { 
                    return #err("Wahana not found"#debug_show(e)); 
               };
          };
     };



     public shared ({caller}) func buyOfflineVenueTicket(
          venueId: Types.venueId,
          _ticket_type: Types.ticket_info,
          _metadata: nftTypes.MetadataDesc,
          receiver: Principal,
          saleDate : Time.Time,
          paymentType: Types.PaymentType,
          numOfVisitors: Nat
     ) : async Result.Result<[nftTypes.MintReceiptPart], Types.MintError or Text> {
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)) or 
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          let collectionId = await Utils.extractCanisterId(venueId);
          let collectionActor = actor (collectionId) : actor {
               logoDip721: () -> async Types.LogoResult;
               bannerDip721: () -> async Types.LogoResult;
               mintDip721: (to: Principal, metadata: Types.MetadataDesc, ticket_details: nftTypes.ticket_type, logo: Types.LogoResult) -> async nftTypes.MintReceipt;
               getDIP721details : ()-> async nftTypes.Dip721NonFungibleToken;
               totalSupplyDip721 : () -> async Nat64;
               getMaxLimitDip721 : () -> async Nat16
          };
          let totalTickets = await collectionActor.totalSupplyDip721();
          let maxLimit = await collectionActor.getMaxLimitDip721();
          let dipDetails = await collectionActor.getDIP721details();
          if (totalTickets >= Nat64.fromNat(Nat16.toNat(maxLimit))) {
               return #err("Max ticket limit reached for the venue.");
          };
          var selectedTicketLimit: Nat = 0;
          switch (_ticket_type.ticket_type) {
               case (#SinglePass) {
                    selectedTicketLimit := dipDetails.sTicket_limit;
               };
               case (#VipPass) {
                    selectedTicketLimit := dipDetails.vTicket_limit;
               };
               case (#GroupPass) {
                    selectedTicketLimit := dipDetails.gTicket_limit;
               };
          };
          var selectedTicketPrice: Float = 0.0;
          switch (_ticket_type.ticket_type) {
               case (#SinglePass) {
                    selectedTicketPrice := dipDetails.sTicket_price;
               };
               case (#VipPass) {
                    selectedTicketPrice := dipDetails.vTicket_price;
               };
               case (#GroupPass) {
                    selectedTicketPrice := dipDetails.gTicket_price;
               };
          };
          if(_ticket_type.price != selectedTicketPrice){
               return #err("Price doesnt match with ticket price set by admin");
          };
          let currentTicketCountResult = await getTicketsCountByType(#Venue, venueId, _ticket_type.ticket_type);
          switch (currentTicketCountResult) {
               case (#err(e)) {
                    return #err("Error fetching ticket count by type: " # e);
               };
               case (#ok(currentTicketCount)) {
                    if (currentTicketCount >= selectedTicketLimit) {
                         return #err("Selected ticket type limit reached.");
                    };
               };
          };
          switch (paymentType) {
               case (#Cash) {
                    await processMint(collectionActor, _metadata, _ticket_type, receiver, numOfVisitors, venueId, paymentType, _ticket_type.price, #Offline,  saleDate, #Venue, receiver, caller);
               };
               case (#Card) {
                    // throw Error.reject("Card option is not available");
                    return #err("Card not Available");
               };
          };
     };


      public shared ({caller}) func buyOfflineEventTicket(
          _venueId: Text,
          _eventId: Text,
          _ticket_type: Types.ticket_info,
          _metadata: nftTypes.MetadataDesc,
          receiver: Principal,
          saleDate : Time.Time,
          numOfVisitors: Nat,
          paymentType: Types.PaymentType
     ) : async Result.Result<[nftTypes.MintReceiptPart], Types.MintError or Text> {
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)) or 
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          let eventResult = await getEvent(_eventId, _venueId);
          switch (eventResult) {
               case (#ok(event)) {
                    let collectionActor = actor (Principal.toText(event.event_collectionid)) : actor {
                         logoDip721: () -> async Types.LogoResult;
                         bannerDip721: () -> async Types.LogoResult;
                         mintDip721: (to: Principal, metadata: Types.MetadataDesc, ticket_details: nftTypes.ticket_type, logo: Types.LogoResult) -> async nftTypes.MintReceipt;
                         getDIP721details : ()-> async nftTypes.Dip721NonFungibleToken;
                         totalSupplyDip721 : () -> async Nat64;
                         getMaxLimitDip721 : () -> async Nat16
                    };
                    if(event.status != #Ongoing){
                         return #err("Check the event start and end timeline");
                    };
                    let totalTickets = await collectionActor.totalSupplyDip721();
                    let maxLimit = await collectionActor.getMaxLimitDip721();
                    let dipDetails = await collectionActor.getDIP721details();
                    if (totalTickets >= Nat64.fromNat(Nat16.toNat(maxLimit))) {
                         return #err("Max ticket limit reached for the venue.");
                    };
                    var selectedTicketLimit: Nat = 0;
                    switch (_ticket_type.ticket_type) {
                         case (#SinglePass) {
                              selectedTicketLimit := dipDetails.sTicket_limit;
                         };
                         case (#VipPass) {
                              selectedTicketLimit := dipDetails.vTicket_limit;
                         };
                         case (#GroupPass) {
                              selectedTicketLimit := dipDetails.gTicket_limit;
                         };
                    };
                    var selectedTicketPrice: Float = 0.0;
                    switch (_ticket_type.ticket_type) {
                         case (#SinglePass) {
                              selectedTicketPrice := dipDetails.sTicket_price;
                         };
                         case (#VipPass) {
                              selectedTicketPrice := dipDetails.vTicket_price;
                         };
                         case (#GroupPass) {
                              selectedTicketPrice := dipDetails.gTicket_price;
                         };
                    };
                    if(_ticket_type.price != selectedTicketPrice){
                         return #err("Price doesnt match with ticket price set by admin");
                    };
                    let currentTicketCountResult = await getTicketsCountByType(#Event, _eventId, _ticket_type.ticket_type);
                    switch (currentTicketCountResult) {
                         case (#err(e)) {
                              return #err("Error fetching ticket count by type: " # e);
                         };
                         case (#ok(currentTicketCount)) {
                              if (currentTicketCount >= selectedTicketLimit) {
                                   return #err("Selected ticket type limit reached.");
                              };
                         };
                    };
                    switch (paymentType) {
                         case (#Cash) {
                              await processMint(collectionActor, _metadata, _ticket_type, receiver, numOfVisitors, _eventId, paymentType, _ticket_type.price, #Offline, saleDate, #Event, receiver, caller);
                         };
                         case (#Card) {
                              // throw Error.reject("Card option is not available");
                              return #err("Card not Available");
                         };
                    };
               };
               case (#err(e)) { return #err(#EventError); };
          };
     };

     public shared ({caller}) func buyOfflineWahanaToken(
          venueId: Text,
          wahanaId: Text,
          receiver: Principal,
          numOfVisitors: Nat,
          saleDate : Time.Time,
          paymentType: Types.PaymentType
     ) : async Result.Result<[icrcTypes.TxIndex], icrcTypes.TransferError or Text> {
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)) or 
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          let wahanaResult = await getWahana(wahanaId, venueId);
          switch (wahanaResult) {
               case (#ok(wahana)) {
                    let collId = await Utils.extractCanisterId(wahana.id);
                    let collectionActor = actor (collId) : actor {
                         icrc1_transfer: ({
                              from_subaccount: ?TypesICRC.Subaccount;
                              to: TypesICRC.Account;   
                              amount: TypesICRC.Tokens;
                              fee: ?TypesICRC.Tokens;
                              memo: ?TypesICRC.Memo;
                              created_at_time: ?TypesICRC.Timestamp;
                         }) -> async TypesICRC.Result<TypesICRC.TxIndex, TypesICRC.TransferError>;
                         icrc1_total_supply : ()-> async Types.Tokens
                    };
                    let maxLimit = await collectionActor.icrc1_total_supply();
                    let totalTickets = await getTicketsCountByType(#Venue, venueId, #SinglePass);
                    switch(totalTickets){
                         case(#err(e)){
                              return #err(e);
                         };
                         case(#ok(count)){
                              let e8s : Nat64 = Nat64.fromNat(count);
                              if ( count >= Nat64.toNat(maxLimit.e8s)) {
                                   return #err("Max ticket limit reached for the venue.");
                              };
                         };
                    };
                    switch (paymentType) {
                         case (#Cash) {
                              await processTransfer(collectionActor, receiver, numOfVisitors, wahanaId, paymentType, #Offline, saleDate,  wahana.price, receiver, caller,wahana.banner.data);
                         };
                         case (#Card) {
                              // throw Error.reject("Card option is not available");
                              return #err("Card not Available");
                         };
                    };
                    // await processTransfer(collectionActor, receivers, numOfVisitors, wahanaId, paymentType, wahana.price,caller);
               };
               case (#err(e)) { return #err(#WahanaError); };
          };
     };


    

     // public shared ({caller}) func buyOfflineVenueTicket(
     //      venueId: Types.venueId,
     //      _ticket_type: Types.ticket_info,
     //      _metadata: nftTypes.MetadataDesc,
     //      receivers : [Principal],
     //      paymentType: Types.PaymentType,
     //      numOfVisitors: Nat
     // ) : async Result.Result<[nftTypes.MintReceiptPart], Types.MintError> {
     //      // if (Principal.isAnonymous(caller)) {
     //      //      return #err(#UserNotAuthenticated); 
     //      // }; 
     //      // let roleResult = await getRoleByPrincipal(caller);
     //      // switch (roleResult) {
     //      //      case (#err(error)) {
     //      //           return #err(#RoleError);
     //      //      };
     //      //      case (#ok(role)) {
     //      //           if (not ((await Validation.check_for_sysAdmin(role)) or (await Validation.check_for_Admin(role)))) {
     //      //                return #err(#UserNotAuthorized);
     //      //           };
     //      //      };
     //      // };
     //      let collection_id = await Utils.extractCanisterId(venueId);
     //      let collection_actor = actor (collection_id) : actor {
     //           logoDip721: () -> async Types.LogoResult;
     //           mintDip721: (to: Principal, metadata: Types.MetadataDesc, ticket_details: nftTypes.ticket_type, logo: Types.LogoResult) -> async nftTypes.MintReceipt;
     //      };
     //      let _logo = await collection_actor.logoDip721();
     //      var mintReceipts: List.List<nftTypes.MintReceiptPart> = List.nil();
     //      for (i in Iter.range(0, numOfVisitors - 1)) {
     //           if (numOfVisitors > Array.size(receivers)) {
     //                throw Error.reject("Receivers Count doesnot match number of visitors");
     //                return #err(#ReceiversCountError);
     //           };
     //           let _ticketResult = await collection_actor.mintDip721(receivers[i], _metadata, _ticket_type.ticket_type, _logo);
               
     //           switch (_ticketResult) {
     //                case (#Ok(mintReceipt)) {

     //                     mintReceipts := List.push(mintReceipt, mintReceipts);
     //                     let ticketSaleInfo: Types.TicketSaleInfo = {
     //                          ticketId = Nat64.toNat(mintReceipt.token_id);
     //                          category = "venue";
     //                          paymentType = paymentType;
     //                          numOfVisitors = 1;
     //                          saleDate = Time.now();
     //                          ticketIssuer = caller;
     //                          price = _ticket_type.price;
     //                     };

     //                     let res = await recordTicketSale(venueId, ticketSaleInfo, "venue");
     //                     Debug.print(debug_show(res));
     //                };
     //                case (#Err(e)) {
     //                     Debug.print(debug_show(e));
     //                     return #err(#MintErr);
     //                };
     //           };
     //      };
     //      return #ok(List.toArray(mintReceipts));
     // };

     


     // public shared ({caller}) func buyOfflineEventTicket(
     //      _venueId : Text,
     //      _eventId : Text,
     //      _ticket_type : Types.ticket_info,
     //      _metadata : nftTypes.MetadataDesc,
     //      receivers : [Principal],
     //      numOfVisitors : Nat, 
     //      paymentType : Types.PaymentType
     // ) : async Result.Result<[nftTypes.MintReceiptPart], Types.MintError> {
          
     //      let eventResult = await getEvent(_eventId, _venueId);
          
     //      switch (eventResult) {
     //           case (#err(e)) {
     //                return #err(#EventError);
     //           };
     //           case (#ok(_event)) {
     //                let collection_actor = actor (Principal.toText(_event.event_collectionid)) : actor {
     //                     logoDip721 : () -> async Types.LogoResult;
     //                     mintDip721 : (to : Principal, metadata : Types.MetadataDesc, ticket_details : nftTypes.ticket_type, logo : Types.LogoResult) -> async nftTypes.MintReceipt;                                        
     //                };

     //                let _logo = await collection_actor.logoDip721();
     //                var mintReceipts: List.List<nftTypes.MintReceiptPart> = List.nil();

     //                for (i in Iter.range(0, numOfVisitors - 1)) {
     //                     if (numOfVisitors > Array.size(receivers)) {
     //                          throw Error.reject("Receivers Count doesnot match number of visitors");
     //                          return #err(#ReceiversCountError);
     //                     };

     //                     let _ticketResult = await collection_actor.mintDip721(receivers[i], _metadata, _ticket_type.ticket_type, _logo);
     //                     switch (_ticketResult) {
     //                          case (#Ok(mintReceipt)) {
     //                               mintReceipts := List.push(mintReceipt, mintReceipts);
     //                               let ticketSaleInfo: Types.TicketSaleInfo = {
     //                                    ticketId = Nat64.toNat(mintReceipt.token_id);
     //                                    category = "event";
     //                                    paymentType = paymentType;
     //                                    numOfVisitors = 1;
     //                                    saleDate = Time.now();
     //                                    ticketIssuer = caller;
     //                                    price = _ticket_type.price;
     //                               };
     //                               let res = await recordTicketSale(_eventId, ticketSaleInfo, "event");
     //                          };
     //                          case (#Err(e)) {
     //                               Debug.print(debug_show(e));
     //                               return #err(#MintErr);
     //                          };
     //                     };
     //                };

     //                return #ok(List.toArray(mintReceipts));
     //           };
     //      };
     // };

     // public shared ({caller}) func buyOfflineWahanaToken(
     //      venueId : Text, 
     //      wahanaId : Text, 
     //      receivers : [Principal], 
     //      numOfVisitors : Nat, 
     //      paymentType : Types.PaymentType 
     // ) : async Result.Result<[icrcTypes.TxIndex], icrcTypes.TransferError or Types.MintError> {

     //      let wahanaResult = await getWahana(wahanaId, venueId);
          
     //      switch (wahanaResult) {
     //           case (#err(e)) {
     //                return #err(#WahanaError);
     //           };
     //           case (#ok(_wahana)) {
     //                let collection_actor = actor (_wahana.id) : actor {
     //                     icrc1_transfer : ({
     //                          from_subaccount : ?TypesICRC.Subaccount;
     //                          to : TypesICRC.Account;
     //                          amount : TypesICRC.Tokens;
     //                          fee : ?TypesICRC.Tokens;
     //                          memo : ?TypesICRC.Memo;
     //                          created_at_time : ?TypesICRC.Timestamp;
     //                     }) -> async TypesICRC.Result<TypesICRC.TxIndex, TypesICRC.TransferError>
     //                };

     //                var transferReceipts: List.List<icrcTypes.TxIndex> = List.nil();

     //                for (i in Iter.range(0, numOfVisitors - 1)) {
     //                     if (numOfVisitors > Array.size(receivers)) {
     //                          throw Error.reject("Receivers Count doesnot match number of visitors");
     //                          return #err(#ReceiversCountError);
     //                     };

     //                     let transferObj = {
     //                          from_subaccount = null : ?TypesICRC.Subaccount;
     //                          to = { owner = receivers[i]; subaccount = null } : TypesICRC.Account;
     //                          amount = 1 : TypesICRC.Tokens;
     //                          memo = null : ?TypesICRC.Memo;
     //                          created_at_time = null : ?TypesICRC.Timestamp;
     //                          fee = null : ?TypesICRC.Tokens;
     //                     };

     //                     let _ticketResult = await collection_actor.icrc1_transfer(transferObj);
     //                     switch (_ticketResult) {
     //                          case (#Ok(transferReceipt)) {
     //                               transferReceipts := List.push(transferReceipt, transferReceipts);
     //                               let ticketSaleInfo: Types.TicketSaleInfo = {
     //                                    ticketId = transferReceipt;
     //                                    category = "wahana";
     //                                    paymentType = paymentType;
     //                                    numOfVisitors = 1;
     //                                    saleDate = Time.now();
     //                                    ticketIssuer = caller;
     //                                    price = _wahana.price
     //                               };
     //                               let res = await recordTicketSale(wahanaId, ticketSaleInfo, "wahana");
     //                               Debug.print(debug_show(res));
     //                          };
     //                          case (#Err(e)) {
     //                               Debug.print(debug_show(e));
     //                               return #err(e);
     //                          };
     //                     };
     //                };

     //                return #ok(List.toArray(transferReceipts));
     //           };
     //      };
     // };

     public shared func getTotalTicketsCountByCategory(category : Types.category, id : Text) : async Result.Result<Nat, Text> {
          switch(category){
               case(#Venue){
                    let count = await getVenueTickets(id);
                    switch(count){
                         case(#err(e)){
                              return #err(e);
                         };
                         case(#ok(obj)){
                              return #ok(Array.size<Types.TicketSaleInfo>(obj));
                         };
                    };
               };
               case(#Event){
                    let count = await getEventTickets(id);
                    switch(count){
                         case(#err(e)){
                              return #err(e);
                         };
                         case(#ok(obj)){
                              return #ok(Array.size<Types.TicketSaleInfo>(obj));
                         };
                    };
               };
               case(#Wahana){
                    let count = await getWahanaTickets(id);
                    switch(count){
                         case(#err(e)){
                              return #err(e);
                         };
                         case(#ok(obj)){
                              return #ok(Array.size<Types.TicketSaleInfo>(obj));
                         };
                    };
               }
          }
     };

     public shared func getTicketsCountByType(
          category: Types.category, 
          id: Text,
          ticketType: nftTypes.ticket_type
     ) : async Result.Result<Nat, Text> {
          let collectionId = await Utils.extractCanisterId(id);
          let collectionActor = actor (collectionId) : actor {
               getNFT: (token_id: nftTypes.TokenId) -> async nftTypes.NftResult;
          };
          switch (category) {
               case (#Venue) {
                    let ticketsResult = await getVenueTickets(id);
                    switch (ticketsResult) {
                         case (#err(e)) {
                              return #ok(0);
                         };
                         case (#ok(tickets)) {
                              var count: Nat = 0;
                              for (ticket in tickets.vals()) {
                                   let nftDetailsResult = await collectionActor.getNFT(Nat64.fromNat(ticket.ticketId));
                                   switch (nftDetailsResult) {
                                        case (#Err(e)) {
                                             return #err("Error getting NFT details");
                                        };
                                        case (#Ok(nftDetails)) {
                                             // Compare the ticket type
                                             if (nftDetails.ticket_type == ticketType) {
                                                  count += 1;
                                             };
                                        };
                                   };
                              };

                              return #ok(count);
                         };
                    };
               };
               case (#Event) {
                    let ticketsResult = await getEventTickets(id);
                    switch (ticketsResult) {
                         case (#err(e)) {
                              return #ok(0);
                         };
                         case (#ok(tickets)) {
                              var count: Nat = 0;
                              for (ticket in tickets.vals()) {
                                   let nftDetailsResult = await collectionActor.getNFT(Nat64.fromNat(ticket.ticketId));
                                   switch (nftDetailsResult) {
                                        case (#Err(e)) {
                                             return #err("Error getting NFT details");
                                        };
                                        case (#Ok(nftDetails)) {
                                             // Compare the ticket type
                                             if (nftDetails.ticket_type == ticketType) {
                                                  count += 1;
                                             };
                                        };
                                   };
                              };

                              return #ok(count);
                         };
                    };
               };
               case (#Wahana) {
                    let count = await getWahanaTickets(id);
                    switch(count){
                         case(#err(e)){
                              return #ok(0);
                         };
                         case(#ok(obj)){
                              return #ok(Array.size<Types.TicketSaleInfo>(obj));
                         };
                    };
               };
          };
     };


     public shared ({caller}) func getVenueTickets(venueId : Text) : async Result.Result<[Types.TicketSaleInfo], Text> {
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)) or 
          //                (await Validation.check_for_Manager(role)) or 
          //                (await Validation.check_for_Bod(role)))
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          switch (_VenueTicketsMap.get(venueId)) {
               case null {
                    return #err("Venue Ticets not found");
               };
               case (?ticketsIndex) {
                    let ticketBlob = await stable_get(ticketsIndex, Ticket_state);
                    let obj: ?List.List<Types.TicketSaleInfo> = from_candid(ticketBlob);
                    switch obj {
                         case null {
                              return #err("Failed to deserialize ticket data");
                         };
                         case (?deserializedTickets) {
                              return #ok(List.toArray(deserializedTickets));
                         };
                    };
               };
          }
     };


     public shared ({caller}) func getEventTickets(eventId : Text) : async Result.Result<[Types.TicketSaleInfo], Text> {
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)) or 
          //                (await Validation.check_for_Manager(role)) or 
          //                (await Validation.check_for_Bod(role)))
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          switch (_EventTicketsMap.get(eventId)) {
               case null {
                    return #err("Event Tickets not found");
               };
               case (?ticketsIndex) {
                    let ticketBlob = await stable_get(ticketsIndex, Ticket_state);
                    let obj: ?List.List<Types.TicketSaleInfo> = from_candid(ticketBlob);
                    switch obj {
                         case null {
                              return #err("Failed to deserialize ticket data");
                         };
                         case (?deserializedTickets) {
                              return #ok(List.toArray(deserializedTickets));
                         };
                    };
               };
          }
     };



     public shared ({caller}) func getWahanaTickets(wahanaId : Text) : async Result.Result<[Types.TicketSaleInfo], Text> {
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)) or 
          //                (await Validation.check_for_Manager(role)) or 
          //                (await Validation.check_for_Bod(role)))
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          switch (_WahanaTicketsMap.get(wahanaId)) {
               case null {
                    return #err("Wahana Tickets not found");
               };
               case (?ticketsIndex) {
                    let ticketBlob = await stable_get(ticketsIndex, Ticket_state);
                    let obj: ?List.List<Types.TicketSaleInfo> = from_candid(ticketBlob);
                    switch obj {
                         case null {
                              return #err("Failed to deserialize ticket data");
                         };
                         case (?deserializedTickets) {
                              return #ok(List.toArray(deserializedTickets));
                         };
                    };
               };
          }
     };

     public shared ({caller}) func getAllCallerVenueTickets(
          chunkSize: Nat,
          pageNo: Nat
     ): async Result.Result<{ data: [Types.TicketSaleInfo]; current_page: Nat; total_pages: Nat }, Text> {
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)) or 
          //                (await Validation.check_for_Manager(role)) or 
          //                (await Validation.check_for_Bod(role)))
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          var allTickets = List.nil<Types.TicketSaleInfo>();

          for ((_, ticketsIndex) in _VenueTicketsMap.entries()) {
               let ticketBlob = await stable_get(ticketsIndex, Ticket_state);
               let obj: ?List.List<Types.TicketSaleInfo> = from_candid(ticketBlob);
               switch obj {
                    case null {
                         return #err("Failed to deserialize ticket data");
                    };
                    case (?deserializedTickets) {
                         for (ticket in List.toArray(deserializedTickets).vals()) {
                              if (ticket.recepient == caller) {
                                   allTickets := List.push<Types.TicketSaleInfo>(ticket, allTickets);
                              };
                         };
                    };
               };
          };

          let ticketsArray = List.toArray(allTickets);
          let indexPages = Utils.paginate<Types.TicketSaleInfo>(ticketsArray, chunkSize);

          if (pageNo >= indexPages.size() or indexPages.size() == 0) {
               return #err("Page not found");
          };

          let pageData = indexPages[pageNo];
          return #ok({
               data = pageData;
               current_page = pageNo + 1;
               total_pages = indexPages.size();
          });
     };


     public shared ({caller}) func getAllCallerEventTickets(
          chunkSize: Nat,
          pageNo: Nat
     ): async Result.Result<{ data: [Types.TicketSaleInfo]; current_page: Nat; total_pages: Nat }, Text> {
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)) or 
          //                (await Validation.check_for_Manager(role)) or 
          //                (await Validation.check_for_Bod(role)))
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          var allTickets = List.nil<Types.TicketSaleInfo>();

          for ((_, ticketsIndex) in _EventTicketsMap.entries()) {
               let ticketBlob = await stable_get(ticketsIndex, Ticket_state);
               let obj: ?List.List<Types.TicketSaleInfo> = from_candid(ticketBlob);
               switch obj {
                    case null {
                         return #err("Failed to deserialize ticket data");
                    };
                    case (?deserializedTickets) {
                         for (ticket in List.toArray(deserializedTickets).vals()) {
                              if (ticket.recepient == caller) {
                              allTickets := List.push(ticket, allTickets);
                              };
                         };
                    };
               };
          };

          let ticketsArray = List.toArray(allTickets);
          let indexPages = Utils.paginate<Types.TicketSaleInfo>(ticketsArray, chunkSize);

          if (pageNo >= indexPages.size() or indexPages.size() == 0) {
               return #err("Page not found");
          };

          let pageData = indexPages[pageNo];
          return #ok({
               data = pageData;
               current_page = pageNo + 1;
               total_pages = indexPages.size();
          });
     };


     public shared ({caller}) func getAllCallerWahanaTickets(
          chunkSize: Nat,
          pageNo: Nat
     ): async Result.Result<{ data: [Types.TicketSaleInfo]; current_page: Nat; total_pages: Nat }, Text> {
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)) or 
          //                (await Validation.check_for_Manager(role)) or 
          //                (await Validation.check_for_Bod(role)))
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          var allTickets = List.nil<Types.TicketSaleInfo>();

          for ((_, ticketsIndex) in _WahanaTicketsMap.entries()) {
               let ticketBlob = await stable_get(ticketsIndex, Ticket_state);
               let obj: ?List.List<Types.TicketSaleInfo> = from_candid(ticketBlob);
               switch obj {
                    case null {
                         return #err("Failed to deserialize ticket data");
                    };
                    case (?deserializedTickets) {
                         for (ticket in List.toArray(deserializedTickets).vals()) {
                              if (ticket.recepient == caller) {
                              allTickets := List.push(ticket, allTickets);
                              };
                         };
                    };
               };
          };

          let ticketsArray = List.toArray(allTickets);
          let indexPages = Utils.paginate<Types.TicketSaleInfo>(ticketsArray, chunkSize);

          if (pageNo >= indexPages.size() or indexPages.size() == 0) {
               return #err("Page not found");
          };

          let pageData = indexPages[pageNo];
          return #ok({
               data = pageData;
               current_page = pageNo + 1;
               total_pages = indexPages.size();
          });
     };


     public shared ({caller}) func getAllCallerTickets(
          chunkSize: Nat,
          pageNo: Nat
     ): async Result.Result<{ data: [Types.TicketSaleInfo]; current_page: Nat; total_pages: Nat }, Text> {
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)) or 
          //                (await Validation.check_for_Manager(role)) or 
          //                (await Validation.check_for_Bod(role)))
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          let venueTickets = async {
               await fetchCategoryTickets(_VenueTicketsMap, caller);
          };
          let eventTickets = async {
               await fetchCategoryTickets(_EventTicketsMap, caller);
          };
          let wahanaTickets = async {
               await fetchCategoryTickets(_WahanaTicketsMap, caller);
          };

          let allTickets = List.append(
               await venueTickets,
               List.append(await eventTickets, await wahanaTickets)
          );

          return paginateTickets(allTickets, chunkSize, pageNo);
     };

     public shared func getAllTickets(
          chunkSize: Nat,
          pageNo: Nat
     ): async Result.Result<{ data: [Types.TicketSaleInfo]; current_page: Nat; total_pages: Nat }, Text> {
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)) or 
          //                (await Validation.check_for_Manager(role)) or 
          //                (await Validation.check_for_Bod(role)))
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          let venueTickets = async {
               await fetchAllCategoryTickets(_VenueTicketsMap);
          };
          let eventTickets = async {
               await fetchAllCategoryTickets(_EventTicketsMap);
          };
          let wahanaTickets = async {
               await fetchAllCategoryTickets(_WahanaTicketsMap);
          };

          // Combine tickets from all categories
          let allTickets = List.append(
               await venueTickets,
               List.append(await eventTickets, await wahanaTickets)
          );

          // Paginate and return
          return paginateTickets(allTickets, chunkSize, pageNo);
     };

     private func fetchCategoryTickets(
          categoryMap: TrieMap.TrieMap<Text, Types.Index>,
          caller : Principal
     ): async List.List<Types.TicketSaleInfo> {
          var tickets = List.nil<Types.TicketSaleInfo>();

          for ((_, ticketsIndex) in categoryMap.entries()) {
               let ticketBlob = await stable_get(ticketsIndex, Ticket_state);
               let obj: ?List.List<Types.TicketSaleInfo> = from_candid(ticketBlob);
               switch obj {
                    case null {
                         // No tickets to append
                    };
                    case (?deserializedTickets) {
                         tickets := List.append(
                              tickets,
                              List.filter<Types.TicketSaleInfo>(deserializedTickets, func (ticket) {
                                   ticket.recepient == caller
                              })
                         );
                    };
               };
          };

          return tickets;
     };

     private func fetchAllCategoryTickets(
          categoryMap: TrieMap.TrieMap<Text, Types.Index>
     ): async List.List<Types.TicketSaleInfo> {
          var tickets = List.nil<Types.TicketSaleInfo>();

          for ((_, ticketsIndex) in categoryMap.entries()) {
               let ticketBlob = await stable_get(ticketsIndex, Ticket_state);
               let obj: ?List.List<Types.TicketSaleInfo> = from_candid(ticketBlob);

               switch obj {
                    case null {
                         // No tickets to append
                    };
                    case (?deserializedTickets) {
                         tickets := List.append(tickets, deserializedTickets);
                    };
               };
          };

          return tickets;
     };

     private func paginateTickets(
          allTickets: List.List<Types.TicketSaleInfo>,
          chunkSize: Nat,
          pageNo: Nat
     ): Result.Result<{ data: [Types.TicketSaleInfo]; current_page: Nat; total_pages: Nat }, Text> {

          let ticketsArray = List.toArray(allTickets);
          let indexPages = Utils.paginate<Types.TicketSaleInfo>(ticketsArray, chunkSize);

          if (pageNo >= indexPages.size() or indexPages.size() == 0) {
               return #err("Page not found");
          };

          let pageData = indexPages[pageNo];
          return #ok({
               data = pageData;
               current_page = pageNo + 1;
               total_pages = indexPages.size();
          });
     };





     // Helper function to handle stable memory updates
     private func updateTicketSales(
          categoryId: Text,
          saleInfo: Types.TicketSaleInfo,
          map: TrieMap.TrieMap<Text, Types.Index>,
          state: Types.state
     ) : async Types.Index {
          let currentSalesIndex = map.get(categoryId);
          let updatedSales: List.List<Types.TicketSaleInfo> = switch (currentSalesIndex) {
               case null {
                    List.fromArray([saleInfo])
               };
               case (?index) {
                    let ticketBlob = await stable_get(index, state);
                    let existingData: ?List.List<Types.TicketSaleInfo> = from_candid(ticketBlob);
                    switch (existingData) {
                         case null { List.fromArray([saleInfo]) };
                         case (?data) { List.push<Types.TicketSaleInfo>(saleInfo, data) };
                    }
               };
          };

          // Convert the updated list to candid for storage in stable memory
          let updatedBlob = to_candid(updatedSales);
          let updatedIndex = switch (currentSalesIndex) {
               case null { await stable_add(updatedBlob, state) };
               case (?index) { await update_stable(index, updatedBlob, state) };
          };

          map.put(categoryId, updatedIndex);
          return updatedIndex;
     };

     // Main function to record ticket sale
     public shared ({caller}) func recordTicketSale(
          categoryId: Text,
          saleInfo: Types.TicketSaleInfo,
          saleType: Types.category
     ) : async Result.Result<Text, Text> {
          switch (saleType) {
               case (#Venue) {
                    let index = await updateTicketSales(categoryId, saleInfo, _VenueTicketsMap, Ticket_state);
                    return #ok("Ticket sale recorded for venue");
               };
               case (#Event) {
                    let index = await updateTicketSales(categoryId, saleInfo, _EventTicketsMap, Ticket_state);
                    return #ok("Ticket sale recorded for event");
               };
               case (#Wahana) {
                    let index = await updateTicketSales(categoryId, saleInfo, _WahanaTicketsMap, Ticket_state);
                    return #ok("Ticket sale recorded for wahana");
               };
               case (_) {
                    return #err("Invalid sale type. Use 'venue', 'event', or 'wahana'.");
               };
          };
     };



     /*********************************************************/
     /*                   User CRUD                           */
     /*********************************************************/

    public shared ({ caller }) func updateUser(principalId : Principal, email : Text, firstName : Text, lastName : Text, role : Types.Roles, assignedVenueDetails : Types.assignedVenueDetails) : async Result.Result<(Types.User, Types.Index), Types.UpdateUserError> {
          // if (Principal.isAnonymous(caller)) {
          //      return #err(#UserNotAuthenticated); 
          // }; 
          // let roleResult = await getRoleByPrincipal(caller);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(roleRes)) {
          //           if (not ((await Validation.check_for_sysAdmin(roleRes)) or (await Validation.check_for_Admin(roleRes)))) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          if (email == "") { return #err(#EmptyEmail) };
          if (firstName == "") { return #err(#EmptyFirstName) };
          if (lastName == "") { return #err(#EmptyLastName) };
          //    if (role == "") { return #err(#EmptyRole) };
          if (assignedVenueDetails.id == "") { return #err(#EmptyAssignedVenue) };
          if (assignedVenueDetails.title == "") { return #err(#EmptyAssignedVenue) };

          let user : Types.User = {
               id = principalId;
               email = email;
               firstName = firstName;
               lastName = lastName;
               role = role;
               assignedVenue = assignedVenueDetails;
          };
          switch(Users.get(principalId)){

               case null {
                    let user_blob = to_candid(user);
                    let user_index = await stable_add(user_blob, Users_state);
                    Users.put(principalId, user_index);
                    if(role == #user){
                         users := users + 1;
                    };
                    return #ok(user, user_index);
               };
               case (?v){
                    let user_blob = to_candid(user);
                    let user_index = await update_stable(v, user_blob, Users_state);
                    return #ok(user, user_index);
               };
          };
     };

     public shared ({ caller }) func createUser(principalId : Principal, email : Text, firstName : Text, lastName : Text) : async Result.Result<(Types.User, Types.Index), Types.UpdateUserError> {
          // if (Principal.isAnonymous(caller)) {
          //      return #err(#UserNotAuthenticated); 
          // }; 
          // let roleResult = await getRoleByPrincipal(caller);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(roleRes)) {
          //           if (not ((await Validation.check_for_sysAdmin(roleRes)) or (await Validation.check_for_Admin(roleRes)))) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          if (email == "") { return #err(#EmptyEmail) };
          if (firstName == "") { return #err(#EmptyFirstName) };
          if (lastName == "") { return #err(#EmptyLastName) };

          let user : Types.User = {
               id = principalId;
               email = email;
               firstName = firstName;
               lastName = lastName;
               role = #user;
               assignedVenue = { id = "" ; title = ""};
          };
          switch(Users.get(principalId)){

               case null {
                    let user_blob = to_candid(user);
                    let user_index = await stable_add(user_blob, Users_state);
                    Users.put(principalId, user_index);
                    users := users + 1;
                    return #ok(user, user_index);
               };
               case (?v){
                    let user_blob = to_candid(user);
                    let user_index = await update_stable(v, user_blob, Users_state);
                    return #ok(user, user_index);
               };
          };
     };

    public shared ({ caller }) func updateUserUserDetails(
          email: Text, 
          firstName: Text, 
          lastName: Text
     ) : async Result.Result<(Types.User, Types.Index), Types.UpdateUserError> {
          
          if (email == "") { return #err(#EmptyEmail) };
          if (firstName == "") { return #err(#EmptyFirstName) };
          if (lastName == "") { return #err(#EmptyLastName) };

          switch (Users.get(caller)) {
               case null {
                    return #err(#UserNotFound);
               };
               case (?existingIndex) {
                    let user_blob = await stable_get(existingIndex, Users_state);
                    let existingUserBlob : ?Types.User = from_candid(user_blob);
                    switch (existingUserBlob) {
                         case (?existingUser) {

                              if (caller != existingUser.id) {
                                   throw Error.reject("Caller is not authorized to update");
                                   return #err(#UserNotAuthorized);
                              };
                              let updatedUser: Types.User = {
                                   id = existingUser.id;
                                   email = email;
                                   firstName = firstName;
                                   lastName = lastName;
                                   role = existingUser.role;
                                   assignedVenue = existingUser.assignedVenue;
                              };

                              let user_blob = to_candid(updatedUser);
                              let updatedIndex = await update_stable(existingIndex, user_blob, Users_state);

                              return #ok(updatedUser, updatedIndex);
                         };
                         case null {
                              return #err(#UserNotFound);
                         };
                    };
               };
          };
     };
     


     public shared ({ caller }) func addAdmins(principalId : Principal, email : Text, firstName : Text, lastName : Text, role : Types.Roles, assignedVenue : Types.assignedVenueDetails) : async Result.Result<(Types.User, Types.Index), Types.UpdateUserError> {
          // if (Principal.isAnonymous(caller)) {
          //      return #err(#UserNotAuthenticated); 
          // }; 
          // let roleResult = await getRoleByPrincipal(caller);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not ((await Validation.check_for_sysAdmin(role)) or (await Validation.check_for_Admin(role)))) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          if (not Principal.isController(caller)) {
               return #err(#UserNotAuthorized);
          };
          if (email == "") { return #err(#EmptyEmail) };
          if (firstName == "") { return #err(#EmptyFirstName) };
          if (lastName == "") { return #err(#EmptyLastName) };
          //    if (role == "") { return #err(#EmptyRole) };
          if (assignedVenue.id == "") { return #err(#EmptyAssignedVenue) };
          if (assignedVenue.title == "") { return #err(#EmptyAssignedVenue) };

          let user : Types.User = {
               id = principalId;
               email = email;
               firstName = firstName;
               lastName = lastName;
               role = role;
               assignedVenue = assignedVenue;
          };
          switch(Users.get(principalId)){

               case null {
                    let user_blob = to_candid(user);
                    let user_index = await stable_add(user_blob, Users_state);
                    Users.put(principalId, user_index);
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


    public shared ({caller}) func deleteUserByPrincipal(user : Principal) : async Result.Result<?Types.User, Types.UpdateUserError> {
          // if (Principal.isAnonymous(user)) {
          //      return #err(#UserNotAuthenticated); 
          // }; 
          // let roleResult = await getRoleByPrincipal(caller);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not ((await Validation.check_for_sysAdmin(role)) or (await Validation.check_for_Admin(role)))) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          switch(Users.remove(user)){
               case null {
                    throw(Error.reject("No User found"));
               };
               case (?u){
                    let user = await stable_get(u, Users_state);
                    return #ok(from_candid(user));
               };
          };
    };

    public shared ({caller = user}) func getRoleByCaller() : async Result.Result<Types.Roles, Types.GetUserError> {
          let userObj = await getUserdetailsbyid(user);
          switch(userObj){
               case(#err(error)) {
                    return #err(error);
               };
               case(#ok(u)){
                    return #ok(u.role);
               };
          };
    };

    public shared func getRoleByPrincipal(user : Principal) : async Result.Result<Types.Roles, Types.GetUserError> {
          let userObj = await getUserdetailsbyid(user);
          switch(userObj){
               case(#err(error)) {
                    return #err(error);
               };
               case(#ok(u)){
                    return #ok(u.role);
               };
          };
    };
     /*********************************************************/
     /*                   Wahana Handling                     */
     /*********************************************************/

     public shared ({caller = user}) func createWahana(
          venueId : Text,
          _name : Text , 
          _symbol : Text, 
          _decimals : Nat8 , 
          _totalSupply :Nat , 
          description : Text ,
          featured : Bool,
          banner : Types.LogoResult, 
          price : Float,
     ) : async Result.Result<Types.Wahana_details, Types.UpdateUserError> {
          // if (Principal.isAnonymous(user)) {
          //      return #err(#UserNotAuthenticated); 
          // }; 
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)))
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
         /*  if (price < 10000.0){
               return #err(#TicketPriceError);
          }; */
          let availablecycles : Nat = await availableCycles(); 
          if(availablecycles < 800_510_000_000 ){
               throw Error.reject("Canister doesnt have enough cycles");
               return #err(#CyclesError);
          };
          Cycles.add<system>(800_500_000_000);
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
          
          let new_wahana : Types.Wahana_details = {
               id = _name # "#" # Principal.toText(wahana_id); 
               banner = banner;
               description = description;
               price = price;
               ride_title = _name;
               creator = user;
               venueId = venueId;
               featured = featured
          };
          
          let existingWahanas = _WahanaMap.get(venueId);
          Debug.print(debug_show(List.fromArray([new_wahana])));
          let updatedWahanas: Types.Wahana_data = switch (existingWahanas) {
               case (null) {
                    Debug.print("wahanamap null");
                    let Wahanas : Types.Wahana_data = {
                         Wahanas = List.fromArray([new_wahana]);
                         WahanaIds = List.fromArray([new_wahana.id]);
                    };
                    Debug.print(debug_show(Wahanas));
                    Wahanas
               };
               case (?wahanaIndex) {
                    let wahanasBlob = await stable_get(wahanaIndex, Wahana_state);
                    let existingData: ?Types.Wahana_data = from_candid(wahanasBlob);
                    switch (existingData) {
                         case null {
                              Debug.print("null");
                              
                              let Wahanas : Types.Wahana_data = {
                                   Wahanas = List.fromArray([new_wahana]);
                                   WahanaIds = List.fromArray([new_wahana.id]);
                                   
                              };
                              Wahanas
                         };
                         case (?data) {
                                   Debug.print("existing data");
                              let Wahanas : Types.Wahana_data = {
                                   Wahanas = List.append<Types.Wahana_details>(data.Wahanas, List.fromArray([new_wahana]));
                                   WahanaIds = List.append<Text>(data.WahanaIds, List.fromArray([new_wahana.id]));
                              };
                              Wahanas
                         };
                    }
               };
          };
          Debug.print(debug_show(updatedWahanas));
          let updatedVenue = await updateVenuewithWahanas(venueId,List.toArray(updatedWahanas.WahanaIds));
          let wahana_blob = to_candid(updatedWahanas);
          let wahana_index = switch (existingWahanas) {
               case null { await stable_add(wahana_blob, Wahana_state) };
               case (?index) { await update_stable(index, wahana_blob, Wahana_state) };
          };
          _WahanaMap.put(venueId,wahana_index);
          return #ok(new_wahana);
     };

     public shared ({caller = user}) func getAllWahanasbyVenue(chunkSize : Nat , pageNo : Nat, venueId : Types.venueId) : async Result.Result<{data : [Types.Wahana_details] ; current_page : Nat ; Total_pages : Nat}, Types.UpdateUserError> {
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)) or 
          //                (await Validation.check_for_Manager(role)) or 
          //                (await Validation.check_for_Bod(role)))
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          let wahanas_object = _WahanaMap.get(venueId);
          switch (wahanas_object){
               case null {
                    throw (Error.reject("No Wahana found in the venue"));
               };
               case (?w){
                    let wahanas_object_blob = await stable_get(w,Wahana_state);
                    let wahanas_object : ?Types.Wahana_data = from_candid(wahanas_object_blob);
                    switch (wahanas_object){
                         case null {
                              throw (Error.reject("No object found in the memory"));
                         };
                         case (?list){
                              let wahanas_list = list;
                              let index_pages = Utils.paginate<Types.Wahana_details>(List.toArray(wahanas_list.Wahanas), chunkSize);
                              if (index_pages.size() < pageNo) {
                                   throw Error.reject("Page not found");
                              };
                              if (index_pages.size() == 0) {
                                   throw Error.reject("No data found");
                              };
                              let pages_data = index_pages[pageNo];
                              return #ok{data = pages_data; current_page = pageNo + 1; Total_pages = index_pages.size()};
                         };
                    };
               };
          };
     };

     public shared ({caller}) func getAllWahanas(chunkSize : Nat, pageNo : Nat) : async Result.Result<{data : [Types.Wahana_details]; current_page : Nat; Total_pages : Nat}, Types.CommonErrors> {
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)) or 
          //                (await Validation.check_for_Manager(role)) or 
          //                (await Validation.check_for_Bod(role)))
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          var allWahanas : List.List<Types.Wahana_details> = List.nil();

          for ((_, wahanaIndex) in _WahanaMap.entries()) {
               let wahana_object_blob = await stable_get(wahanaIndex, Wahana_state);
               let wahana_object : ?Types.Wahana_data = from_candid(wahana_object_blob);
               
               switch (wahana_object) {
                    case (null) {
                         return #err(#DataNotFound);
                    };
                    case (?wahanaData) {
                         allWahanas := List.append(wahanaData.Wahanas, allWahanas);
                    };
               };
          };

          let index_pages = Utils.paginate<Types.Wahana_details>(List.toArray(allWahanas), chunkSize);
          if (index_pages.size() < pageNo) {
               throw Error.reject("Page not found");
          };
          if (index_pages.size() == 0) {
               throw Error.reject("No data found");
          };
          let pages_data = index_pages[pageNo];
          return #ok{data = pages_data; current_page = pageNo + 1; Total_pages = index_pages.size()};
     };



     public shared ({caller}) func getWahana(wahanaId : Text, venueId : Text) : async Result.Result<Types.Wahana_details,Types.CommonErrors> {
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or 
          //                (await Validation.check_for_Staff(role)) or 
          //                (await Validation.check_for_Manager(role)) or 
          //                (await Validation.check_for_Bod(role)))
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          let wahanaIndex = _WahanaMap.get(venueId);
          switch(wahanaIndex){
               case null {
                    throw Error.reject("No Wahana found in the venue");
                    return #err(#WahanaNotFound);
               };
               case (?w){
                    let wahanas_object_blob = await stable_get(w,Wahana_state);
                    let wahanas_object : ?Types.Wahana_data = from_candid(wahanas_object_blob);
                    switch(wahanas_object){
                         case null {
                              throw (Error.reject("No object found in the memory"));
                              return #err(#WahanaNotFound);
                         };
                         case (?w){
                              let wahanas_list : List.List<Types.Wahana_details> = w.Wahanas;
                              let wahana = List.find<Types.Wahana_details>(
                                   wahanas_list,
                                   func x {x.id == wahanaId}
                              );
                              switch(wahana){
                                   case null {
                                        throw Error.reject("No Wahana found");
                                        return #err(#WahanaNotFound);
                                   };
                                   case (?_wahana){
                                        return #ok(_wahana);
                                   };
                              };
                         };
                    };
               };
          };
     };

     public shared ({caller}) func getFirstFeaturedWahanaByVenue(chunkSize : Nat, pageNo : Nat) : async Result.Result<{data : [Types.Wahana_details]; current_page : Nat; Total_pages : Nat}, Types.CommonErrors> {
          var featuredWahanas : List.List<Types.Wahana_details> = List.nil();

          for ((venueId, wahanaIndex) in _WahanaMap.entries()) {
               let wahana_object_blob = await stable_get(wahanaIndex, Wahana_state);
               let wahana_object : ?Types.Wahana_data = from_candid(wahana_object_blob);

               switch (wahana_object) {
                    case (null) {
                         // throw (Error.reject("No object found in the memory"));
                         // return #err(#WahanaNotFound);
                    };
                    case (?wahanaData) {
                         let featuredWahana = List.find<Types.Wahana_details>(
                              wahanaData.Wahanas,
                              func wahana { wahana.featured }
                         );
                         switch (featuredWahana) {
                              case (null) {

                              };
                              case (?wahana) {
                                   featuredWahanas := List.append(List.fromArray([wahana]), featuredWahanas);
                              };
                         };
                    };
               };
          };

          let featuredWahanasArray = List.toArray(featuredWahanas);

          if (Array.size(featuredWahanasArray) == 0) {
               return #err(#DataNotFound);
          };

          let index_pages = Utils.paginate<Types.Wahana_details>(featuredWahanasArray, chunkSize);
          if (index_pages.size() < pageNo) {
               throw Error.reject("Page not found");
          };
          if (index_pages.size() == 0) {
               throw Error.reject("Page not found");
          };

          let pages_data = index_pages[pageNo];

          return #ok{
               data = pages_data;
               current_page = pageNo + 1;
               Total_pages = index_pages.size();
          };
     };



     // public shared ({caller = user}) func edit_wahana(
     //      wahanaId: Text,
     //      venueId: Text,
     //      _name: Text,
     //      _symbol: Text,
     //      _decimals: Nat8,
     //      _totalSupply: Nat,
     //      description: Text,
     //      banner: Types.LogoResult,
     //      price: Nat
     // ) : async Result.Result<Text, Types.UpdateUserError> {
     //      // if (Principal.isAnonymous(user)) {
     //      //      return #err(#UserNotAuthenticated); 
     //      // };
     //      // let roleResult = await getRoleByPrincipal(user);
     //      // switch (roleResult) {
     //      //      case (#err(error)) {
     //      //           return #err(#RoleError);
     //      //      };
     //      //      case (#ok(role)) {
     //      //           if (not (
     //      //                (await Validation.check_for_sysAdmin(role)) or 
     //      //                (await Validation.check_for_Admin(role)) or
     //      //                (await Validation.check_for_SuperVisor(role))
     //      //           )) {
     //      //                return #err(#UserNotAuthorized);
     //      //           };
     //      //      };
     //      // };
     //      let wahanas_object = _WahanaMap.get(venueId);
     //      switch (wahanas_object) {
     //           case null {
     //                throw (Error.reject("No Wahanas Found in the Venue"));
     //           };
     //           case (?w) {
     //                let wahanas_object_blob = await stable_get(w, Wahana_state);
     //                let wahanas_object: ?Types.Wahana_data = from_candid(wahanas_object_blob);
     //                switch (wahanas_object) {
     //                     case null {
     //                          throw (Error.reject("No object found in the memory"));
     //                     };
     //                     case (?val) {
     //                          var wahanas_list = val.Wahanas;
     //                          let wahana = List.find<Types.Wahana_details>(
     //                               wahanas_list,
     //                               func x { x.id == wahanaId }
     //                          );
     //                          var wahanaIds_list = val.WahanaIds;
     //                          let exists_wahanaid = List.find<Text>(
     //                               wahanaIds_list,
     //                               func x { x == wahanaId }
     //                          );
     //                          switch (wahana) {
     //                          case null {
     //                               throw (Error.reject("Wahana not found in the list"));
     //                          };
     //                          case (?wahana) {

     //                               Cycles.add<system>(500_000_000_000);
     //                               let initial_mints = [{
     //                                    account = { owner = Principal.fromActor(mahaka); subaccount = null };
     //                                    amount = _totalSupply;
     //                               }];

     //                               let init = {
     //                                    decimals : Nat8 = _decimals;
     //                                    initial_mints : [{
     //                                    account : {
     //                                         owner : Principal;
     //                                         subaccount : ?Blob;
     //                                    };
     //                                    amount : Nat;
     //                                    }] = initial_mints;
     //                                    minting_account : {
     //                                         owner : Principal;
     //                                         subaccount : ?Blob;
     //                                    } = { owner = user; subaccount = null };
     //                                    token_name : Text = _name;
     //                                    token_symbol : Text = _symbol;
     //                                    transfer_fee : Nat = 0;
     //                               };

     //                               let Wahanatokens = await ICRCactor.Ledger(init);
     //                               let wahana_id = Principal.fromActor(Wahanatokens);
     //                               ignore await Wahanatokens.wallet_receive();

     //                               let updated_wahana: Types.Wahana_details = {
     //                                    id = _name # "#" # Principal.toText(wahana_id); 
     //                                    banner = banner;
     //                                    description = description;
     //                                    price = price;
     //                                    ride_title = _name;
     //                                    creator = wahana.creator;
     //                                    venueId = venueId
     //                               };

     //                               let updated_wahanas_list = List.map<Types.Wahana_details, Types.Wahana_details>(
     //                                    wahanas_list,
     //                                    func(existing_wahana) {
     //                                         if (existing_wahana.id == wahanaId) {
     //                                              updated_wahana
     //                                         } else {
     //                                              existing_wahana
     //                                         }
     //                                    }
     //                               );
     //                               let updated_wahanaIds_list = List.map<Text, Text>(
     //                                    wahanaIds_list,
     //                                    func(existing_wahanaId) {
     //                                         if (existing_wahanaId == wahanaId) {
     //                                              updated_wahana.id
     //                                         } else {
     //                                              existing_wahanaId
     //                                         }
     //                                    }
     //                               );
     //                               let updated_wahana_data: Types.Wahana_data = {
     //                                    Wahanas = updated_wahanas_list;
     //                                    WahanaIds = updated_wahanaIds_list;
     //                               };
     //                               let updatedVenue = await updateVenuewithWahanas(venueId,List.toArray(updated_wahana_data.WahanaIds));
     //                               let wahana_blob = to_candid(updated_wahana_data);
     //                               let wahana_index = await update_stable(w,wahana_blob, Wahana_state);
     //                               _WahanaMap.put(venueId, wahana_index);
     //                               return #ok("Wahana updated successfully!");
     //                          };
     //                          };
     //                     };
     //                };
     //           };
     //      };
     // };


     public shared ({caller = user}) func deleteWahana (venue_id: Types.venueId, wahanaId: Text) : async Result.Result<(Bool, Types.Index), Types.UpdateUserError> {
          // if (Principal.isAnonymous(user)) {
          //      return #err(#UserNotAuthenticated); 
          // }; 
          // let roleResult = await getRoleByPrincipal(user);
          // switch (roleResult) {
          //      case (#err(error)) {
          //           return #err(#RoleError);
          //      };
          //      case (#ok(role)) {
          //           if (not (
          //                (await Validation.check_for_sysAdmin(role)) or 
          //                (await Validation.check_for_Admin(role)) or
          //                (await Validation.check_for_Staff(role)))
          //           ) {
          //                return #err(#UserNotAuthorized);
          //           };
          //      };
          // };
          switch(_WahanaMap.get(venue_id)) {
               case null {
                    throw(Error.reject("No venue found for the events"));
               };
               case (?Wahana_index) {
                    let wahana_blob = await stable_get(Wahana_index, Wahana_state);
                    let wahana_object: ?Types.Wahana_data = from_candid(wahana_blob);

                    switch (wahana_object) {
                         case null {
                              throw(Error.reject("No object found for this blob in the memory"));
                         };
                         case (?w) {
                              let maybe_wahana = List.find<Types.Wahana_details>(w.Wahanas, func (x: Types.Wahana_details) : Bool {
                                   x.id == wahanaId
                              });

                              switch(maybe_wahana) {
                                   case null {
                                        throw(Error.reject("Wahana not found"));
                                   };
                                   case (?wahana) {
                                        if (wahana.creator != user) {
                                             throw(Error.reject("You are not the creator of this wahana"));
                                        };
                                   };
                              };
                              let updated_wahanas_list = List.filter<Types.Wahana_details>(
                                   w.Wahanas,
                                   func (x: Types.Wahana_details) : Bool { x.id != wahanaId }
                              );
                              let updated_wahanaIds_list = List.filter<Text>(
                                   w.WahanaIds,
                                   func x { x != wahanaId }
                              );
                              let updated_wahana_data = {
                                   Wahanas = updated_wahanas_list ;
                                   WahanaIds = updated_wahanaIds_list; 
                              };
                              let wahana_blob = to_candid(updated_wahana_data);
                              let wahana_index = await update_stable(Wahana_index, wahana_blob, Wahana_state);
                              let updatedVenue = await updateVenuewithWahanas(venue_id,List.toArray(updated_wahana_data.WahanaIds));
                              _WahanaMap.put(venue_id, wahana_index);
                              let wahanaCanisterId = await Utils.extractCanisterId(wahanaId);
                              await ic.stop_canister({ canister_id = Principal.fromText(wahanaCanisterId) });
                              await ic.delete_canister({ canister_id = Principal.fromText(wahanaCanisterId) });
                              return #ok((true, wahana_index));
                         };
                    };
               };
          };
     };

     // Search wahanas
     public shared func searchWahanas(searchTerm: Text, chunkSize: Nat, pageNo: Nat) : async {data: [Types.Wahana_details]; current_page: Nat; total_pages: Nat} {
          var matchingWahanas = List.nil<Types.Wahana_details>();
          let loweredSearchTerm = Text.toLowercase(searchTerm);
          
          for ((venue_id, wahana_index) in _WahanaMap.entries()) {
               let wahana_blob = await stable_get(wahana_index, Wahana_state);
               let wahanasList: ?Types.Wahana_data = from_candid(wahana_blob);
               
               switch (wahanasList) {
                    case null {
                         throw Error.reject("No Wahanas found");
                    };
                    case (?list) {
                         let filteredWahanas : List.List<Types.Wahana_details> = List.filter<Types.Wahana_details>(list.Wahanas, func (w : Types.Wahana_details) : Bool {
                              Text.contains(Text.toLowercase(w.ride_title), #text loweredSearchTerm) or Text.contains(Text.toLowercase(w.description),#text loweredSearchTerm) 
                         });
                         for (event in List.toArray(filteredWahanas).vals()) {
                              matchingWahanas := List.push(event, matchingWahanas);
                         };
                    };
               };
          };

          let matchingWahanasArray = List.toArray(matchingWahanas);
          let indexPages = Utils.paginate<Types.Wahana_details>(matchingWahanasArray, chunkSize);
          
          if (indexPages.size() < pageNo) {
               throw Error.reject("Page not found");
          };
          if (indexPages.size() == 0) {
               throw Error.reject("No Wahanas found matching the search pattern");
          };
          
          let pageData = indexPages[pageNo];
          return { data = pageData; current_page = pageNo + 1; total_pages = indexPages.size() };
     };

     public type Icrc28TrustedOriginsResponse = {
          trusted_origins : [Text];
     };

     // Equivalent to the Rust function that returns the record type
     public func icrc28_trusted_origins() : async Icrc28TrustedOriginsResponse {
          let trusted_origins = [   
          "http://localhost:3000", 
          "http://localhost:3000/login",
          "http://bd3sg-teaaa-aaaaa-qaaba-cai.localhost:4943", 
          "http://127.0.0.1:4943/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai", 
          "http://127.0.0.1:4943/?canisterId=bkyz2-fmaaa-aaaaa-qaaaq-cai", 
          "https://nfid.one",
          "https://dev.nfid.one",
          "https://3rwjt-vqaaa-aaaak-akusq-cai.icp0.io",
          "https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=xfxqj-piaaa-aaaak-ao53q-cai",
          "https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=3wxph-yiaaa-aaaak-akusa-cai",
          "https://icp0.io/api/v2/canister/xfxqj-piaaa-aaaak-ao53q-cai"];

          return {
               trusted_origins = trusted_origins;
          };
     };

      /*********************************************************/
     /*                   Testimonials                    */
     /*********************************************************/

     public shared ({caller = user}) func createTestimonial(description: Text, title: Text, location: Text): async Result.Result<Types.Testimonial, Text> {
          switch (testimonial.get(user)) {
               case (null) {

                    let newTestimonial: Types.Testimonial = {
                         id = user;
                         description = description;
                         title = title;
                         location = location;
                    };

                    let testimonialBlob = to_candid(newTestimonial);
                    let testimonialIndex = await stable_add(testimonialBlob, Testimonial_state);
                    testimonial.put(user, testimonialIndex);

                    return #ok(newTestimonial);
               };
               case (?_) {
                    return #err("You have already submitted a testimonial.");
               };
          };
     };

     public shared ({caller = user}) func deleteTestimonial(): async Result.Result<Text, Text> {
          let testimonialIndex = testimonial.get(user);

          switch (testimonialIndex) {
               case (null) {
                    return #err("Testimonial not found.");
               };
               case (?index) {
                    testimonial.delete(user);
                    return #ok("Testimonial deleted successfully.");
               };
          };
     };

     public shared ({caller = user}) func updateTestimonial(description: Text, title: Text, location: Text): async Result.Result<Types.Testimonial, Text> {
          let testimonialIndex = testimonial.get(user);

          switch (testimonialIndex) {
               case (null) {
                    return #err("Testimonial not found. Please create one first.");
               };
               case (?index) {
                    let testimonialBlob = await stable_get(index, Testimonial_state);
                    let foundTestimonial: ?Types.Testimonial = from_candid(testimonialBlob);

                    switch (foundTestimonial) {
                         case null {
                              return #err("Unable to retrieve testimonial data.");
                         };
                         case (?existingTestimonial) {
                              let updatedTestimonial: Types.Testimonial = {
                                   id = existingTestimonial.id;
                                   description = description;
                                   title = title;
                                   location = location;
                              };

                              let updatedBlob = to_candid(updatedTestimonial);
                              let updated = await update_stable(index, updatedBlob, Testimonial_state);

                              return #ok(updatedTestimonial);
                         };
                    };
               };
          };
     };

     public shared ({caller}) func getAllTestimonials(): async Result.Result<[Types.Testimonial], Text> {
          var allTestimonials: [Types.Testimonial] = [];

          for ((_, index) in testimonial.entries()) {
               let testimonialBlob = await stable_get(index, Testimonial_state);
               let testimonial: ?Types.Testimonial = from_candid(testimonialBlob);

               switch (testimonial) {
                    case null {
                         // Skip invalid entries.
                    };
                    case (?t) {
                         allTestimonials := Array.append(allTestimonials, [t]);
                    };
               };
          };

          if (allTestimonials.size() == 0) {
               return #err("No testimonials available.");
          };

          return #ok(allTestimonials);
     };

     public shared ({caller}) func getTestimonial(userId: Principal): async Result.Result<Types.Testimonial, Text> {
          let testimonialIndex = testimonial.get(userId);

          switch (testimonialIndex) {
               case (null) {
                    return #err("Testimonial not found.");
               };
               case (?index) {
                    let testimonialBlob = await stable_get(index, Testimonial_state);
                    let foundTestimonial: ?Types.Testimonial = from_candid(testimonialBlob);

                    switch (foundTestimonial) {
                         case (null) {
                              return #err("Unable to retrieve testimonial data.");
                         };
                         case (?testimonial) {
                              return #ok(testimonial);
                         };
                    };
               };
          };
     };

}