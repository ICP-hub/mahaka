import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import List "mo:base/List";
import Types "../DIP721-NFT/Types";
module {

    public type Ticket = {
        #SinglePass;
        #VipPass;
        #GroupTicket;
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
}