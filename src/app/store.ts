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

export const store = configureStore({
   reducer: {
      session: sessionReducer,
      snackbar: snackbarReducer,
      todo: todoReducer,
      suggest: suggestReducer,
      users: usersReducer,
      dialog: dialogReducer,
      menu: menuReducer,
      page: pageReducer,
      anims: animsReducer,
   },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;
