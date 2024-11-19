import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Principal } from "@dfinity/principal";

// Initial state
const initialState = {
  users: [],
  currentUserById: null,
  currentUserByCaller: null,
  userLoading: true,
  error: null,
  currentPage: 1,
  totalPages: 1,
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

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ backend, user, onToggle }) => {
    console.log(user.role);
    const response = await backend.updateUser(
      user.principal,
      user.email,
      user.firstName,
      user.lastName,
      user.role,
      "one"
    );
    if (response.ok) {
      onToggle(false); // Close the modal after successful update if required
      return response;
    }
    throw new Error("Failed to update user");
  }
);

// export const createUser = createAsyncThunk(
//   "users/createUser",
//   async ({ backend, user }) => {
//     const response = await backend.createUser(
//       user.email,
//       user.firstName,
//       user.lastName,
//       user.role
//     );
//     return response;
//   }
// );

// Create slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetailsByCaller.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getUserDetailsByCaller.fulfilled, (state, action) => {
        state.userLoading = false;
        state.currentUserByCaller = action.payload.ok;
        state.error = null;
      })
      .addCase(getUserDetailsByCaller.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.error.message;
      })
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
      .addCase(updateUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userLoading = false;
        const updatedUser = action.payload.ok;
        const userIndex = state.users.findIndex(
          (user) => user.principal === updatedUser.principal
        );

        if (userIndex !== -1) {
          state.users[userIndex] = {
            ...state.users[userIndex],
            ...updatedUser,
          };
        } else {
          state.users.push(updatedUser); // If it's a new user, add them
        }

        state.currentUserById = updatedUser;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.error.message;
      });
    // .addCase(createUser.pending, (state) => {
    //   state.userLoading = true;
    // })
    // .addCase(createUser.fulfilled, (state, action) => {
    //   state.userLoading = false;
    //   const newUser = action.payload.ok;
    //   console.log(newUser, "new user");
    //   state.users.push(newUser); // Directly add new user to the list
    //   state.error = null;
    // })
    // .addCase(createUser.rejected, (state, action) => {
    //   state.userLoading = false;
    //   state.error = action.error.message;
    // });
  },
});

export default userSlice.reducer;
