import Nat "mo:base/Nat";
import Text "mo:base/Text";
import List "mo:base/List";
import Region "mo:base/Region";
import Time "mo:base/Time";
import Types "../DIP721-NFT/Types";

module {

    public type venueId = Text;

    public type Roles = {
        #sysAdmin;
        #admin;
        #manager;
        #user;
        #vendor;
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

    public type ticket_info = {
        ticket_type : Types.ticket_type;
        price : Nat;
    };

    public type venueCollectionParams = {
        custodian : Principal;
        collection_args : Types.Dip721NonFungibleToken;
    };

    public type eventDetails = {
        StartDate : Text;
        StartTime : Time.Time;
        EndDate : Text;
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
    };

    public type completeEvent = Events and {
        event_collectionid : Principal;
    };

    public type eventCollectionParams = {
        collection_args : Types.Dip721NonFungibleToken;
    };

    public type venueDetails = {
        StartDate : Text;
        StartTime : Text;
        EndDate : Text;
        EndTime : Text;
        Location : Text;
    };

    public type Venue = {
        id : Text;
        Title : Text;
        Description : Text;
        logo : LogoResult;
        banner : LogoResult;
        Details : venueDetails;
        Events : List.List<Events>;
        capacity : Nat;
        Collection_id : Principal;
    };

    public type Events_data = {
        Events : List.List<completeEvent>;
    };

    public type User = {
        id : Principal;
        firstName : Text;
        lastName : Text;
        email : Text;
    };

    public type UpdateUserError = {
        #UserNotAuthenticated;
        #UserNotFound;
        #EmptyEmail;
        #EmptyFirstName;
        #EmptyLastName;
    };

    public type GetUserError = {
        #UserNotFound;
    };

    public type CreateUserError = {
        #UserAlreadyExists;
        #EmptyEmail;
        #EmptyFirstName;
        #EmptyLastName;
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
};
