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
  currentPage: 1,
  totalPages: 1,
  newLoading: false,
  deleteLoading: false,
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
    const response = await backend.listUsers(pageLimit, currPage);
    return response;
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ backend, user, onToggle }, { rejectWithValue }) => {
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
      }
      throw new Error("Failed to update user");
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
      // console.log("response updating user data", response);
      if (response.ok) {
        notificationManager.success("User updated!");
        onToggle(false);
        return response;
      }
      throw new Error("Failed to update user");
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
        state.currentUserByCaller = action.payload.ok;
        state.userRole = Object.keys(action.payload.ok.role)[0];
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
        state.userLoading = false;
        state.users = action.payload.data;
        state.currentPage = action.payload.current_page;
        state.totalPages = action.payload.total_pages;
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
        console.log(action);
        state.newLoading = false;
        state.currentUserByCaller = action.payload.ok[0];
        state.userRole = Object.keys(action.payload.ok.role)[0];
        state.error = null;
      })
      .addCase(updateUserUserDetails.rejected, (state, action) => {
        state.newLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
