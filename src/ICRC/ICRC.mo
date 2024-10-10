import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Nat8 "mo:base/Nat8";
import Nat64 "mo:base/Nat64";
import ExperimentalCycles "mo:base/ExperimentalCycles";
import Types "./Types";

actor class Ledger(init : { initial_mints : [{ account : { owner : Principal; subaccount : ?Blob }; amount : Nat }]; minting_account : { owner : Principal; subaccount : ?Blob }; token_name : Text; token_symbol : Text; decimals : Nat8; transfer_fee : Nat }) = this {

  let maxMemoSize = 32;
  let permittedDriftNanos : Types.Duration = 60_000_000_000;
  let transactionWindowNanos : Types.Duration = 24 * 60 * 60 * 1_000_000_000;
  let defaultSubaccount : Types.Subaccount = Blob.fromArrayMut(Array.init(32, 0 : Nat8));

  private stable var capacity = 1000000000000000000;
  private stable var balance_cycle = ExperimentalCycles.balance();

  // Checks whether two accounts are semantically equal.
  func accountsEqual(lhs : Types.Account, rhs : Types.Account) : Bool {
    let lhsSubaccount = Option.get(lhs.subaccount, defaultSubaccount);
    let rhsSubaccount = Option.get(rhs.subaccount, defaultSubaccount);

    Principal.equal(lhs.owner, rhs.owner) and Blob.equal(
      lhsSubaccount,
      rhsSubaccount,
    );
  };

  // Computes the balance of the specified account.
  func balance(account : Types.Account, log : Types.TxLog) : Nat {
    var sum = 0;
    for (tx in log.vals()) {
      switch (tx.operation) {
        case (#Burn(args)) {
          if (accountsEqual(args.from, account)) { sum -= args.amount };
        };
        case (#Mint(args)) {
          if (accountsEqual(args.to, account)) { sum += args.amount };
        };
        case (#Transfer(args)) {
          if (accountsEqual(args.from, account)) {
            sum -= args.amount + tx.fee;
          };
          if (accountsEqual(args.to, account)) { sum += args.amount };
        };
        case (#Approve(args)) {
          if (accountsEqual(args.from, account)) { sum -= tx.fee };
        };
      };
    };
    sum;
  };

  // Computes the total token supply.
  func totalSupply(log : Types.TxLog) : Types.Tokens {
    var total = 0;
    for (tx in log.vals()) {
      switch (tx.operation) {
        case (#Burn(args)) { total -= args.amount };
        case (#Mint(args)) { total += args.amount };
        case (#Transfer(_)) { total -= tx.fee };
        case (#Approve(_)) { total -= tx.fee };
      };
    };
    total;
  };

  // Finds a transaction in the transaction log.
  func findTransfer(transfer : Types.Transfer, log : Types.TxLog) : ?Types.TxIndex {
    var i = 0;
    for (tx in log.vals()) {
      switch (tx.operation) {
        case (#Burn(args)) { if (args == transfer) { return ?i } };
        case (#Mint(args)) { if (args == transfer) { return ?i } };
        case (#Transfer(args)) { if (args == transfer) { return ?i } };
        case (_) {};
      };
      i += 1;
    };
    null;
  };

  // Finds an approval in the transaction log.
  func findApproval(approval : Types.Approve, log : Types.TxLog) : ?Types.TxIndex {
    var i = 0;
    for (tx in log.vals()) {
      switch (tx.operation) {
        case (#Approve(args)) { if (args == approval) { return ?i } };
        case (_) {};
      };
      i += 1;
    };
    null;
  };

  // Computes allowance of the spender for the specified account.
  func allowance(account : Types.Account, spender : Types.Account, now : Nat64) : Types.Allowance {
    var i = 0;
    var allowance : Nat = 0;
    var lastApprovalTs : ?Nat64 = null;

    for (tx in log.vals()) {
      // Reset expired approvals, if any.
      switch (lastApprovalTs) {
        case (?expires_at) {
          if (expires_at < tx.timestamp) {
            allowance := 0;
            lastApprovalTs := null;
          };
        };
        case (null) {};
      };
      // Add pending approvals.
      switch (tx.operation) {
        case (#Approve(args)) {
          if (args.from == account and args.spender == spender) {
            allowance := args.amount;
            lastApprovalTs := args.expires_at;
          };
        };
        case (#Transfer(args)) {
          if (args.from == account and args.spender == spender) {
            assert (allowance > args.amount + tx.fee);
            allowance -= args.amount + tx.fee;
          };
        };
        case (_) {};
      };
    };

    switch (lastApprovalTs) {
      case (?expires_at) {
        if (expires_at < now) { { allowance = 0; expires_at = null } } else {
          {
            allowance = Int.abs(allowance);
            expires_at = ?expires_at;
          };
        };
      };
      case (null) { { allowance = allowance; expires_at = null } };
    };
  };

  // Checks if the principal is anonymous.
  func isAnonymous(p : Principal) : Bool {
    Blob.equal(Principal.toBlob(p), Blob.fromArray([0x04]));
  };

  // Constructs the transaction log corresponding to the init argument.
  func makeGenesisChain() : Types.TxLog {
    validateSubaccount(init.minting_account.subaccount);

    let now = Nat64.fromNat(Int.abs(Time.now()));
    let log = Buffer.Buffer<Types.Transaction>(100);
    for ({ account; amount } in Array.vals(init.initial_mints)) {
      validateSubaccount(account.subaccount);
      let tx : Types.Transaction = {
        operation = #Mint({
          spender = init.minting_account;
          source = #Init;
          from = init.minting_account;
          to = account;
          amount = amount;
          fee = null;
          memo = null;
          created_at_time = ?now;
        });
        fee = 0;
        timestamp = now;
      };
      log.add(tx);
    };
    log;
  };

  // Traps if the specified blob is not a valid subaccount.
  func validateSubaccount(s : ?Types.Subaccount) {
    let subaccount = Option.get(s, defaultSubaccount);
    assert (subaccount.size() == 32);
  };

  func validateMemo(m : ?Types.Memo) {
    switch (m) {
      case (null) {};
      case (?memo) { assert (memo.size() <= maxMemoSize) };
    };
  };

  func checkTxTime(created_at_time : ?Types.Timestamp, now : Types.Timestamp) : Types.Result<(), Types.DeduplicationError> {
    let txTime : Types.Timestamp = Option.get(created_at_time, now);

    if ((txTime > now) and (txTime - now > permittedDriftNanos)) {
      return #Err(#CreatedInFuture { ledger_time = now });
    };

    if ((txTime < now) and (now - txTime > transactionWindowNanos + permittedDriftNanos)) {
      return #Err(#TooOld);
    };

    #Ok(());
  };

  // The list of all transactions.
  var log : Types.TxLog = makeGenesisChain();

  // The stable representation of the transaction log.
  // Used only during upgrades.
  stable var persistedLog : [Types.Transaction] = [];

  system func preupgrade() {
    persistedLog := log.toArray();
  };

  system func postupgrade() {
    log := Buffer.Buffer(persistedLog.size());
    for (tx in Array.vals(persistedLog)) {
      log.add(tx);
    };
  };

  func recordTransaction(tx : Types.Transaction) : Types.TxIndex {
    let idx = log.size();
    log.add(tx);
    idx;
  };

  func classifyTransfer(log : Types.TxLog, transfer : Types.Transfer) : Types.Result<(Types.Operation, Types.Tokens), Types.TransferError> {
    let minter = init.minting_account;

    if (Option.isSome(transfer.created_at_time)) {
      switch (findTransfer(transfer, log)) {
        case (?txid) { return #Err(#Duplicate { duplicate_of = txid }) };
        case null {};
      };
    };

    let result = if (accountsEqual(transfer.from, minter)) {
      if (Option.get(transfer.fee, 0) != 0) {
        return #Err(#BadFee { expected_fee = 0 });
      };
      (#Mint(transfer), 0);
    } else if (accountsEqual(transfer.to, minter)) {
      if (Option.get(transfer.fee, 0) != 0) {
        return #Err(#BadFee { expected_fee = 0 });
      };

      if (transfer.amount < init.transfer_fee) {
        return #Err(#BadBurn { min_burn_amount = init.transfer_fee });
      };

      let debitBalance = balance(transfer.from, log);
      if (debitBalance < transfer.amount) {
        return #Err(#InsufficientFunds { balance = debitBalance });
      };

      (#Burn(transfer), 0);
    } else {
      let effectiveFee = init.transfer_fee;
      if (Option.get(transfer.fee, effectiveFee) != effectiveFee) {
        return #Err(#BadFee { expected_fee = init.transfer_fee });
      };

      let debitBalance = balance(transfer.from, log);
      if (debitBalance < transfer.amount + effectiveFee) {
        return #Err(#InsufficientFunds { balance = debitBalance });
      };

      (#Transfer(transfer), effectiveFee);
    };
    #Ok(result);
  };

  func applyTransfer(args : Types.Transfer) : Types.Result<Types.TxIndex, Types.TransferError> {
    validateSubaccount(args.from.subaccount);
    validateSubaccount(args.to.subaccount);
    validateMemo(args.memo);

    let now = Nat64.fromNat(Int.abs(Time.now()));

    switch (checkTxTime(args.created_at_time, now)) {
      case (#Ok(_)) {};
      case (#Err(e)) { return #Err(e) };
    };

    switch (classifyTransfer(log, args)) {
      case (#Ok((operation, effectiveFee))) {
        #Ok(recordTransaction({ operation = operation; fee = effectiveFee; timestamp = now }));
      };
      case (#Err(e)) { #Err(e) };
    };
  };

  func overflowOk(x : Nat) : Nat {
    x;
  };

  public shared ({ caller }) func icrc1_transfer({
    from_subaccount : ?Types.Subaccount;
    to : Types.Account;
    amount : Types.Tokens;
    fee : ?Types.Tokens;
    memo : ?Types.Memo;
    created_at_time : ?Types.Timestamp;
  }) : async Types.Result<Types.TxIndex, Types.TransferError> {
    let from = {
      owner = caller;
      subaccount = from_subaccount;
    };
    applyTransfer({
      spender = from;
      source = #Icrc1Transfer;
      from = from;
      to = to;
      amount = amount;
      fee = fee;
      memo = memo;
      created_at_time = created_at_time;
    });
  };

  public query func icrc1_balance_of(account : Types.Account) : async Types.Tokens {
    balance(account, log);
  };

  public func icrc1_total_supply() : async Types.Tokens {
    totalSupply(log);
  };

  public query func icrc1_minting_account() : async ?Types.Account {
    ?init.minting_account;
  };

  public query func icrc1_name() : async Text {
    init.token_name;
  };

  public query func icrc1_symbol() : async Text {
    init.token_symbol;
  };

  public query func icrc1_decimals() : async Nat8 {
    init.decimals;
  };

  public query func icrc1_fee() : async Nat {
    init.transfer_fee;
  };

  public query func icrc1_metadata() : async [(Text, Types.Value)] {
    [
      ("icrc1:name", #Text(init.token_name)),
      ("icrc1:symbol", #Text(init.token_symbol)),
      ("icrc1:decimals", #Nat(Nat8.toNat(init.decimals))),
      ("icrc1:fee", #Nat(init.transfer_fee)),
    ];
  };

  public query func icrc1_supported_standards() : async [{
    name : Text;
    url : Text;
  }] {
    [
      {
        name = "ICRC-1";
        url = "https://github.com/dfinity/ICRC-1/tree/main/standards/ICRC-1";
      },
      {
        name = "ICRC-2";
        url = "https://github.com/dfinity/ICRC-1/tree/main/standards/ICRC-2";
      },
    ];
  };

  public shared ({ caller }) func icrc2_approve({
    from_subaccount : ?Types.Subaccount;
    spender : Types.Account;
    amount : Nat;
    expires_at : ?Nat64;
    expected_allowance : ?Nat;
    memo : ?Types.Memo;
    fee : ?Types.Tokens;
    created_at_time : ?Types.Timestamp;
  }) : async Types.Result<Types.TxIndex, Types.ApproveError> {
    validateSubaccount(from_subaccount);
    validateMemo(memo);

    let now = Nat64.fromNat(Int.abs(Time.now()));

    switch (checkTxTime(created_at_time, now)) {
      case (#Ok(_)) {};
      case (#Err(e)) { return #Err(e) };
    };

    let approverAccount = { owner = caller; subaccount = from_subaccount };
    let approval = {
      from = approverAccount;
      spender = spender;
      amount = amount;
      expires_at = expires_at;
      fee = fee;
      created_at_time = created_at_time;
      memo = memo;
    };

    if (Option.isSome(created_at_time)) {
      switch (findApproval(approval, log)) {
        case (?txid) { return #Err(#Duplicate { duplicate_of = txid }) };
        case (null) {};
      };
    };

    switch (expires_at) {
      case (?expires_at) {
        if (expires_at < now) { return #Err(#Expired { ledger_time = now }) };
      };
      case (null) {};
    };

    let effectiveFee = init.transfer_fee;

    if (Option.get(fee, effectiveFee) != effectiveFee) {
      return #Err(#BadFee({ expected_fee = effectiveFee }));
    };

    switch (expected_allowance) {
      case (?expected_allowance) {
        let currentAllowance = allowance(approverAccount, spender, now);
        if (currentAllowance.allowance != expected_allowance) {
          return #Err(#AllowanceChanged({ current_allowance = currentAllowance.allowance }));
        };
      };
      case (null) {};
    };

    let approverBalance = balance(approverAccount, log);
    if (approverBalance < init.transfer_fee) {
      return #Err(#InsufficientFunds { balance = approverBalance });
    };

    let txid = recordTransaction({
      operation = #Approve(approval);
      fee = effectiveFee;
      timestamp = now;
    });

    assert (balance(approverAccount, log) == overflowOk(approverBalance - effectiveFee));

    #Ok(txid);
  };

  public shared ({ caller }) func icrc2_transfer_from({
    spender_subaccount : ?Types.Subaccount;
    from : Types.Account;
    to : Types.Account;
    amount : Types.Tokens;
    fee : ?Types.Tokens;
    memo : ?Types.Memo;
    created_at_time : ?Types.Timestamp;
  }) : async Types.Result<Types.TxIndex, Types.TransferFromError> {
    validateSubaccount(spender_subaccount);
    validateSubaccount(from.subaccount);
    validateSubaccount(to.subaccount);
    validateMemo(memo);

    let spender = { owner = caller; subaccount = spender_subaccount };
    let transfer : Types.Transfer = {
      spender = spender;
      source = #Icrc2TransferFrom;
      from = from;
      to = to;
      amount = amount;
      fee = fee;
      memo = memo;
      created_at_time = created_at_time;
    };

    if (caller == from.owner) {
      return applyTransfer(transfer);
    };

    let now = Nat64.fromNat(Int.abs(Time.now()));

    switch (checkTxTime(created_at_time, now)) {
      case (#Ok(_)) {};
      case (#Err(e)) { return #Err(e) };
    };

    let (operation, effectiveFee) = switch (classifyTransfer(log, transfer)) {
      case (#Ok(result)) { result };
      case (#Err(err)) { return #Err(err) };
    };

    let preTransferAllowance = allowance(from, spender, now);
    if (preTransferAllowance.allowance < amount + effectiveFee) {
      return #Err(#InsufficientAllowance { allowance = preTransferAllowance.allowance });
    };

    let txid = recordTransaction({
      operation = operation;
      fee = effectiveFee;
      timestamp = now;
    });

    let postTransferAllowance = allowance(from, spender, now);
    assert (postTransferAllowance.allowance == overflowOk(preTransferAllowance.allowance - (amount + effectiveFee)));

    #Ok(txid);
  };

  public query func icrc2_allowance({
    account : Types.Account;
    spender : Types.Account;
  }) : async Types.Allowance {
    allowance(account, spender, Nat64.fromNat(Int.abs(Time.now())));
  };

  public query func getTotalSupply() : async Nat {
    return init.initial_mints[0].amount;
  };

  ///  Customised Functios for the Ledger

  public func wallet_receive() : async { accepted : Nat64 } {
    let amount = ExperimentalCycles.available();
    let limit : Nat = capacity - balance_cycle;
    let accepted = if (amount <= limit) amount else limit;
    let deposit = ExperimentalCycles.accept<system>(accepted);
    assert (deposit == accepted);
    balance_cycle += accepted;
    { accepted = Nat64.fromNat(accepted) };
  };

  public func getCanisterId() : async Principal {
    return Principal.fromActor(this);
  };

};
