import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PlugLogin, NFIDLogin, CreateActor } from "ic-auth";
// import { Principal } from "@dfinity/principal";
import { createActor } from "../../../../../../.dfx/local/canisters/mahaka_backend";
// import { idlFactory } from "../../../../../../.dfx/local/canisters/mahaka_backend";

const canisterID = process.env.CANISTER_ID_MAHAKA_BACKEND;

const initialState = {
  isConnected: false,
  principal: null,
  backend: createActor(canisterID),
  // identity: null,
  loading: false,
  error: null,
};

// async thunks for login
export const plugLogin = createAsyncThunk(
  "auth/plugLogin",
  async (_, { rejectWithValue }) => {
    try {
      const loginData = await PlugLogin([canisterID]);
      sessionStorage.setItem("isPlugLogged", true);
      return loginData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const nfidLogin = createAsyncThunk(
  "auth/nfidLogin",
  async (_, { rejectWithValue }) => {
    try {
      const loginData = await NFIDLogin();
      console.log(loginData);
      return loginData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      sessionStorage.removeItem("isPlugLogged");
      state.isConnected = false;
      state.principal = null;
      // state.identity = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(plugLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(plugLogin.fulfilled, (state, action) => {
        state.isConnected = true;
        state.principal = action.payload.principal;
        // state.identity = action.payload.agent._identity;
        state.backend = createActor(canisterID, action.payload.agent);
        state.loading = false;
      })
      .addCase(plugLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(nfidLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(nfidLogin.fulfilled, (state, action) => {
        state.isConnected = true;
        state.principal = action.payload.principal;
        // state.identity = action.payload.agent._identity;
        state.backend = createActor(canisterID, action.payload.agent);
        state.loading = false;
      })
      .addCase(nfidLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
