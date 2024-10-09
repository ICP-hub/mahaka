import Bool "mo:base/Bool";
import Types "./Types";

module {

    public func check_for_sysAdmin(role : Types.Roles) : async Bool {
        assert (role == #sysAdmin);
        return true;
    };

    public func check_for_Manager(role : Types.Roles) : async Bool {
        assert (role == #manager);
        return true;
    };

    public func check_for_Admin(role : Types.Roles) : async Bool {
        assert (role == #admin);
        return true;
    };

    public func check_for_User(role : Types.Roles) : async Bool {
        assert (role == #user);
        return true;
    };

    public func check_for_Vendor(role : Types.Roles) : async Bool {
        assert (role == #vendor);
        return true;
    };

};
