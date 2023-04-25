import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { SessionState } from "./session";
const initialState: SessionState = {
   loginDisplay: 0,
   loginDisplayLastClicked: 0,
   paused: false,
   toggle: true,
   cookieConsent: true,
   darkMode: false,
   speed: 0.5,
   status: "idle",
   user: {
      token: "",
      email: "",
      displayName: "",
      photoUrl: "",
      uid: "",
      createdAt: 1651367411061,
      bio: `NA `,
      lastLoginAt: 1661467511061,
      lastSignInTime: "1661467511061",
   },
   value: 0,
   dim: { wi: 100, he: 100 },
};

export const sessionSlice = createSlice({
   name: "session",
   initialState,
   reducers: {
      setSession: (state, action: PayloadAction<SessionState>) => {
         const o: SessionState = action.payload;

         try {
            if (o.user.email) state.user.email = o.user.email;
            if (o.user.token) state.user.token = o.user.token;
            if (o.speed) state.speed = o.speed;
            if (o.user.lastLoginAt) state.user.lastLoginAt = o.user.lastLoginAt;

            state.darkMode = o.darkMode;
            state.paused = o.paused;
            state.loginDisplayLastClicked = o.loginDisplayLastClicked;
            state.status = o.status;
            state.value = o.value;
            state.dim = o.dim;
            state.cookieConsent = o.cookieConsent;
         } catch (error) {
            console.log(error);
         }
      },
      clearSession: (state) => {
         state.user.token = "";
         state.user.email = "";
         state.loginDisplay = 1; // 0 or -1, no login, 1 login, 2 show logout
         state.loginDisplayLastClicked = 2;
      },
      // Use the PayloadAction type to declare the contents of `action.payload`
   },
});

export const { setSession, clearSession } = sessionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.session.value)`
export const selectSession = (state: RootState) => state.session.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const sessionInit =
   (user: any): AppThunk =>
   (dispatch) => {
      dispatch(setSession(user));
   };

export default sessionSlice.reducer;
