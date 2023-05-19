import axios from "axios";
import { baseURL } from "./baseURL";
import { handleUpload } from "./upload";

const convertDate = (ISODate) => {
  const date = new Date(ISODate);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const formattedDateString = `${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}-${year.toString()}`;
  return formattedDateString;
};

const addBook = async (
  token,
  title,
  author,
  description,
  releaseDate,
  numberOfPage,
  bookType,
  image
) => {
  //validate
  if (!title || !author || !releaseDate)
    return {
      status: "error",
      payload: `Please filled the ${
        !title ? "title" : !author ? "author" : "release date"
      } fields!`,
    };
  if (!bookType)
    return {
      status: "error",
      payload: "Please choose 'none' for book type!",
    };
  if (image) {
    var imageUrl;
    try {
      imageUrl = await handleUpload(image);
    } catch (error) {
      return {
        status: "error",
        payload: "Upload image error, please try again!",
      };
    }
  }

  const date = new Date(releaseDate).toISOString();
  const data = {
    title,
    author,
    description,
    releaseDate: date,
    numberOfPage,
    bookType,
    bookImage: imageUrl,
  };

  try {
    const res = await axios.post(`${baseURL}/books/newbook`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const newBook = await res.data;
    return { status: "success", payload: newBook };
  } catch (error) {
    return { status: "error", payload: "Server error! Please try again" };
  }
};

const updateBook = async (
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
  //validate
  if (!title || !author || !releaseDate)
    return {
      status: "error",
      payload: `Please filled the ${
        !title ? "title" : !author ? "author" : "release date"
      } fields!`,
    };
  if (!bookType)
    return {
      status: "error",
      payload: "Please choose 'none' for book type!",
    };

  if (image && typeof image !== "string") {
    var imageUrl;
    try {
      imageUrl = await handleUpload(image);
    } catch (error) {
      return {
        status: "error",
        payload: error.message,
      };
    }
  }

  const date = new Date(releaseDate).toISOString();
  const data = {
    title,
    author,
    description,
    releaseDate: date,
    numberOfPage,
    bookType,
    bookImage: image && typeof image !== "string" ? imageUrl : image,
  };

  try {
    const res = await axios.put(`${baseURL}/books/${bookID}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const newBook = await res.data;
    return { status: "success", payload: newBook };
  } catch (error) {
    return { status: "error", payload: "Server error! Please try again" };
  }
};

const getAllBooks = async () => {
  try {
    const response = await axios(`${baseURL}/books/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const books = await response.data;
    return { status: "success", payload: books };
  } catch (error) {
    return { status: "error", payload: error.response.data };
  }
};

const deleteBookByID = async (bookID, token) => {
  try {
    const res = await axios.delete(`${baseURL}/books/${bookID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const deletedBook = await res.data;
    return { status: "success", payload: deletedBook };
  } catch (error) {
    return { status: "error", payload: error.response.data };
  }
};

const getBookTypes = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/books/booktypes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const bookTypes = await res.data;
    return { status: "success", payload: bookTypes };
  } catch (error) {
    if (error.status === 500) {
      return { status: "error", payload: "Server error! Please try again" };
    }
  }
};

const getBook = async (bookID, token) => {
  try {
    const res = await axios.get(`${baseURL}/books/${bookID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const book = await res.data;
    return { status: "success", payload: book };
  } catch (error) {
    return { status: "error", payload: error.response.data };
  }
};

export {
  convertDate,
  getAllBooks,
  deleteBookByID,
  getBookTypes,
  getBook,
  addBook,
  updateBook,
};
