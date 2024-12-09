import Text "mo:base/Text";
import Nat "mo:base/Nat";

module {

    private let devConfig = {
        // Define the frontend canister ID used for constructing URLs
        frontendCanisterId = "";
        //baseUrl = "localhost:3000";
        baseUrl = "3rwjt-vqaaa-aaaak-akusq-cai.icp0.io";
        //http = "http://";
        http = "https://";
    };

    // private let liveConfig = {
    //     // Define the frontend canister ID used for constructing URLs
    //     frontendCanisterId= "";
    //     baseUrl= "localhost:3000";
    //     http= "http://";
    // };

    private let config = devConfig;

    // Function to generate the Stripe success URL for a specific invoice
    public func get_stripe_success_url(invoiceNo : Nat) : Text {
        // config.http # config.frontendCanisterId # "." # config.baseUrl # "/stripe/success/" # Nat.toText(invoiceNo)
        config.http # config.baseUrl # "/stripe/success/" # Nat.toText(invoiceNo);
    };

    // Function to generate the Stripe cancel URL for a specific invoice
    public func get_stripe_cancel_url(invoiceNo : Nat) : Text {
        //    config.http # config.frontendCanisterId # "." # config.baseUrl #  "/stripe/cancel/" # Nat.toText(invoiceNo)
        config.http # config.baseUrl # "/stripe/cancel/" # Nat.toText(invoiceNo);
    };

    // Function to generate the Paypal success URL for a specific invoice
    public func get_paypal_success_url(invoiceNo : Nat) : Text {
        config.http # config.frontendCanisterId # "." # config.baseUrl # "/paypal/success/" # Nat.toText(invoiceNo);
    };

    // Function to generate the Paypal cancel URL for a specific invoice
    public func get_paypal_cancel_url(invoiceNo : Nat) : Text {
        config.http # config.frontendCanisterId # "." # config.baseUrl # "/paypal/cancel/" # Nat.toText(invoiceNo);
    };

};
