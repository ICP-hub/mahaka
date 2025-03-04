import Types "types";
import Config "config";
import Utils "utils";
import Http "http";
import Blob "mo:base/Blob";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Nat8 "mo:base/Nat8";
import Float "mo:base/Float";
import Cycles "mo:base/ExperimentalCycles";
import serdeJson "mo:serde/JSON";
import Result "mo:base/Result";
import Time "mo:base/Time";
import List "mo:base/List";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Base64 "lib/Base64";

module {

    let ic : Types.IC = actor ("aaaaa-aa");


    public module Stripe {

        let devUrl = "http://localhost:5000/";
        let prodUrl = "https://proxserv.netlify.app/.netlify/functions/api";

        public type CreateSession = {
            id: Text;
            url: Text;
        };

        public type RetrieveSession = {
            payment_status: Text;
        };

        public type ErrorResponse = {
            error: {
                code                : Text;
                doc_url             : Text;
                message             : Text;
                param               : Text;
                request_log_url     : Text;
            };
        };

        public func create_session(invoiceNo: Nat, invoice: Types.Request.CreateInvoiceBody, transform_context: Http.IcHttp.TransformContext) : async Result.Result<?CreateSession, ?ErrorResponse> {
            let successUrl = Config.get_stripe_success_url(invoiceNo);
            let cancelUrl = Config.get_stripe_cancel_url(invoiceNo);

            let idempotency_key : Text = generateIdempotencyKey();
            let request_headers = [
                { name = "Content-Type"; value = "application/json" },
                { name = "idempotencyKey"; value = idempotency_key },
            ];
            
            let body = {
                invoiceNo = invoiceNo;
                invoice = invoice;
                successUrl = successUrl;
                cancelUrl = cancelUrl;
            };

            let bodyText = serializeBody(body);

            let http_request : Http.IcHttp.HttpRequest = {
                url = prodUrl # "/create-session";
                headers = request_headers;
                body = ?Text.encodeUtf8(bodyText);
                method = #post;
                transform = ?transform_context;
                max_response_bytes= null;
            };
            Cycles.add(21_800_000_000);
            let http_response : Http.IcHttp.HttpResponse = await ic.http_request(http_request);

            let decoded_text: Text = switch (Text.decodeUtf8(http_response.body)) {
                case (null) { "{}" };
                case (?y) { y };
            };

            let blob = serdeJson.fromText(decoded_text);
            let session : ?CreateSession = from_candid(blob);

            return switch(session) {
                case(null) { let errResponse : ?ErrorResponse = from_candid(blob); return #err(errResponse); };
                case(_session) { return #ok(_session); };
            };
        };

        func generateIdempotencyKey() : Text {
            let timestamp = Time.now(); 
            return "idempotency-" # Int.toText(timestamp);
        };

        func serializeBody(body: {invoiceNo: Nat; invoice: Types.Request.CreateInvoiceBody; successUrl: Text; cancelUrl: Text}) : Text {
            // Manually serialize the body to JSON
            let invoiceText = serializeInvoice(body.invoice); // Serialize invoice separately
            return "{" #
                "\"invoiceNo\":" # Nat.toText(body.invoiceNo) # "," #
                "\"invoice\":" # invoiceText # "," #
                "\"successUrl\":\"" # body.successUrl # "\"," #
                "\"cancelUrl\":\"" # body.cancelUrl # "\""
                # "}";
        };
        // Serialize the invoice
        func serializeInvoice(invoice: Types.Request.CreateInvoiceBody) : Text {
            let itemsText = serializeItems(invoice.items);
            return "{" #
                "\"amount\":" # Float.toText(invoice.amount) # "," #
                "\"currency\":\"" # invoice.currency # "\"," #
                "\"items\":[" # itemsText # "]," #
                "\"paymentMethod\":\"" # invoice.paymentMethod # "\""
                # "}";
        };

        // Serialize the items (list of Item__1)
        func serializeItems(items: [Types.Item]) : Text {
            let itemList = List.fromArray(items);
            
            let itemStrings = List.map<Types.Item, Text>(itemList, func(item) : Text {
                return "{" #
                    "\"name\":\"" # item.name # "\"," #
                    "\"id\": " # Nat.toText(item.id) # "," #
                    "\"price\": " # Float.toText(item.price) # "," #
                    "\"categoryId\":\"" # item.categoryId # "\"," #
                    "\"categoryTitle\":\"" # item.categoryTitle # "\"" #
                    "}";
            });

            return Text.join(",", Iter.fromArray(List.toArray(itemStrings)));
        };


        public func retrieve_session(session_id:Text, transform_context: Http.IcHttp.TransformContext) : async Result.Result<?RetrieveSession, ?ErrorResponse>  {


            // Create the HTTP request object
            let http_request : Http.IcHttp.HttpRequest = {
                url = prodUrl # "/retrieve-session/" # session_id;
                headers = [{ name = "Content-Type"; value = "application/json" }];
                body = null; 
                method = #get;
                transform = ?transform_context;
                max_response_bytes= null;
            };

            // Minimum cycles needed to pass the CI tests. Cycles needed will vary on many things, such as the size of the HTTP response and subnet.
            Cycles.add(21_800_000_000);

            // Send the HTTP request and await the response
            let http_response : Http.IcHttp.HttpResponse = await ic.http_request(http_request);

            // Decode the response body text
            let decoded_text: Text = switch (Text.decodeUtf8(http_response.body)) {
                case (null) { "{\"error\": {\"code\" : \"\", \"message\" : \"No value returned\", \"doc_url\" : \"\", \"param\" : \"\", \"request_log_url\" : \"\"}}" };
                case (?y) { y };
            };

            // Convert the decoded text to Blob
            let blob = serdeJson.fromText(decoded_text);
            // Deserialize the blob to RetrieveSession type
            let session : ?RetrieveSession = from_candid(blob);

            return switch(session){
                case(null) {
                    let errResponse : ?ErrorResponse = from_candid(blob);
                    return #err(errResponse);
                };
                case(_session) {
                    return #ok(_session);
                };
            };
        };
    };

    public module Paypal {
        private let base_url = "https://api-m.sandbox.paypal.com/";
        private let client_id:Text = "AZUPT0s8SzC8SkFaBNRzOnVPIr4cZ6XcgiIaXtWFtTMlp2ePzJlfHvoZp0IaxOvlI9nk8aljvlcaihxR";
        private let client_secret:Text = "EFx8zu_5VtYja8nXx6Xs8BPJOepsALxXHvCIjWlKKOAx8UKIXlXwfWx-8Ai6DaUq4zt9hKsk33keit1x";       

        public type ErrorResponse = {
            error                : Text;
            error_description    : Text;
        };

        public type Oauth2Token = {
            access_token: Text;
        };

        private type CreateOrderApi = {
            id: Text;
            links: [
                {
                    href: Text;
                    rel: Text;
                    method: Text;
                }
            ];
        };

        public type CreateOrder = {
            id: Text;
            url: Text;
        };

        public type RetrieveOrder = {
            status: Text;
        };

        public func create_order(invoiceNo:Nat, invoice : Types.Request.CreateInvoiceBody, transform_context: Http.IcHttp.TransformContext): async Result.Result<?CreateOrder, ?ErrorResponse> {
            
           let sessionResult:Result.Result<?Oauth2Token, ?ErrorResponse> = await generate_access_token(transform_context);
            switch (sessionResult) {
                case (#err err) { 
                      switch(err) {
                        case(null) {
                            return #err(?{
                                error= "";
                                error_description = "";
                            });
                        };
                        case(?_err) {
                            return #err(err);
                        };
                    };
                };
                case (#ok session) { 
                    switch(session) {
                        case(null){
                            return #err(?{
                                error= "";
                                error_description = "";
                            });
                        };
                        case(?_session) {

                            let request_headers = [
                                { name= "Content-Type"; value = "application/json" },
                                { name= "Authorization"; value = "Bearer " # _session.access_token }
                            ];

                            let request_body_str: Text = "{\"intent\":\"CAPTURE\",\"purchase_units\":[{\"amount\":{\"currency_code\":\""# invoice.currency #"\",\"value\":\""# Int.toText(Float.toInt(invoice.amount)) #"\"}}],\"application_context\":{\"return_url\":\""# Config.get_paypal_success_url(invoiceNo) #"\",\"cancel_url\":\""# Config.get_paypal_cancel_url(invoiceNo) #"\"}}";
                            let request_body_as_Blob: Blob = Text.encodeUtf8(request_body_str);

                            let http_request : Http.IcHttp.HttpRequest = {
                                url = base_url # "v2/checkout/orders";
                                headers = request_headers;
                                body = ?request_body_as_Blob; 
                                method = #post;
                                transform = ?transform_context;
                                max_response_bytes= null;
                           };

                            Cycles.add(21_800_000_000);

                            // Send the HTTP request and await the response
                            let http_response : Http.IcHttp.HttpResponse = await ic.http_request(http_request);

                            // Decode the response body text
                            let decoded_text: Text = switch (Text.decodeUtf8(http_response.body)) {
                                case (null) { "{\"error\" : \"\", \"error_description\" : \"No value returned\"}" };
                                case (?y) { y };
                            };

                            let blob = serdeJson.fromText(decoded_text);

                            // Deserialize the blob to CreateSession type
                            let checkout : ?CreateOrderApi = from_candid(blob);

                             return switch(checkout) {
                                case(null) {
                                    let errResponse : ?ErrorResponse = from_candid(blob);
                                    #err(errResponse);
                                };
                                case(?_checkout) {
                                    return #ok(?{
                                        id= _checkout.id;
                                        url= _checkout.links[1].href;
                                    });
                                };
                            };
                        };
                   };
                };
            };
        };   

        private func generate_access_token(transform_context: Http.IcHttp.TransformContext) : async Result.Result<?Oauth2Token, ?ErrorResponse> {
            let text2Nat8:[Nat8] = Utils.text2Nat8Array(client_id # ":" # client_secret);

            let request_headers = [
                {   name = "Content-Type";     value = "application/x-www-form-urlencoded" },
                {   name = "Authorization";    value = "Basic " # Base64.StdEncoding.encode(text2Nat8) }
            ];

            let request_body_str: Text = "grant_type=client_credentials&ignoreCache=true";

            let request_body_as_Blob: Blob = Text.encodeUtf8(request_body_str); 

            

            // Create the HTTP request object
            let http_request : Http.IcHttp.HttpRequest = {
                url = base_url # "v1/oauth2/token";
                headers = request_headers;
                body = ?request_body_as_Blob; 
                method = #post;
                transform = ?transform_context;
                max_response_bytes= null;
            };

            // Minimum cycles needed to pass the CI tests. Cycles needed will vary on many things, such as the size of the HTTP response and subnet.
            Cycles.add(21_800_000_000);

            // Send the HTTP request and await the response
            let http_response : Http.IcHttp.HttpResponse = await ic.http_request(http_request);

            // Decode the response body text
            let decoded_text: Text = switch (Text.decodeUtf8(http_response.body)) {
                case (null) { "{\"error\" : \"\", \"error_description\" : \"No value returned\"}" };
                case (?y) { y };
            };

            let blob = serdeJson.fromText(decoded_text);

            // Deserialize the blob to CreateSession type
            let token : ?Oauth2Token = from_candid(blob);

            return switch(token) {
                case(null) {
                    let errResponse : ?ErrorResponse = from_candid(blob);
                    #err(errResponse);
                };
                case(_token) {
                    // access_token := _token.access_token;
                    // expires_time := Time.now() + (_token.expires_in * 10 ** 9);
                    return #ok(_token);
                };
            };
        };

        public func retrieve_order(order_id:Text, transform_context: Http.IcHttp.TransformContext) : async Result.Result<?RetrieveOrder, ?ErrorResponse>  {

            let sessionResult:Result.Result<?Oauth2Token, ?ErrorResponse> = await generate_access_token(transform_context);
            switch (sessionResult) {
                case (#err err) { 
                      switch(err) {
                        case(null) {
                            return #err(?{
                                error= "";
                                error_description = "";
                            });
                        };
                        case(?_err) {
                            return #err(err);
                        };
                    };
                };
                case (#ok session) { 
                    switch(session) {
                        case(null){
                            return #err(?{
                                error= "";
                                error_description = "";
                            });
                        };
                        case(?_session) {

                            // Set the request headers
                            let request_headers = [
                                { name= "Content-Type"; value = "application/json" },
                                { name= "Authorization"; value = "Bearer " # _session.access_token }
                            ];

                            // Create the HTTP request object
                            let http_request : Http.IcHttp.HttpRequest = {
                                url = base_url # "v2/checkout/orders/" # order_id;
                                headers = request_headers;
                                body = null; 
                                method = #get;
                                transform = ?transform_context;
                                max_response_bytes= null;
                            };

                            // Minimum cycles needed to pass the CI tests. Cycles needed will vary on many things, such as the size of the HTTP response and subnet.
                           Cycles.add(21_800_000_000);

                            // Send the HTTP request and await the response
                            let http_response : Http.IcHttp.HttpResponse = await ic.http_request(http_request);

                            // Decode the response body text
                            let decoded_text: Text = switch (Text.decodeUtf8(http_response.body)) {
                                case (null) { "{\"error\" : \"\", \"error_description\" : \"No value returned\"}" };
                                case (?y) { y };
                            };

                            // Convert the decoded text to Blob
                            let blob = serdeJson.fromText(decoded_text);

                            // Deserialize the blob to RetrieveSession type
                            let order : ?RetrieveOrder = from_candid(blob);

                            return switch(order){
                                case(null) {
                                    let errResponse : ?ErrorResponse = from_candid(blob);
                                    return #err(errResponse);
                                };
                                case(?_order) {

                                    if(Text.equal(_order.status, "APPROVED")) {
                                        let captureResult: Result.Result<?RetrieveOrder, ?ErrorResponse> =  await capture_order(_session.access_token, order_id, transform_context);

                                        return switch (captureResult) {
                                            case (#err err) { 
                                                switch(err) {
                                                    case(null) {
                                                        return #err(?{
                                                            error= "";
                                                            error_description = "";
                                                        });
                                                    };
                                                    case(?_err) {
                                                        return #err(err);
                                                    };
                                                };
                                            };

                                            case (#ok capture) { 
                                                switch(capture) {
                                                    case(null){
                                                        return #err(?{
                                                            error= "";
                                                            error_description = "";
                                                        });
                                                    };
                                                    case(?_capture) {
                                                        return #ok(capture);
                                                    };
                                                };
                                            };

                                        };

                                    } else {
                                        return #ok(order);
                                    };

                                };
                            };

                        };
                   };
                };
            };
        };

        private func capture_order(access_token:Text, order_id:Text, transform_context: Http.IcHttp.TransformContext) : async Result.Result<?RetrieveOrder, ?ErrorResponse>  {

            // Set the request headers
            let request_headers = [
                { name= "Content-Type"; value = "application/json" },
                { name= "Authorization"; value = "Bearer " # access_token }
            ];

            // Create the HTTP request object
            let http_request : Http.IcHttp.HttpRequest = {
                url = base_url # "v2/checkout/orders/" # order_id # "/capture";
                headers = request_headers;
                body = null; 
                method = #post;
                transform = ?transform_context;
                max_response_bytes= null;
            };

            // Minimum cycles needed to pass the CI tests. Cycles needed will vary on many things, such as the size of the HTTP response and subnet.
            Cycles.add(21_800_000_000);

            // Send the HTTP request and await the response
            let http_response : Http.IcHttp.HttpResponse = await ic.http_request(http_request);

            // Decode the response body text
            let decoded_text: Text = switch (Text.decodeUtf8(http_response.body)) {
                case (null) { "{\"error\" : \"\", \"error_description\" : \"No value returned\"}" };
                case (?y) { y };
            };

            // Convert the decoded text to Blob
            let blob = serdeJson.fromText(decoded_text);

            // Deserialize the blob to RetrieveSession type
            let result : ?RetrieveOrder = from_candid(blob);

            return switch(result){
                case(null) {
                    let errResponse : ?ErrorResponse = from_candid(blob);
                    return #err(errResponse);
                };
                case(_result) {
                    return #ok(_result);
                };
            };
        };
    };
}