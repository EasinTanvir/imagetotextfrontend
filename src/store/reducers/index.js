import { configureStore } from "@reduxjs/toolkit";
import { voiceReducers } from "./voice";

export const store = configureStore({
  reducer: {
    voice: voiceReducers,
  },
});
