import Bool "mo:base/Bool";
import Types "./Types";

module {

    public func check_for_sysAdmin(role : Types.Roles) : async Bool {
        if(role == #sysAdmin){
            return true;
        };
        return false;
    };

    public func check_for_Manager(role : Types.Roles) : async Bool {
        if(role == #manager){
            return true;
        };
        return false;
    };

    public func check_for_Admin(role : Types.Roles) : async Bool {
        if(role == #admin){
            return true;
        };
        return false;
    };

    public func check_for_User(role : Types.Roles) : async Bool {
        if(role == #user){
            return true;
        };
        return false;
    };

    public func check_for_Bod(role : Types.Roles) : async Bool {
        if(role == #bod){
            return true;
        };
        return false;
    };

    // public func check_for_vendor(role : Types.Roles) : async Bool {
    //     assert (role == #vendor);
    //     return true;
    // };

    public func check_for_Staff(role : Types.Roles) : async Bool {
        if(role == #staff){
            return true;
        };
        return false;
    };
    public func check_for_SuperVisor(role : Types.Roles) : async Bool {
        if(role == #supervisor){
            return true;
        };
        return false;
    };
    // 

};
