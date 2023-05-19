import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import BookDetailsForm from "../component/bookDetailsForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBook } from "../services/bookService";

const BookDetails = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.user.token);
  const [book, setBook] = useState();
  const [loading, setLoading] = useState(false);

  const handleGetBook = async (bookID, token) => {
    if (bookID === "new-book") return;
    setLoading(true);
    const res = await getBook(bookID, token);
    if (res.status === "success") {
      setBook(res.payload);
    }
    if (res.status === "error") {
      dispatch(
        setMessage({
          status: res.status,
          message: "Something went wrong, please try again later",
        })
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetBook(id, token);
  }, []);

  return (
    <>
      {loading && <Typography>Loading...</Typography>}
      {!loading && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <Typography variant="h4">Book</Typography>
          <BookDetailsForm
            title={book?.title}
            author={book?.author}
            description={book?.description}
            releaseDate={book?.releaseDate}
            numberOfPage={book?.numberOfPage === null ? "" : book?.numberOfPage}
            bookType={book?.bookType._id}
            image={book?.bookImage}
            isAddBook={id === "new-book" ? true : false}
          />
        </Box>
      )}
    </>
  );
};

export default BookDetails;
