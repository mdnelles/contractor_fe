import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import sessionReducer from "../features/session/sessionSlice";
import snackbarReducer from "../features/snackbar/snackbarSlice";
import suggestReducer from "../features/suggest/suggestSlice";
import todoReducer from "../features/todo/todoSlice";
import usersReducer from "../features/users/usersSlice";
import dialogReducer from "../features/dialog/dialogSlice";
import menuReducer from "../features/menu/menuSlice";
import pageReducer from "../features/page/pageSlice";
import animsReducer from "../features/anims/animsSlice";
import transReducer from "../features/transalte/translateSlice";
import contractsReducer from "../features/contracts/contractsSlice";
import storesReducer from "../features/stores/storesSlice";

export const store = configureStore({
   reducer: {
      anims: animsReducer,
      dialog: dialogReducer,
      menu: menuReducer,
      page: pageReducer,
      session: sessionReducer,
      snackbar: snackbarReducer,
      suggest: suggestReducer,
      todo: todoReducer,
      trans: transReducer,
      users: usersReducer,
      contracts: contractsReducer,
      stores: storesReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;
