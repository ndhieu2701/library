import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, convertDate } from "../services/bookService";
import { setBooks } from "../store/bookSlice";
import { setMessage } from "../store/messageSlice";
import { useNavigate } from "react-router-dom";
import BookDialog from "../component/bookDialog";

const Home = () => {
  const token = useSelector((state) => state.user.token);
  const books = useSelector((state) => state.book.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState("");

  const handleGetAllBooks = async () => {
    const res = await getAllBooks();
    if (res.status === "success") {
      dispatch(setBooks(res.payload));
    }
    if (res.status === "error") {
      dispatch(
        setMessage({
          status: res.status,
          message: "Server error, please try again later",
        })
      );
    }
  };

  const handleOpenDialog = (bookID) => {
    setSelectedBook(bookID);
    setOpenDialog(true);
  };

  useEffect(() => {
    handleGetAllBooks();
  }, []);

  return (
    <Box sx={{ width: "100%", padding: "2rem 12rem" }}>
      {token && (
        <Button
          variant="contained"
          sx={{ width: "100%", marginBottom: "1rem" }}
          onClick={() => navigate("/book/new-book")}
        >
          Add book
        </Button>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "60%" }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">STT</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell align="right">Book type</TableCell>
              <TableCell align="right">Release Date</TableCell>
              <TableCell align="right">Number of page</TableCell>
              {token && <TableCell align="center">Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book, index) => {
              return (
                <TableRow
                  key={book._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {index + 1}
                  </TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell align="right">{book.bookType.value}</TableCell>
                  <TableCell align="right">
                    {convertDate(book.releaseDate)}
                  </TableCell>
                  <TableCell align="right">{book.numberOfPage}</TableCell>
                  {token && (
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        sx={{ marginRight: "0.4rem" }}
                        onClick={() => navigate(`/book/${book._id}`)}
                      >
                        View
                      </Button>
                      <Button
                        sx={{ color: "red" }}
                        onClick={() => handleOpenDialog(book._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {openDialog && (
        <BookDialog
          open={openDialog}
          setOpen={setOpenDialog}
          selectedBook={selectedBook}
        />
      )}
    </Box>
  );
};

export default Home;
