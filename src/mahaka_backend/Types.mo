import Nat "mo:base/Nat";
import Text "mo:base/Text";
import List "mo:base/List";
import Region "mo:base/Region";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Types "../DIP721-NFT/Types";

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
        price : Nat;
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
        StartDate : Time.Time;
        StartTime : Time.Time;
        EndDate : Time.Time;
        EndTime : Time.Time;
        Location : Text;
    };

    public type Venue = {
        id : Text;
        Title : Text;
        Description : Text;
        logo : LogoResult;
        banner : LogoResult;
        Details : venueDetails;
        Events : List.List<Text>;
        Wahanas : List.List<Text>;
        capacity : Nat;
        Collection_id : Principal;
        creator : Principal;
    };

    public type Events_data = {
        Events : List.List<completeEvent>;
        EventIds : List.List<Text>;
    };

    public type User = {
        id : Principal;
        firstName : Text;
        lastName : Text;
        email : Text;
        role : Roles;
        assignedVenue : Text;
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

    public type TicketSaleInfo = {
        ticketId : Nat;
        category : Text;
        paymentType : PaymentType;
        numOfVisitors : Nat;
        saleDate : Time.Time;
        ticketIssuer : Principal;
        recepient : Principal;
        ticketType : TicketType;
        price : Nat;
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
