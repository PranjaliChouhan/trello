import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  boards: [],
  currentBoard: null,
  lists: [],
  cards: [],
  loading: false,
  error: null
};

const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    fetchBoardsStart: (state) => {
      state.loading = true;
    },
    fetchBoardsSuccess: (state, action) => {
      state.loading = false;
      state.boards = action.payload;
    },
    setCurrentBoard: (state, action) => {
      state.currentBoard = action.payload;
    },
    updateLists: (state, action) => {
      state.lists = action.payload;
    },
    updateCards: (state, action) => {
      state.cards = action.payload;
    }
  }
});

export const { 
  fetchBoardsStart, 
  fetchBoardsSuccess, 
  setCurrentBoard,
  updateLists,
  updateCards
} = boardSlice.actions;
export default boardSlice.reducer; 