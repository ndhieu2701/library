import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Cancel } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../store/messageSlice";
import { addBook, getBookTypes, updateBook } from "../../services/bookService";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { addNewbook, updatedBook } from "../../store/bookSlice";

const BookDetailsForm = ({
  title,
  author,
  description,
  releaseDate,
  numberOfPage,
  bookType,
  image,
  isAddBook,
}) => {
  const [bookTypes, setBookTypes] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [newTitle, setNewTitle] = useState(isAddBook ? "" : title);
  const [newAuthor, setNewAuthor] = useState(isAddBook ? "" : author);
  const [newDescription, setNewDescription] = useState(
    isAddBook ? "" : description
  );
  const [newReleaseDate, setNewReleaseDate] = useState(
    isAddBook ? null : dayjs(releaseDate)
  );
  const [newNumberOfPage, setNewNumberOfPage] = useState(
    isAddBook ? "" : numberOfPage
  );

  const [newBookType, setNewBookType] = useState(isAddBook ? "" : bookType);
  const [newImage, setNewImage] = useState(isAddBook ? null : image);
  const [demoImage, setDemoImage] = useState(isAddBook ? null : image);

  const navigate = useNavigate();
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setNewImage(selectedImage);
    setDemoImage(URL.createObjectURL(selectedImage));
  };

  const autoGetBookTypes = async (token) => {
    const res = await getBookTypes(token);
    if (res.status === "success") {
      setBookTypes(res.payload);
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

  const deleteImage = () => {
    setDemoImage(null);
    setNewImage(null);
  };

  const handleUpdate = async (
    token,
    bookID,
    title,
    author,
    description,
    releaseDate,
    numberOfPage,
    bookType,
    image
  ) => {
    const res = await updateBook(
      token,
      bookID,
      title,
      author,
      description,
      releaseDate,
      numberOfPage,
      bookType,
      image
    );
    if (res.status === "success") {
      dispatch(updatedBook({ bookID: bookID, updateBook: res.payload }));
      dispatch(
        setMessage({ status: res.status, message: "Update book success" })
      );
      navigate("/");
    }
    if (res.status === "error") {
      dispatch(setMessage({ status: res.status, message: res.payload }));
    }
  };

  const handleAddBook = async (
    token,
    title,
    author,
    description,
    releaseDate,
    numberOfPage,
    bookType,
    image
  ) => {
    const res = await addBook(
      token,
      title,
      author,
      description,
      releaseDate,
      numberOfPage,
      bookType,
      image
    );
    if (res.status === "success") {
      dispatch(addNewbook(res.payload));
      dispatch(
        setMessage({ status: res.status, message: "Add new book success" })
      );
      navigate("/");
    }
    if (res.status === "error") {
      dispatch(setMessage({ status: res.status, message: res.payload }));
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  const cancelEdit = () => {
    setNewTitle(title);
    setNewAuthor(author);
    setNewDescription(description);
    setNewReleaseDate(dayjs(releaseDate));
    setNewNumberOfPage(numberOfPage);
    setNewBookType(bookType);
    setNewImage(image);
    setDemoImage(image);
    setIsEdit(false);
  };

  useEffect(() => {
    autoGetBookTypes(token);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          width: "100%",
          mt: "2rem",
        }}
      >
        <Box
          sx={{
            width: "60%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 8rem",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextField
              label="Title"
              required
              sx={{ borderRadius: "10px", width: "45%" }}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              disabled={!isEdit && !isAddBook}
            />
            <TextField
              label="Author"
              required
              sx={{ borderRadius: "10px", width: "45%" }}
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              disabled={!isEdit && !isAddBook}
            />
          </Box>
          <TextField
            fullWidth
            label="Description"
            sx={{
              borderRadius: "10px",
              margin: "1.2rem 0",
            }}
            multiline={true}
            rows={6}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            disabled={!isEdit && !isAddBook}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <DatePicker
              sx={{ borderRadius: "10px", width: "45%" }}
              disableFuture
              label="Release date *"
              value={newReleaseDate}
              onChange={(value) => setNewReleaseDate(value)}
              disabled={!isEdit && !isAddBook}
            />
            <TextField
              label="Number of page"
              type="number"
              size="medium"
              sx={{ borderRadius: "10px", width: "45%" }}
              value={newNumberOfPage}
              onChange={(e) => setNewNumberOfPage(e.target.value)}
              disabled={!isEdit && !isAddBook}
            />
          </Box>
          <TextField
            select
            disabled={!isEdit && !isAddBook}
            label="Book type"
            helperText="If you don't know the type of your book or the type of your book isn't in there, please choose 'none' !"
            value={newBookType}
            onChange={(e) => setNewBookType(e.target.value)}
            fullWidth
            sx={{
              borderRadius: "10px",
              margin: "1.2rem 0",
            }}
          >
            {bookTypes.map((bookType) => {
              return (
                <MenuItem key={bookType._id} value={bookType._id}>
                  {bookType.value === "" ? "none" : bookType.value}
                </MenuItem>
              );
            })}
          </TextField>
        </Box>
        <Box
          sx={{
            width: "40%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "2rem",
          }}
        >
          <Button
            variant="contained"
            component="label"
            disabled={!isEdit && !isAddBook}
          >
            Upload{" "}
            <input
              hidden
              accept="image/*"
              type="file"
              multiple={false}
              onChange={handleImageChange}
            />
          </Button>
          <Box
            sx={{
              width: "300px",
              height: "300px",
              border: "none",
              marginTop: "2rem",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                background: `url(${demoImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                border: "2px dashed #ccc",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {newImage && (
                <IconButton
                  disabled={!isEdit && !isAddBook}
                  size="medium"
                  sx={{ height: "40px" }}
                  onClick={deleteImage}
                >
                  <Cancel />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider variant="fullWidth" sx={{ color: "#000", width: "100%" }} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "2rem",
        }}
      >
        {id === "new-book" && (
          <Button
            variant="contained"
            onClick={() =>
              handleAddBook(
                token,
                newTitle,
                newAuthor,
                newDescription,
                newReleaseDate,
                newNumberOfPage,
                newBookType,
                newImage
              )
            }
          >
            Add
          </Button>
        )}
        {id !== "new-book" && (
          <>
            {isEdit && (
              <Button variant="text" sx={{ mr: 4 }} onClick={cancelEdit}>
                Cancel
              </Button>
            )}
            <Button
              variant="contained"
              onClick={() =>
                !isEdit
                  ? handleEdit()
                  : handleUpdate(
                      token,
                      id,
                      newTitle,
                      newAuthor,
                      newDescription,
                      newReleaseDate,
                      newNumberOfPage,
                      newBookType,
                      newImage
                    )
              }
            >
              {isEdit ? "Save" : "Edit"}
            </Button>
          </>
        )}
      </Box>
    </>
  );
};

export default BookDetailsForm;
