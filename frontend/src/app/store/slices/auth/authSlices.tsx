import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logoutUser, validateAuth } from "@/app/services/auth/auth-service";

export interface IAuthState {
  isLoggedIn: boolean | null;
}

export const initialState: IAuthState = {
  isLoggedIn: null,
};

const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //validate user
    builder.addCase(validateAuth.pending, (state: IAuthState, _) => {
      state.isLoggedIn = false;
    });
    builder.addCase(
      validateAuth.fulfilled,
      (state: IAuthState, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        state.isLoggedIn = action.payload?.isLoggedIn;
      }
    );
    builder.addCase(
      validateAuth.rejected,
      (state: IAuthState, action: PayloadAction<any>) => {
        state.isLoggedIn = false;
      }
    );

    //logout reducer
    builder.addCase(
      logoutUser.fulfilled,
      (state: IAuthState, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        state.isLoggedIn = false;
      }
    );
    builder.addCase(logoutUser.rejected, (state: IAuthState, _) => {
      state.isLoggedIn = true; // cancel the logout
    });
  },
});

export default authSlices.reducer;
