import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import List "mo:base/List";
import Types "../DIP721-NFT/Types";
module {

    public type venueId = Text;

    public type Ticket = {
        #SinglePass;
        #VipPass;
        #GroupTicket;
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
        Title : Text;
        Description : Text;
        Details : eventDetails;
        SingleTicket : Nat;
        VipTicket : Nat;
        GroupTicket : Nat;
    };

    public type completeEvent = Events and {
        event_collectionid : Principal;
    };

    public type eventCollectionParams = {
        collection_args : Types.Dip721NonFungibleToken;
    };

    public type venueDetails = {
        StartDate : Text;
        StartTime : Time.Time;
        EndDate : Text;
        EndTime : Time.Time;
        Location : Text;
    };

    public type Venue = {
        id : Text;
        Title : Text;
        Description : Text;
        Details : venueDetails;
        Events : List.List<Events>;
        capacity : Nat;
        Collection_id : Principal;

    };

    public type Events_data = {
        Events : List.List<completeEvent>;
    };
}