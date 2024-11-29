import Nat "mo:base/Nat";
import Text "mo:base/Text";
import List "mo:base/List";
import Region "mo:base/Region";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Types "../DIP721-NFT/Types";
import TypesICRC "../ICRC/Types";

module {

    public type venueId = Text;

    public type Roles = {
        #sysAdmin;
        #admin;
        #manager;
        #bod;
        #user;
        // #vendor;
        #staff;
        #supervisor;
    };

    public type MetadataDesc = [Types.MetadataPart];

    public type LogoResult = {
        logo_type : Text;
        data : Text;
    };

    public type nft_type = {
        #Venue;
        #Event;
        #Wahana;
    };

    public type wahanaDetails = {
        StartDate : Time.Time;
        StartTime : Time.Time;
        EndDate : Time.Time;
        EndTime : Time.Time;
        Location : Text;
    };

    public type Wahana_details = {
        id : Text;
        ride_title : Text;
        description : Text;
        details : wahanaDetails;
        banner : LogoResult;
        priceFiat : Float;
        priceICP : Nat;
        creator : Principal;
        venueId : Text;
        featured : Bool;
    };

    public type Wahana_data = {
        Wahanas : List.List<Wahana_details>;
        WahanaIds : List.List<Text>;
    };

    public type ticket_info = {
        ticket_type : Types.ticket_type;
        price : Nat;
        priceFiat : Float;
    };

    public type venueCollectionParams = {
        custodian : Principal;
        collection_args : Types.Dip721NonFungibleToken;
    };

    public type eventDetails = {
        StartDate : Time.Time;
        StartTime : Time.Time;
        EndDate : Time.Time;
        EndTime : Time.Time;
        Location : Text;
    };

    public type Events = {
        id : Text;
        title : Text;
        description : Text;
        logo : LogoResult;
        banner : LogoResult;
        details : eventDetails;
        sTicket_limit : Nat;
        vTicket_limit : Nat;
        gTicket_limit : Nat;
        creator : Principal;
        venueId : Text;
    };

    public type completeEvent = Events and {
        event_collectionid : Principal;
    };

    public type eventCollectionParams = {
        collection_args : Types.Dip721NonFungibleToken;
    };

    public type venueDetails = {
        // StartDate : Time.Time;
        // StartTime : Time.Time;
        // EndDate : Time.Time;
        // EndTime : Time.Time;
        Location : Text;
    };

    public type Venue = {
        id : Text;
        Title : Text;
        Description : Text;
        logo : LogoResult;
        banner : LogoResult;
        Details : venueDetails;
        Events : [Text];
        Wahanas : [Text];
        capacity : Nat;
        Collection_id : Principal;
        creator : Principal;
    };

    public type Events_data = {
        Events : List.List<completeEvent>;
        EventIds : List.List<Text>;
    };

    public type assignedVenueDetails = {
        id : Text;
        title : Text
    };

    public type User = {
        id : Principal;
        firstName : Text;
        lastName : Text;
        email : Text;
        role : Roles;
        assignedVenue : assignedVenueDetails;
    };

    public type Testimonial = {
        id : Principal;
        description : Text;
        title : Text;
        location : Text
    };

    public type AttractionBanner = {
        redirectUrl : Text;
        image : Text;
        title : Text;
        description : Text;
        category: BannerCategory; 

    };

    public type BannerCategory = {
        #Attraction;
        #ThirdParty;
    };

    public type UpdateUserError = {
        #UserNotAuthenticated;
        #UserNotAuthorized;
        #RoleError;
        #UserNotFound;
        #EmptyEmail;
        #EmptyFirstName;
        #EmptyLastName;
        #EmptyAssignedVenue;
    };

    public type GetUserError = {
        #UserNotFound;
    };

    public type CommonErrors = {
        #WahanaNotFound;
        #VenueNotFound;
        #EventNotFound;
        #DataNotFound;
    };

    public type CreateUserError = {
        #UserAlreadyExists;
        #EmptyEmail;
        #EmptyFirstName;
        #EmptyLastName;
    };

    public type PaymentType = {
        #Cash;
        #Card;
        #ICP
    };

    public type TicketType = {
        #Offline;
        #Online
    };

    public type Price = {
        #Nat : Nat;
        #Float : Float;
    };


    public type category = {
        #Venue;
        #Event;
        #Wahana;
    };

    public type TicketSaleInfo = {
        ticketId : Nat;
        categoryId : Text;
        paymentType : PaymentType;
        numOfVisitors : Nat;
        saleDate : Time.Time;
        ticketIssuer : Principal;
        recepient : Principal;
        ticketType : TicketType;
        price : Price;
    };

    public type ArgsStore = {
        collectionActor: actor {
               logoDip721: () -> async Types.LogoResult;
               mintDip721: (to: Principal, metadata: Types.MetadataDesc, ticket_details: Types.ticket_type, logo: Types.LogoResult) -> async Types.MintReceipt;
        };
        metadata : Types.MetadataDesc; 
        ticketType : ticket_info;
        receiver : Principal; 
        numOfVisitors : Nat;
        categoryId : venueId; 
        paymentType : PaymentType;
        ticketPrice: Float;
        offlineOrOnline : TicketType;
        saleDate : Time.Time;
        saleType : Text;
        recepient : Principal; 
        caller : Principal
    };

    public type ArgsStoreWahana ={
        collectionActor: actor {
               icrc1_transfer: ({
                    from_subaccount: ?TypesICRC.Subaccount;
                    to: TypesICRC.Account;
                    amount: TypesICRC.Tokens;
                    fee: ?TypesICRC.Tokens;
                    memo: ?TypesICRC.Memo;
                    created_at_time: ?TypesICRC.Timestamp;
               }) -> async TypesICRC.Result<TypesICRC.TxIndex, TypesICRC.TransferError>
          };
        receiver : Principal; 
        numOfVisitors : Nat;
        wahanaId : Text; 
        paymentType : PaymentType;
        offlineOrOnline : TicketType;
        saleDate : Time.Time;
        price: Float;
        recepient : Principal; 
        caller : Principal
    };


    public type MintError = {
        #MintErr;
        #ReceiversCountError;
        #EventError;
        #WahanaError;
    };

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


    // Ledger Types
    public type BinaryAccountBalanceArgs = { account : Blob };
    public type Tokens = { e8s : Nat64 };
    public type Account = { owner : Principal; subaccount : ?Blob };
    public type TransferFromArgs = {
        to : Account;
        fee : ?Nat;
        spender_subaccount : ?Blob;
        from : Account;
        memo : ?Blob;
        created_at_time : ?Nat64;
        amount : Nat;
    };
    public type TransferFromError = {
        #GenericError : { message : Text; error_code : Nat };
        #TemporarilyUnavailable;
        #InsufficientAllowance : { allowance : Nat };
        #BadBurn : { min_burn_amount : Nat };
        #Duplicate : { duplicate_of : Nat };
        #BadFee : { expected_fee : Nat };
        #CreatedInFuture : { ledger_time : Nat64 };
        #TooOld;
        #InsufficientFunds : { balance : Nat };
    };
    public type Result_3 = { #Ok : Nat; #Err : TransferFromError };
};
