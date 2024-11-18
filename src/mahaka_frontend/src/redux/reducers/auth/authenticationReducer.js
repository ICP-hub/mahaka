import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createActor } from "../../../../../declarations/mahaka_backend/index";

const initialState = {
  isConnected: false,
  principal: null,
  backend: createActor(process.env.CANISTER_ID_MAHAKA_BACKEND),
  identity: null,
  role: null,
};

export const updateAuthData = createAsyncThunk(
  "authentication/updateAuthData",
  async (userData, { dispatch }) => {
    const { user, identity } = userData;
    let backend;
    if (user) {
      console.log("updating..");
      backend = createActor(process.env.CANISTER_ID_MAHAKA_BACKEND, {
        agentOptions: { identity, verifyQuerySignatures: false },
      });
    }
    dispatch(
      setAuthData({
        principal: user.principal.toText(),
        isConnected: !!user,
        identity,
        backend,
      })
    );
  }
);

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      const { principal, isConnected, identity, backend } = action.payload;
      state.principal = principal;
      state.isConnected = isConnected;
      state.identity = identity;
      state.backend = backend;
    },
  },
});

export const { setAuthData } = authenticationSlice.actions;
export default authenticationSlice.reducer;
