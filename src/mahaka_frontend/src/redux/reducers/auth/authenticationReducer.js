import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createActor } from "../../../../../../.dfx/local/canisters/mahaka_backend";
import { Principal } from "@dfinity/principal";
import { NFID } from "@nfid/embed";

const canisterID = process.env.CANISTER_ID_MAHAKA_BACKEND;

const initialState = {
  isConnected: false,
  principal: null,
  backend: createActor(canisterID),
  identity: null,
  loading: false,
  error: null,
  NFIDInstance: null,
};

// NFID login
export const NFIDLogin = createAsyncThunk(
  "authentication/NFIDLogin",
  async (nfid, { rejectWithValue }) => {
    const canisterArray = [canisterID];
    try {
      const identity = nfid.getIdentity();
      console.log("identity is ", identity);
      const delegationResult = await nfid.getDelegation({
        targets: canisterArray,
      });
      const principal = Principal.from(
        delegationResult.getPrincipal()
      ).toText();

      // const backendActor = createActor(canisterID, {
      //   agentOptions: { identity, verifyQuerySignatures: false },
      // });

      // return { principal, identity, backendActor };
      return { principal, identity };
    } catch (error) {
      return rejectWithValue("Failed to get NFID delegation.");
    }
  }
);

export const NFIDLogout = createAsyncThunk(
  "authentication/NFIDLogout",
  async () => {
    await NFID._authClient.logout();
    return;
  }
);

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    NFIDStart: (state, action) => {
      state.NFIDInstance = action.payload;
    },
    NFIDSync: (state) => {
      if (state.NFIDInstance) {
        state.identity = state.NFIDInstance.getIdentity();
        state.principal = state.identity.getPrincipal().toText();
        state.isConnected = NFID._authClient.isAuthenticated;
        state.backend = createActor(canisterID, {
          agentOptions: {
            identity: state.identity,
            verifyQuerySignatures: false,
          },
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(NFIDLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(NFIDLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isConnected = true;
        state.principal = action.payload.principal;
        state.identity = action.payload.identity;
      })
      .addCase(NFIDLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(NFIDLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.isConnected = false;
      });
  },
});

export const { NFIDStart, NFIDSync } = authenticationSlice.actions;

export default authenticationSlice.reducer;
