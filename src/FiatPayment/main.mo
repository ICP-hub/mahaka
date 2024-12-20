
import Trie "mo:base/Trie";
import Nat "mo:base/Nat";
import Float "mo:base/Float";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Blob "mo:base/Blob";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import List "mo:base/List";
import Time "mo:base/Time";
import Principal "mo:base/Principal";

import Http "http";
import Types "types";
import Validation "validation";
import Messages "messages";
import Utils "utils";
import Base64 "lib/Base64";
import Service "service";
import Util "mo:xtended-numbers/Util";
import Cycles "mo:base/ExperimentalCycles";


actor Fiat {

    type Invoice = Types.Invoice;

    // Variable to track the invoice number
    private stable var noInvoice : Nat = 1000;

    // Trie to store invoices
    private stable var invoicesTrie : Trie.Trie<Nat, Invoice> = Trie.empty();

    // Trie to store owner's invoices
    private stable var ownerInvoicesTrie : Trie.Trie<Principal, List.List<Nat>> = Trie.empty();

    // Owner's identifier
    private var owner:Text = "vpand-plyes-o5rtf-vm4oo-3b2fe-obah4-e3rd2-g42ip-vuuqd-3jnee-4qe";

    // Owner's identifier
    public func getOwner() : async Text {
        return owner
    };

    // Check if the caller is the owner
    public shared query (msg) func isOwner() : async Bool {
        return (owner == Principal.toText(msg.caller))
    };

    // Return the number of invoices in the trie
    public func invoiceCount() : async Nat {
        Trie.size(invoicesTrie)
    };

    public query func availableCycles() : async Nat {
        return Cycles.balance();
    };

    // This is a private function named '_calculate_total_price' that calculates the total price of a list of items.
    // It takes in the following parameter:
    // - 'items': An array of 'Types.Item' representing the items for which the total price will be calculated.
    // The function returns an asynchronous Float representing the calculated total price.
    private func _calculate_total_price(items: [Types.Item]): async Float {
        // Use 'Array.foldLeft' to iterate through the 'items' array and calculate the sum of item prices.
        // The starting sum is set to 0, and for each item 'x', the price is added to the 'sumSoFar'.
        return Array.foldLeft<Types.Item, Float>(
            items,
            0, // start the sum at 0
            func(sumSoFar, x) = sumSoFar + x.price // this entire function can be replaced with `add`!
        );
    };

    public shared({caller}) func setOwner(newOwner : Text) : async Http.Response<Http.ResponseStatus<Bool, {}>> {

        let newOwnerTemp = Text.trim(newOwner, #char ' ');

        if (Validation.isEmpty(newOwnerTemp)) {
            return Utils.generalResponse(false, Messages.owner_is_required, #err({}), Http.Status.UnprocessableEntity)
        }else  if (not(Validation.isEqual(owner, Principal.toText(caller)))) {
            return Utils.generalResponse(false, Messages.not_owner, #err({}), Http.Status.UnprocessableEntity);
        }else if (Validation.isAnonymousCallerText(newOwnerTemp)) {
            return Utils.generalResponse(false, Messages.invalid_principal, #err({}), Http.Status.UnprocessableEntity);
        };

        owner := newOwnerTemp;

        return Utils.generalResponse(true, 
                    Messages.success_operation,
                    #success(true), 
                    Http.Status.OK);
    };


    public shared ({ caller }) func create_invoice(sender : Principal, invoice : Types.Request.CreateInvoiceBody) : async Http.Response<Http.ResponseStatus<Types.Response.CreateInvoiceBody, {}>> {
        
        let amount = (await _calculate_total_price(invoice.items));
        // Check if the caller is anonymous
        if (Validation.isAnonymous(sender)) {
            return Utils.generalResponse(false, Messages.not_authorized, #err({}), Http.Status.UnprocessableEntity);
        }
        // Check if the payment method is empty
        else if (Validation.isEmpty(invoice.paymentMethod)) {
            return Utils.generalResponse(false, Messages.payment_method_is_required, #err({}), Http.Status.UnprocessableEntity)
        }
        // Check if the payment method is valid
        else if (Validation.checkIfThePaymentMethodIsFound(invoice.paymentMethod)) {
            return Utils.generalResponse(false, Messages.payment_method_invalid_value, #err({}), Http.Status.UnprocessableEntity)
        }
        // Check if the currency is empty
        else if (Validation.isEmpty(invoice.currency)) {
            return Utils.generalResponse(false, Messages.currency_is_required, #err({}), Http.Status.UnprocessableEntity)
        }
        // Check if the currency is valid
        else if (Validation.checkIfTheCurrencyIsFound(invoice.currency)) {
            return Utils.generalResponse(false, Messages.currency_invalid_value, #err({}), Http.Status.UnprocessableEntity)
        }
        // Check if the invoice amount is greater than zero
        else if (not(Validation.isGreaterThanZero(invoice.amount))) {
            return Utils.generalResponse(false, Messages.invoice_amount_must_be_greater_than_zero, #err({}), Http.Status.UnprocessableEntity)
        } 
        // Check if the invoice amount is not equal to invoice amount
        else if (Float.notEqual(amount, invoice.amount)) {
            return Utils.generalResponse(false, Messages.sum_invoice_items_is_incorrect, #err({}), Http.Status.UnprocessableEntity);
        };

        let transform_context : Http.IcHttp.TransformContext = {
            function = transform;
            context = Blob.fromArray([]);
        };

        // Check if the payment method specified in the invoice is "Stripe"
        if (Validation.isEqual(invoice.paymentMethod, "Stripe")) {
            // If it's "Stripe", create a Stripe payment session using the 'Service.Stripe.create_session' function
            let sessionResult: Result.Result<?Service.Stripe.CreateSession, ?Service.Stripe.ErrorResponse> = await Service.Stripe.create_session(noInvoice + 1, invoice,transform_context);
            // Call the '_stripe_invoice' function with the appropriate parameters and wait for the result
            return await _stripe_invoice(sender, invoice, sessionResult);
        } else {
            // If the payment method is not "Stripe", assume it's "PayPal" and create a PayPal payment session
            let sessionResult: Result.Result<?Service.Paypal.CreateOrder, ?Service.Paypal.ErrorResponse> = await Service.Paypal.create_order(noInvoice + 1, invoice,transform_context);
            // Call the '_paypal_invoice' function with the appropriate parameters and wait for the result
            return await _paypal_invoice(sender, invoice, sessionResult);
        };


    };

    // This is a private function named '_stripe_invoice' that handles Stripe invoices.
    // It takes in the following parameters:
    // - 'caller': The principal (identity) of the caller.
    // - 'invoice': The data of the invoice to be created (of type 'Types.Request.CreateInvoiceBody').
    // - 'sessionResult': The result of a previous operation, either an Ok value containing 'Service.Stripe.CreateSession' or an Err value containing 'Service.Stripe.ErrorResponse'.
    // The function returns an asynchronous HTTP response of type 'Http.Response<Http.ResponseStatus<Types.Response.CreateInvoiceBody, {}>>'.
    private func _stripe_invoice(caller: Principal, invoice: Types.Request.CreateInvoiceBody, sessionResult: Result.Result<?Service.Stripe.CreateSession, ?Service.Stripe.ErrorResponse>): async Http.Response<Http.ResponseStatus<Types.Response.CreateInvoiceBody, {}>> {
        // The function uses a 'switch' statement to handle different cases based on 'sessionResult'.
        return switch (sessionResult) {
            case (#err err) {
                // In case of an error ('Err' variant of 'Result'), handle the different sub-cases.
                switch (err) {
                    case (null) {
                        // If the error is 'null', return an internal server error with a specific message using 'Utils.generalResponse'.
                        return Utils.generalResponse(false, Messages.created_invoice_failed, #err({}), Http.Status.InternalServerError);
                    };
                    case (?_err) {
                        // If the error is of type '_err' (when the error type is known but not specified in this code snippet),
                        // return an internal server error with the error message and an empty response body.
                        return Utils.generalResponse(false, _err.error.message, #err({}), Http.Status.InternalServerError);
                    };
                };
            };
            case (#ok session) {
                // In case of success ('Ok' variant of 'Result'), handle the different sub-cases.
                switch (session) {
                    case (null) {
                        // If the session is 'null', return an internal server error with a specific message using 'Utils.generalResponse'.
                        return Utils.generalResponse(false, Messages.created_invoice_failed, #err({}), Http.Status.InternalServerError);
                    };
                    case (?_session) {
                        // If the session is of type '_session' (when the session type is known but not specified in this code snippet),
                        // call the '_create_invoice' function with the provided parameters and return its result.
                        // The '_create_invoice' function seems to be responsible for creating the actual invoice.
                        return await _create_invoice(caller, invoice, _session, "Stripe");
                    };
                };
            };
        };
    };

    // This is a private function named `_paypal_invoice` that handles PayPal invoices.
    // It takes in the following parameters:
    // - 'caller': The principal (identity) of the caller.
    // - 'invoice': The data of the invoice to be created (of type 'Types.Request.CreateInvoiceBody').
    // - 'sessionResult': The result of a previous operation, either an Ok value containing 'Service.Paypal.CreateOrder' or an Err value containing 'Service.Paypal.ErrorResponse'.
    // The function returns an asynchronous HTTP response of type 'Http.Response<Http.ResponseStatus<Types.Response.CreateInvoiceBody, {}>>'.
    private func _paypal_invoice(caller: Principal, invoice: Types.Request.CreateInvoiceBody, sessionResult: Result.Result<?Service.Paypal.CreateOrder, ?Service.Paypal.ErrorResponse>): async Http.Response<Http.ResponseStatus<Types.Response.CreateInvoiceBody, {}>> {
        // The function uses a 'switch' statement to handle different cases based on 'sessionResult'.
        return switch (sessionResult) {
            case (#err err) {
                // In case of an error ('Err' variant of 'Result'), handle the different sub-cases.
                switch (err) {
                    case (null) {
                        // If the error is 'null', return an internal server error with a specific message using 'Utils.generalResponse'.
                        return Utils.generalResponse(false, Messages.created_invoice_failed, #err({}), Http.Status.InternalServerError);
                    };
                    case (?_err) {
                        // If the error is of type '_err' (when the error type is known but not specified in this code snippet),
                        // return an internal server error with the error description and an empty response body.
                        return Utils.generalResponse(false, _err.error_description, #err({}), Http.Status.InternalServerError);
                    };
                };
            };
            case (#ok session) {
                // In case of success ('Ok' variant of 'Result'), handle the different sub-cases.
                switch (session) {
                    case (null) {
                        // If the session is 'null', return an internal server error with a specific message using 'Utils.generalResponse'.
                        return Utils.generalResponse(false, Messages.created_invoice_failed, #err({}), Http.Status.InternalServerError);
                    };
                    case (?_session) {
                        // If the session is of type '_session' (when the session type is known but not specified in this code snippet),
                        // call the '_create_invoice' function with the provided parameters and return its result.
                        // The '_create_invoice' function seems to be responsible for creating the actual invoice.
                        return await _create_invoice(caller, invoice, _session, "PayPal");
                    };
                };
            };
        };
    };

    // This is a private function named '_create_invoice' that creates and stores invoice details.
    // It takes in the following parameters:
    // - 'caller': The principal (identity) of the caller.
    // - 'invoice': The data of the invoice to be created (of type 'Types.Request.CreateInvoiceBody').
    // - '_session': The session data (of type 'Types.CreateSession') related to the payment method.
    // - 'payment': The payment method used for the invoice (e.g., "PayPal" or "Stripe").
    // The function returns an asynchronous HTTP response of type 'Http.Response<Http.ResponseStatus<Types.Response.CreateInvoiceBody, {}>>'.
    private func _create_invoice(caller: Principal, invoice: Types.Request.CreateInvoiceBody, _session: Types.CreateSession, payment: Text): async Http.Response<Http.ResponseStatus<Types.Response.CreateInvoiceBody, {}>> {

        // Increment the invoice number (assuming 'noInvoice' is a global variable)
        noInvoice += 1;

        // Store the invoice details in the trie (assuming 'invoicesTrie' is a global variable)
        invoicesTrie := Trie.put(
            invoicesTrie,
            Utils.keyNat(noInvoice),
            Nat.equal,
            {
                id = noInvoice;
                owner = caller;
                amount = invoice.amount;
                status = Types.InvoiceStatus.Pending;
                items = invoice.items;
                transactionId = _session.id;
                paymentLink = _session.url;
                paymentMethod = payment;
                currency = invoice.currency;
                createdAt = Time.now();
            },
        ).0;

        // Retrieve the list of invoices for the owner from another trie (assuming 'ownerInvoicesTrie' is a global variable)
        var ownerInvoicesList: List.List<Nat> = switch (Trie.get(ownerInvoicesTrie, Utils.keyPrincipal(caller), Principal.equal)) {
            case null { List.nil<Nat>() };
            case (?result) result;
        };

        // Add the new invoice number to the owner's list of invoices
        ownerInvoicesList := List.push(noInvoice, ownerInvoicesList);

        // Update the owner's invoices in the trie (assuming 'ownerInvoicesTrie' is a global variable)
        ownerInvoicesTrie := Trie.replace(
            ownerInvoicesTrie,
            Utils.keyPrincipal(caller),
            Principal.equal,
            ?ownerInvoicesList,
        ).0;

        // Return a success response with relevant data
        return Utils.generalResponse(true, Messages.created_invoice_successfully, #success({ 
            id = noInvoice; 
            payment = {
                transactionId = _session.id;
                redirectUrl   = _session.url;
            } 
        }), Http.Status.OK);
    };


    ///////////////////////// Admin Fucntion /////////////////////////
    private stable var devMahaka : Text = "bd3sg-teaaa-aaaaa-qaaba-cai";
    private stable var liveMahaka : Text = "3wxph-yiaaa-aaaak-akusa-cai";

    public shared({caller}) func get_all_invoices_to_admin() : async Http.Response<Http.ResponseStatus<[Invoice], {}>> {
        if (not(Validation.isEqual(liveMahaka, Principal.toText(caller)) or Validation.isEqual(owner, Principal.toText(caller)))) {
            return Utils.generalResponse(false, Messages.not_owner, #err({}), Http.Status.UnprocessableEntity);
        };

        // Convert the invoice trie into an array of invoices
        let arr = Iter.toArray(
            Iter.map(
                Trie.iter(invoicesTrie),
                func((invoiceNo : Nat, invoice : Invoice)) : Invoice = invoice,
            ),
        );

        return Utils.generalResponse(true, 
            Messages.success_operation,
            #success(arr), 
            Http.Status.OK);
    };

    public shared({caller}) func change_invoice_status_to_admin (invoiceReq: Types.Request.ConfirmInvoiceAdminBody) : async Http.Response<Http.ResponseStatus<Bool, {}>> {

        if (not(Validation.isEqual(owner, Principal.toText(caller)))) {
            return Utils.generalResponse(false, Messages.not_owner, #err({}), Http.Status.UnprocessableEntity);
        }
        // Check if the payment method is empty
        else if (Validation.isEmpty(invoiceReq.paymentMethod)) {
            return Utils.generalResponse(false, Messages.payment_method_is_required, #err({}), Http.Status.UnprocessableEntity);
        }
        // Check if the payment method is valid
        else if (Validation.checkIfThePaymentMethodIsFound(invoiceReq.paymentMethod)) {
            return Utils.generalResponse(false, Messages.payment_method_invalid_value, #err({}), Http.Status.UnprocessableEntity);
        };

        // Retrieve the invoice value using the invoice number
        let invoiceVal = Trie.find(invoicesTrie, Utils.keyNat(invoiceReq.invoiceNo), Nat.equal);

        switch(invoiceVal) {
            case (null) {
                return Utils.generalResponse(false, Messages.invoice_not_found, #err({}), Http.Status.InternalServerError);
            };
            case (?invoiceFind) {
                // Check if the caller is the owner of the invoice
                if(not(Text.equal(Principal.toText(caller), Principal.toText(invoiceFind.owner)))) {
                    return Utils.generalResponse(false, Messages.invoice_not_found, #err({}), Http.Status.UnprocessableEntity);
                }
                // Check if the payment method matches the invoice
                else if(not(Validation.isEqual(invoiceFind.paymentMethod, invoiceReq.paymentMethod))) {
                    return Utils.generalResponse(false, Messages.invoice_not_found, #err({}), Http.Status.UnprocessableEntity);
                }
                // Check if the invoice is in the pending status
                else if(not(Validation.isEqual(invoiceFind.status, Types.InvoiceStatus.Pending))) {
                    return Utils.generalResponse(false, Messages.invoice_not_pending, #err({}), Http.Status.UnprocessableEntity);
                };

                let newInvoice = {
                    id = invoiceFind.id;
                    owner = invoiceFind.owner;
                    amount = invoiceFind.amount;
                    status = switch (invoiceReq.isCompleted) {
                        case (true) Types.InvoiceStatus.Completed;
                        case (false) Types.InvoiceStatus.CancelledByAdmin;
                    };
                    items = invoiceFind.items;
                    transactionId = invoiceFind.transactionId;
                    paymentLink = invoiceFind.paymentLink;
                    paymentMethod = invoiceFind.paymentMethod;
                    currency = invoiceFind.currency;
                    createdAt = invoiceFind.createdAt;
                };

                // Replace the old invoice with the new invoice in the trie using 'Trie.replace'.
                invoicesTrie := Trie.replace(
                    invoicesTrie,
                    Utils.keyNat(invoiceReq.invoiceNo),
                    Nat.equal, 
                    ?newInvoice,
                ).0;

                // Return an HTTP response indicating the success of the status update and providing relevant information.
                return Utils.generalResponse(true, 
                    // Use a 'switch' statement to determine the success message based on the invoice request status.
                    switch (invoiceReq.isCompleted) {
                        case (true) Messages.confirmed_invoice_successfully;
                        case (false) Messages.cancelled_invoice_successfully;
                    },
                    // Provide additional information in the response body.
                    #success(true), 
                    Http.Status.OK);
            };  
        };   
    };

    ///////////////////////// Admin Fucntion /////////////////////////

    public query({caller}) func get_my_invoices() : async [Invoice] {
        // Retrieve the list of invoice numbers belonging to the caller
        var invoiceNumberList : List.List<Nat> = switch (Trie.find(ownerInvoicesTrie, Utils.keyPrincipal(caller),Principal.equal)) {
            case null List.nil<Nat>();
            case (?result) result;
        };

        // Convert the list of invoice numbers into an array of invoices
        List.toArray(List.map<Nat, Invoice>(invoiceNumberList, func (invoiceNo: Nat): Invoice { 
            // Retrieve the invoice value using the invoice number
            let invoiceVal = Trie.find(invoicesTrie, Utils.keyNat(invoiceNo), Nat.equal);
            return switch(invoiceVal) {
                case (?invoice) invoice;
            };
        }));
    };

    public query func get_invoice(invoiceId : Nat) : async Http.Response<Http.ResponseStatus<Invoice, {}>> {

        var invoiceRes : Invoice = switch (Trie.get(invoicesTrie, Utils.keyNat(invoiceId), Nat.equal)) {
            case null {
                return Utils.generalResponse(false, 
                    "Invoice not found.", 
                    #err({}), 
                    Http.Status.NotFound
                );
            };
            case (?result) result;
        };

        return Utils.generalResponse(true, 
            Messages.success_operation,
            #success(invoiceRes), 
            Http.Status.OK);
    };

    public shared({caller}) func change_invoice_status (invoiceReq: Types.Request.ConfirmInvoiceBody) : async Http.Response<Http.ResponseStatus<Types.Response.ConfirmInvoiceBody, {}>> {
        // Check if the caller is anonymous
        if (Validation.isAnonymous(caller)) {
            return Utils.generalResponse(false, Messages.not_authorized, #err({}), Http.Status.UnprocessableEntity);
        }
        // Check if the payment method is empty
        else if (Validation.isEmpty(invoiceReq.paymentMethod)) {
            return Utils.generalResponse(false, Messages.payment_method_is_required, #err({}), Http.Status.UnprocessableEntity);
        }
        // Check if the payment method is valid
        else if (Validation.checkIfThePaymentMethodIsFound(invoiceReq.paymentMethod)) {
            return Utils.generalResponse(false, Messages.payment_method_invalid_value, #err({}), Http.Status.UnprocessableEntity);
        };
        // Retrieve the invoice value using the invoice number
        let invoiceVal = Trie.find(invoicesTrie, Utils.keyNat(invoiceReq.invoiceNo), Nat.equal);

        switch(invoiceVal) {
            case (null) {
                return Utils.generalResponse(false, Messages.invoice_not_found, #err({}), Http.Status.InternalServerError);
            };
            case (?invoiceFind) {
                // Check if the caller is the owner of the invoice
                if(not(Text.equal(Principal.toText(caller), Principal.toText(invoiceFind.owner)))) {
                    return Utils.generalResponse(false, Messages.invoice_not_found, #err({}), Http.Status.UnprocessableEntity);
                }
                // Check if the payment method matches the invoice
                else if(not(Validation.isEqual(invoiceFind.paymentMethod, invoiceReq.paymentMethod))) {
                    return Utils.generalResponse(false, Messages.invoice_not_found, #err({}), Http.Status.UnprocessableEntity);
                }
                // Check if the invoice is in the pending status
                else if(not(Validation.isEqual(invoiceFind.status, Types.InvoiceStatus.Pending))) {
                    return Utils.generalResponse(false, Messages.invoice_not_pending, #err({}), Http.Status.UnprocessableEntity);
                };

                let transform_context : Http.IcHttp.TransformContext = {
                    function = transform;
                    context = Blob.fromArray([]);
                };
                
                // Check if the payment method specified in 'invoiceFind' is "Stripe".
                if (Validation.isEqual(invoiceFind.paymentMethod, "Stripe")) {
                    // If the payment method is "Stripe", retrieve the session information using 'Service.Stripe.retrieve_session' function.
                    let invoiceResult: Result.Result<?Service.Stripe.RetrieveSession, ?Service.Stripe.ErrorResponse> = await Service.Stripe.retrieve_session(invoiceFind.transactionId,transform_context);
                    // Call the '_change_invoice_status_stripe' function with the retrieved information and wait for the result.
                    return await _change_invoice_status_stripe(invoiceFind, invoiceReq, invoiceResult);
                } else {
                    // If the payment method is not "Stripe", assume it's "PayPal" and retrieve the order information using 'Service.Paypal.retrieve_order' function.
                    let invoiceResult: Result.Result<?Service.Paypal.RetrieveOrder, ?Service.Paypal.ErrorResponse> = await Service.Paypal.retrieve_order(invoiceFind.transactionId,transform_context);
                    // Call the '_change_invoice_status_paypal' function with the retrieved information and wait for the result.
                    return await _change_invoice_status_paypal(invoiceFind, invoiceReq, invoiceResult);
                };

                
            };  
        };   
    };

    // This is a private function named '_change_invoice_status_stripe' that handles invoice status change when the payment method is "Stripe".
    // It takes in the following parameters:
    // - 'invoiceFind': The current invoice details (of type 'Invoice').
    // - 'invoiceReq': The request to confirm the invoice (of type 'Types.Request.ConfirmInvoiceBody').
    // - 'invoiceResult': The result of retrieving the session from Stripe (of type 'Result.Result<?Service.Stripe.RetrieveSession, ?Service.Stripe.ErrorResponse>').
    // The function returns an asynchronous HTTP response of type 'Http.Response<Http.ResponseStatus<Types.Response.ConfirmInvoiceBody, {}>>'.
    private func _change_invoice_status_stripe(invoiceFind: Invoice, invoiceReq: Types.Request.ConfirmInvoiceBody, invoiceResult: Result.Result<?Service.Stripe.RetrieveSession, ?Service.Stripe.ErrorResponse>): async Http.Response<Http.ResponseStatus<Types.Response.ConfirmInvoiceBody, {}>> {
        // The function uses a 'switch' statement to handle different cases based on 'invoiceResult'.
        switch (invoiceResult) {
            case (#err err) {
                // In case of an error ('Err' variant of 'Result'), handle the different sub-cases.
                switch (err) {
                    case (null) {
                        // If the error is 'null', return an internal server error with a specific message using 'Utils.generalResponse'.
                        return Utils.generalResponse(false, Messages.confirmed_invoice_failed, #err({}), Http.Status.InternalServerError);
                    };
                    case (?_err) {
                        // If the error is of type '_err' (when the error type is known but not specified in this code snippet),
                        // return an internal server error with the error message and an empty response body.
                        return Utils.generalResponse(false, _err.error.message, #err({}), Http.Status.InternalServerError);
                    };
                };
            };
            case (#ok invoiceRes) {
                // In case of success ('Ok' variant of 'Result'), handle the different sub-cases.
                switch (invoiceRes) {
                    case (null) {
                        // If the 'invoiceRes' is 'null', return an internal server error with a specific message using 'Utils.generalResponse'.
                        return Utils.generalResponse(false, Messages.confirmed_invoice_failed, #err({}), Http.Status.InternalServerError);
                    };
                    case (?_invoiceRes) {
                        // If 'invoiceRes' is of type '_invoiceRes' (when the session data type is known but not specified in this code snippet),
                        // check the invoice request status and the payment status from the retrieved session.

                        // If the invoice request is successful and the payment status is "unpaid",
                        // return an error response indicating that the payment is still unpaid using 'Utils.generalResponse'.
                        if (invoiceReq.isSuccess and Text.equal(_invoiceRes.payment_status, "unpaid")) {
                            return Utils.generalResponse(false, Messages.unpaid_error_message, #err({}), Http.Status.UnprocessableEntity);
                        } 
                        // If the invoice request is not successful and the payment status is "paid",
                        // return an error response indicating that the payment failed using 'Utils.generalResponse'.
                        else if (not(invoiceReq.isSuccess) and Text.equal(_invoiceRes.payment_status, "paid")) {
                            return Utils.generalResponse(false, Messages.payment_failed_error_message, #err({}), Http.Status.UnprocessableEntity);
                        };

                        // If none of the above conditions are met, proceed to update the invoice status by calling '_update_invoice_status' function.
                        return await _update_invoice_status(invoiceFind, invoiceReq);
                    };
                };
            };
        };
    };

    // This is a private function named '_change_invoice_status_paypal' that handles invoice status change when the payment method is "PayPal".
    // It takes in the following parameters:
    // - 'invoiceFind': The current invoice details (of type 'Invoice').
    // - 'invoiceReq': The request to confirm the invoice (of type 'Types.Request.ConfirmInvoiceBody').
    // - 'invoiceResult': The result of retrieving the order from PayPal (of type 'Result.Result<?Service.Paypal.RetrieveOrder, ?Service.Paypal.ErrorResponse>').
    // The function returns an asynchronous HTTP response of type 'Http.Response<Http.ResponseStatus<Types.Response.ConfirmInvoiceBody, {}>>'.
    private func _change_invoice_status_paypal(invoiceFind: Invoice, invoiceReq: Types.Request.ConfirmInvoiceBody, invoiceResult: Result.Result<?Service.Paypal.RetrieveOrder, ?Service.Paypal.ErrorResponse>): async Http.Response<Http.ResponseStatus<Types.Response.ConfirmInvoiceBody, {}>> {
        // The function uses a 'switch' statement to handle different cases based on 'invoiceResult'.
        switch (invoiceResult) {
            case (#err err) {
                // In case of an error ('Err' variant of 'Result'), handle the different sub-cases.
                switch (err) {
                    case (null) {
                        // If the error is 'null', return an internal server error with a specific message using 'Utils.generalResponse'.
                        return Utils.generalResponse(false, Messages.confirmed_invoice_failed, #err({}), Http.Status.InternalServerError);
                    };
                    case (?_err) {
                        // If the error is of type '_err' (when the error type is known but not specified in this code snippet),
                        // return an internal server error with the error description and an empty response body.
                        return Utils.generalResponse(false, _err.error_description, #err({}), Http.Status.InternalServerError);
                    };
                };
            };
            case (#ok invoiceRes) {
                // In case of success ('Ok' variant of 'Result'), handle the different sub-cases.
                switch (invoiceRes) {
                    case (null) {
                        // If the 'invoiceRes' is 'null', return an internal server error with a specific message using 'Utils.generalResponse'.
                        return Utils.generalResponse(false, Messages.confirmed_invoice_failed, #err({}), Http.Status.InternalServerError);
                    };
                    case (?_invoiceRes) {
                        // If 'invoiceRes' is of type '_invoiceRes' (when the order data type is known but not specified in this code snippet),
                        // check the invoice request status and the order status from the retrieved order.

                        // If the invoice request is successful and the payment status is "unpaid",
                        // return an error response indicating that the payment is still unpaid using 'Utils.generalResponse'.
                        if (invoiceReq.isSuccess and Text.equal(_invoiceRes.status, "CREATED")) {
                            return Utils.generalResponse(false, Messages.unpaid_error_message, #err({}), Http.Status.UnprocessableEntity);
                        } 
                        // If the invoice request is not successful and the payment status is "paid",
                        // return an error response indicating that the payment failed using 'Utils.generalResponse'.
                        else if (not(invoiceReq.isSuccess) and Text.equal(_invoiceRes.status, "COMPLETED")) {
                            return Utils.generalResponse(false, Messages.payment_failed_error_message, #err({}), Http.Status.UnprocessableEntity);
                        };

                        // If none of the above conditions are met, proceed to update the invoice status by calling '_update_invoice_status' function.
                        return await _update_invoice_status(invoiceFind, invoiceReq);
                    };
                };
            };
        };
    };

    // This is a private function named '_update_invoice_status' that updates the status of an invoice based on the provided invoice request.
    // It takes in the following parameters:
    // - 'invoiceFind': The current invoice details (of type 'Invoice').
    // - 'invoiceReq': The request to confirm the invoice (of type 'Types.Request.ConfirmInvoiceBody').
    // The function returns an asynchronous HTTP response of type 'Http.Response<Http.ResponseStatus<Types.Response.ConfirmInvoiceBody, {}>>'.
    private func _update_invoice_status(invoiceFind: Invoice, invoiceReq: Types.Request.ConfirmInvoiceBody): async Http.Response<Http.ResponseStatus<Types.Response.ConfirmInvoiceBody, {}>> {
        // Create a new invoice with the updated status based on the invoice request status.
        let newInvoice = {
            id = invoiceFind.id;
            owner = invoiceFind.owner;
            amount = invoiceFind.amount;
            status = switch (invoiceReq.isSuccess) {
                case (true) Types.InvoiceStatus.Completed;
                case (false) Types.InvoiceStatus.Cancelled;
            };
            items = invoiceFind.items;
            transactionId = invoiceFind.transactionId;
            paymentLink = invoiceFind.paymentLink;
            paymentMethod = invoiceFind.paymentMethod;
            currency = invoiceFind.currency;
            createdAt = invoiceFind.createdAt;
        };

        // Replace the old invoice with the new invoice in the trie using 'Trie.replace'.
        invoicesTrie := Trie.replace(
            invoicesTrie,
            Utils.keyNat(invoiceReq.invoiceNo),
            Nat.equal, 
            ?newInvoice,
        ).0;

        // Return an HTTP response indicating the success of the status update and providing relevant information.
        return Utils.generalResponse(true, 
            // Use a 'switch' statement to determine the success message based on the invoice request status.
            switch (invoiceReq.isSuccess) {
                case (true) Messages.confirmed_invoice_successfully;
                case (false) Messages.cancelled_invoice_successfully;
            },
            // Provide additional information in the response body.
            #success({ 
                invoiceNo = invoiceReq.invoiceNo; 
                transactionId = invoiceFind.transactionId; 
                paymentMethod = invoiceFind.paymentMethod; 
                status = newInvoice.status; 
            }), 
            Http.Status.OK);
    };


    public query func get_actor_id_as_text() : async Text {
        // Convert the actor ID to text
        Principal.toText(Principal.fromActor(Fiat));
    };

    //function to transform the response
    public query func transform(raw : Http.IcHttp.TransformArgs) : async Http.IcHttp.CanisterHttpResponsePayload {
        let transformed : Http.IcHttp.CanisterHttpResponsePayload = {
            status = raw.response.status;
            body = raw.response.body;
            headers = [
                {
                    name = "Content-Security-Policy";
                    value = "default-src 'self'";
                },
                { 
                    name = "Referrer-Policy"; 
                    value = "strict-origin" 
                },
                { 
                    name = "Permissions-Policy"; 
                    value = "geolocation=(self)" },
                {
                    name = "Strict-Transport-Security";
                    value = "max-age=63072000";
                },
                { 
                    name = "X-Frame-Options"; 
                    value = "DENY" 
                },
                { 
                    name = "X-Content-Type-Options"; 
                    value = "nosniff" 
                },
            ];
        };
        transformed;
    };
    
}
