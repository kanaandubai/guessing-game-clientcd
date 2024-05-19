
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playerName: '',
  playerPoints: 0,
  playerMultiplier: 1,
  rounds: [],
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayerName(state, action) {
      state.playerName = action.payload;
    },
    setPlayerPoints(state, action) {
      state.playerPoints = action.payload;
    },
    setPlayerMultiplier(state, action) {
      state.playerMultiplier = action.payload;
    },
    setRounds(state, action) {
      state.rounds = action.payload;
    },
  },
});

export const {
  setPlayerName,
  setPlayerPoints,
  setPlayerMultiplier,
  setRounds,
} = gameSlice.actions;

export default gameSlice.reducer;
