import List "mo:base/List";
import Iter "mo:base/Iter";
import Text "mo:base/Text";

module {
    public func paginate<V>(array : [V], chunkSize : Nat) : [[V]] {
        var paginationArray : List.List<[V]> = List.nil<[V]>();
        var num_chunk : Nat = (array.size() + chunkSize -1) / chunkSize;
        for (i in Iter.range(0, num_chunk -1)) {
            var tempArray = List.nil<V>();
            for (j in Iter.range(0, chunkSize -1)) {
                var index = i * chunkSize + j;
                if (index < array.size()) {
                  tempArray := List.push(array[index],tempArray);
                };
            };
          paginationArray := List.push(List.toArray(List.reverse(tempArray)), paginationArray);
        };
      List.toArray(List.reverse(paginationArray));
    };

  public func extractCanisterId(t : Text) : async Text {
    // Define the delimiter pattern for splitting the text
    let delimiter : Text.Pattern = #char '#';

    // Use Text.split to split the input text by the delimiter '#'
    let parts = Text.split(t, delimiter);

    // Fetch the next element after the first split to get the canister ID
    switch (parts.next(), parts.next()) {
        case (_, ?canisterId) { return canisterId };  // Return the second part as canister ID
        case _ { return "Invalid Venue Id" };  // Return null if no canister ID found
    }
  };
}