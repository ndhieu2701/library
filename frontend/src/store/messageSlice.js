import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  message: "",
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    clearMessage: () => initialState,
  },
});

export const {setMessage, clearMessage} = messageSlice.actions
export default messageSlice.reducer
