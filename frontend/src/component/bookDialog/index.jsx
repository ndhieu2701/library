import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookByID } from "../../services/bookService";
import { setMessage } from "../../store/messageSlice";
import { deleteBook } from "../../store/bookSlice";

const BookDialog = ({ open, setOpen, selectedBook }) => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteBook = async () => {
    const res = await deleteBookByID(selectedBook, token);
    if (res.status === "success") {
      dispatch(
        setMessage({ status: res.status, message: "Delete book success" })
      );
      dispatch(deleteBook({ _id: selectedBook }));
      handleClose();
    }
    if (res.status === "error") {
      dispatch(
        setMessage({
          status: res.status,
          message: "Delete failed! Please try again later.",
        })
      );
    }
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete this book?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this book? You can not restore this book.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="text">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteBook}
            variant="contained"
            sx={{ backgroundColor: "red", color: "#fff" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookDialog;
