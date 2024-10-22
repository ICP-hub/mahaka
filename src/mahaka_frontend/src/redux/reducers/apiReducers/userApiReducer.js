import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  users: [],
  currentUser: null,
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
    return response.data;
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
  async ({ backend, user, setIsModalOpen }) => {
    const response = await backend.updateUser(
      user.firstName,
      user.lastName,
      user.email,
      user.role,
      user.principal
    );
    if (response.ok);
    return response;
  }
);

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
        state.currentUser = action.payload.ok;
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
        state.currentUser = action.payload;
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
        state.currentUser = {
          ...state.currentUser,
          firstName: action.payload.ok[0].firstName,
          lastName: action.payload.ok[0].lastName,
          email: action.payload.ok[0].email,
          role: action.payload.ok[0].role,
          principal: action.payload.ok[0].principal,
        };
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
