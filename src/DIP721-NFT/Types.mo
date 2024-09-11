import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Blob "mo:base/Blob";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Time "mo:base/Time";

module {
  
  public type Date = Text;
  public type Dip721NonFungibleToken = {
    logo: LogoResult;
    banner: LogoResult;
    description: Text;
    created_at: Time.Time;
    name: Text;
    symbol: Text;
    maxLimit : Nat16;
    collection_type : nft_type;
    sTicket_limit : Nat;
    sTicket_price : Nat;
    vTicket_limit : Nat;
    vTicket_price : Nat;
    gTicket_limit : Nat;
    gTicket_price : Nat;
  };

  public type ticket_count = {
    tickettype : ticket_type;
    count : Nat;
  };

  public type Value = { #Nat : Nat; #Int : Int; #Blob : Blob; #Text : Text };

  public type TokenDetails = Result<Dip721NonFungibleToken, ApiError>;

  public type Dip721Transfererror = {
    #ZeroAddress;
    #Unauthorized;
    #InvalidTokenId;
    #Other;
  };

  public type ApiError = {
    #Unauthorized;
    #InvalidTokenId;
    #ZeroAddress;
    #Other;
  };

  public type Result<S, E> = {
    #Ok : S;
    #Err : E;
  };

  public type OwnerResult = Result<Principal, ApiError>;
  public type TxReceipt = Result<Nat, ApiError>;
  public type TransactionId = Nat;
  public type TokenId = Nat64;
  public type Locktoken = {
    #LockedSuccessfully;
  };

  public type LockTokenError = {
    #ZeroAddress;
    #Unauthorized;
    #InvalidTokenId;
    #AlreadyLocked;
  };

  public type Unlocktoken = {
    #UnlockedSuccessfully;
  };

  public type UnlockTokenError = {
    #ZeroAddress;
    #Unauthorized;
    #InvalidTokenId;
    #AlreadyUnlocked;
  };
  
  
  public type InterfaceId = {
    #Approval;
    #TransactionHistory;
    #Mint;
    #Burn;
    #TransferNotification;
  };

  public type LogoResult = {
    logo_type: Text;
    data: Text;
  };

  public type nft_type = {
    #Venue;
    #Event;
  };

  public type ticket_type = {
    #SinglePass;
    #VipPass;
    #GroupPass;
  };

  public type ticket_details = {
    ticket_type : ticket_type;
    price : Nat;
    number_of_seats : Nat;
  };
  public type Nft = {
    owner: Principal;
    id: TokenId;
    logo : LogoResult;
    metadata: MetadataDesc;
    ticket_type : ticket_type;
    nft_type : nft_type;
  };

  public type CollectionDetials = {
    canister_id : Principal;
    data : Dip721NonFungibleToken;
  };

  public type NftResult = Result<Nft,GetNftError>;

  public type GetNftError = {
    #NoNftFound;
  };

  public type ExtendedMetadataResult = Result<{
    metadata_desc: MetadataDesc;
    token_id: TokenId;
  }, ApiError>;

  public type MetadataResult = Result<MetadataDesc, ApiError>;
  public type MetadataResultArray = Result<[MetadataDesc], ApiError>;

  public type MetadataDesc = [MetadataPart];

  public type MetadataPart = {
    description : Text;
    purpose: MetadataPurpose;
    key_val_data: [MetadataKeyVal];
    data: Blob;
  };

  public type MetadataPurpose = {
    #Preview;
    #Rendered;
  };
  
  public type MetadataKeyVal = {
    key: Text;
    val: MetadataVal;
  };

  public type MetadataVal = {
    #TextContent : Text;
    #BlobContent : Blob;
    #NatContent : Nat;
    #Nat8Content: Nat8;
    #Nat16Content: Nat16;
    #Nat32Content: Nat32;
    #Nat64Content: Nat64;
  };

  public type MintReceipt = Result<MintReceiptPart, ApiError>;

  public type AddCustodianError = {
    #Unauthorized;
    #ZeroAddress;
    #AlreadyCustodian;
  };

  public type AddCustodian = {
    #CustodianAdded;
  };

  public type MintReceiptPart = {
    token_id: TokenId;
    id: Nat;
  };

    public type ContactId = Text;

    public type UserContact = {
        name : Text;
        email : Text;
        message : Text;
        contact_number : Text;
        country : Text;
    };

    public type Contact = UserContact and {
        id : ContactId;
        time_created : Time.Time;
        time_updated : Time.Time;
    };

    public type CreateContactError = {
        #EmptyName;
        #EmptyEmail;
        #EmptyMessage;
    };

    public type GetContactError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #ContactNotFound;
    };

    public type DeleteContactError = {
        #UserNotAdmin;
        #UserNotAuthenticated;
    };

    public type UpdateContactError = {
        #UserNotAuthenticated;
        #UserNotAdmin;
        #EmptyName;
        #EmptyEmail;
        #EmptyMessage;
        #ContactNotFound;
    };
  
};
