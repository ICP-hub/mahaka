import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Principal } from "@dfinity/principal";
import notificationManager from "../../../common/utils/notificationManager";

// Initial state
const initialState = {
  users: [],
  currentUserById: null,
  currentUserByCaller: null,
  userLoading: true,
  userRole: null,
  error: null,
  currentPage: 0,
  totalPages: 0,
  newLoading: false,
  deleteLoading: false,
  searchedUser: null,
  searchUserLoading: false,
};

// Async operations
export const getUserDetailsByCaller = createAsyncThunk(
  "users/getUserDetailsByCaller",
  async ({ backend }) => {
    if (backend) {
      try {
        const response = await backend.getUserdetailsbycaller();
        console.log("response userdata", response);
        return response;
      } catch (err) {
        console.error("Error fetching user data", err);
        return err;
      }
    }
  }
);

export const getUserDetailsById = createAsyncThunk(
  "users/getUserDetailsById",
  async ({ backend, userId }) => {
    const response = await backend.getUserdetailsbyid(userId);
    // console.log(response);
    return response;
  }
);

export const listUsers = createAsyncThunk(
  "users/listUsers",
  async ({ backend, pageLimit, currPage }) => {
    try {
      const response = await backend.listUsers(pageLimit, currPage);
      console.log("repsonse list user", response);
      return response;
    } catch (err) {
      console.log("Error fetching list user", err);
    }
  }
);

// Create user
export const createUser = createAsyncThunk(
  "users/createUser",
  async ({ backend, principal, user, onToggle }, { rejectWithValue }) => {
    try {
      const response = await backend.createUser(
        Principal.fromText(principal),
        user.email,
        user.firstname,
        user.lastname
      );
      // console.log("response creating profile", response);
      notificationManager.success("User profile created successfully!");
      onToggle(false);
      return response;
    } catch (err) {
      console.error("Failed to create profile", err);
      notificationManager.error("Failed to create profile!");
      return rejectWithValue(err || "An unexpected error occurred");
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ backend, user, onToggle }, { rejectWithValue }) => {
    console.log(user);
    try {
      const response = await backend.updateUser(
        Principal.fromText(user.principal),
        user.email,
        user.firstName,
        user.lastName,
        user.role,
        { id: user.venue.id, title: user.venue.title }
      );
      console.log("response adding member", response);
      if (response.ok) {
        notificationManager.success("User updated!");
        onToggle(false);
        return response;
      } else {
        // onToggle(false);
        return response;
      }
    } catch (error) {
      notificationManager.error("Failed to update member details!");
      console.error("Error creating member", error);
      return rejectWithValue(error || "An unexpected error occurred");
    }
  }
);

// Update user profile
export const updateUserUserDetails = createAsyncThunk(
  "users/updateUserUserDetails",
  async ({ backend, user, onToggle }, { rejectWithValue }) => {
    try {
      const response = await backend.updateUserUserDetails(
        user.email,
        user.firstname,
        user.lastname
      );
      console.log("response updating user data", response);
      if (response.ok) {
        notificationManager.success("User updated!");
        onToggle(false);
        return response;
      } else {
        return response;
      }
    } catch (error) {
      // notificationManager.error("Failed to update member details!");
      console.error("Error creating member", error);
      // return rejectWithValue(error || "An unexpected error occurred");
    }
  }
);

// Remove user
export const deleteUserByPrincipal = createAsyncThunk(
  "users/deleteUserByPrincipal",
  async ({ backend, principal, onToggle }, { rejectWithValue }) => {
    try {
      const response = await backend.deleteUserByPrincipal(principal);
      if (response.ok) {
        onToggle(false);
        notificationManager.error("User deleted!");
        return response.ok;
      }
      throw new Error("Failed to delete user");
    } catch (error) {
      notificationManager.error("Failed to remove member details!");
      console.error("Error deleting member", error);
      return rejectWithValue(error || "An unexpected error occurred");
    }
  }
);

export const searchMembers = createAsyncThunk(
  "users/searchMembers",
  async ({ backend, searchText, chunkSize, pageNo }, { rejectWithValue }) => {
    try {
      const response = await backend.searchMembers(
        searchText,
        chunkSize,
        pageNo
      );
      if (!response) {
        throw new Error("No data received");
      }
      return response;
    } catch (err) {
      console.error("Error searching members", err);
      return rejectWithValue(err.message || "An unexpected error occurred");
    }
  }
);

// Create slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Case user details by caller
      .addCase(getUserDetailsByCaller.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getUserDetailsByCaller.fulfilled, (state, action) => {
        state.userLoading = false;
        if (action.payload.ok) {
          state.currentUserByCaller = action.payload.ok;
          state.userRole = Object.keys(action.payload.ok.role)[0];
        }
        state.error = null;
      })
      .addCase(getUserDetailsByCaller.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.error.message;
      })

      // Case user details by id
      .addCase(getUserDetailsById.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getUserDetailsById.fulfilled, (state, action) => {
        state.userLoading = false;
        state.currentUserById = action.payload.ok;
        state.error = null;
      })
      .addCase(getUserDetailsById.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.error.message;
      })

      // Case list users
      .addCase(listUsers.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        // console.log(action);
        state.userLoading = false;
        state.users = action.payload.data;
        state.currentPage = parseInt(action.payload.current_page);
        state.totalPages = parseInt(action.payload.total_pages);
        state.error = null;
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.error.message;
      })

      // Case update user
      .addCase(updateUser.pending, (state) => {
        state.newLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload.ok) {
          state.newLoading = false;
          const updatedUser = action.payload.ok;
          const userIndex = state.users.findIndex(
            (user) => user.id.toText() === updatedUser[0].id.toText()
          );

          if (userIndex !== -1) {
            state.users[userIndex] = {
              ...state.users[userIndex],
              ...updatedUser[0],
            };
          } else {
            state.users.push(updatedUser[0]);
          }
          state.error = null;
        } else if (action.payload.err) {
          state.newLoading = false;
          notificationManager.error("Failed to create member");
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.newLoading = false;
        state.error = action.error.message;
      })

      // Delete user update
      .addCase(deleteUserByPrincipal.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteUserByPrincipal.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.users = state.users.filter(
          (user) => user.id.toText() !== action.payload[0].id.toText()
        );
        state.error = null;
      })
      .addCase(deleteUserByPrincipal.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.error.message;
      })

      // update user userDetails
      .addCase(updateUserUserDetails.pending, (state) => {
        state.newLoading = true;
      })
      .addCase(updateUserUserDetails.fulfilled, (state, action) => {
        state.newLoading = false;
        if (action.payload.ok) {
          state.currentUserByCaller = action.payload.ok[0];
          state.userRole = Object.keys(action.payload.ok[0].role)[0];
        } else {
          notificationManager.error("Failed to update user");
        }
        state.error = null;
      })
      .addCase(updateUserUserDetails.rejected, (state, action) => {
        state.newLoading = false;
        state.error = action.error.message;
      })
      // create user
      .addCase(createUser.pending, (state) => {
        state.newLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.newLoading = false;
        state.currentUserByCaller = action.payload.ok[0];
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.newLoading = false;
        state.error = action.error.message;
      })
      // Search members
      .addCase(searchMembers.pending, (state) => {
        state.searchUserLoading = true;
      })
      .addCase(searchMembers.fulfilled, (state, action) => {
        state.searchUserLoading = false;
        state.searchedUser = action.payload.data;
        state.error = null;
      })
      .addCase(searchMembers.rejected, (state, action) => {
        state.searchUserLoading = false;
        state.searchedUser = [];
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
