import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { AnimsState } from "./anims";

const initialState: AnimsState = {
  anim1: "noAnim",
  anim2: "noAnim",
  num1: 0,
  num2: 0,
};

export const animsSlice = createSlice({
  name: "anims",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setAnims: (state, action: PayloadAction<AnimsState>) => {
      const o: AnimsState = action.payload;

      try {
        state.anim1 = o.anim1 || "noAnim";
        state.anim2 = o.anim2 || "noAnim";
        state.num1 = o.num1 || 0;
        state.num2 = o.num2 || 0;
      } catch (error) {
        console.log(error);
      }
    },
    clearAnims: (state) => {
      state.anim1 = "noAnim";
      state.anim2 = "noAnim";
      state.num1 = 0;
      state.num2 = 0;
    },
  },
});

export const { setAnims, clearAnims } = animsSlice.actions;
export const selectAnims = (state: RootState) => state.anims;

export default animsSlice.reducer;
