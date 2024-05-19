// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice'; // Fix the import path
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});
