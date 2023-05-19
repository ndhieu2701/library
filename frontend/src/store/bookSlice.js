import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    deleteBook: (state, action) => {
      const newBooks = state.books.filter(
        (book) => book._id !== action.payload._id
      );
      state.books = newBooks;
    },
    addNewbook: (state, action) => {
      state.books.push(action.payload);
    },
    updatedBook: (state, action) => {
      const bookIndex = state.books.findIndex(
        (book) => book._id === action.payload.bookID
      );
      state.books[bookIndex] = action.payload.updateBook;
    },
  },
});

export const { setBooks, deleteBook, addNewbook , updatedBook} = bookSlice.actions;
export default bookSlice.reducer;
