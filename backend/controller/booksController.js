import Book from "../model/Book.js";
import BookType from "../model/BookType.js";

//[GET] /books/ : get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("bookType");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//[GET]/books/booktypes
const getBookTypes = async (req, res) => {
  try {
    const bookTypes = await BookType.find();
    res.status(200).json(bookTypes);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//[GET] /books/:bookID: get book
const getBook = async (req, res) => {
  try {
    const { bookID } = req.params;
    const book = await Book.findById(bookID).populate("bookType");
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
//[POST] /books/newbook : create book
const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      releaseDate,
      numberOfPage,
      bookType,
      bookImage,
    } = req.body;
    const newBook = await Book.create({
      title,
      author,
      description,
      releaseDate,
      numberOfPage,
      bookType,
      bookImage,
    });
    const bookRes = await Book.populate(newBook, {
      path: "bookType",
    });
    res.status(201).json(bookRes);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//[PUT] /books/:bookID : update book
const updateBook = async (req, res) => {
  try {
    const { bookID } = req.params;
    const {
      title,
      author,
      description,
      releaseDate,
      numberOfPage,
      bookType,
      bookImage,
    } = req.body;
    const book = await Book.findByIdAndUpdate(bookID, {
      title,
      author,
      description,
      releaseDate,
      numberOfPage,
      bookType,
      bookImage,
    });
    const updatedBook = await Book.populate(book, {
      path: "bookType",
    });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//[DELETE] /books/:bookID : delete book
const deleteBook = async (req, res) => {
  try {
    const { bookID } = req.params;
    const deletedBook = await Book.findByIdAndDelete(bookID);
    res.status(200).json(deletedBook);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export {
  createBook,
  deleteBook,
  getAllBooks,
  updateBook,
  getBookTypes,
  getBook,
};
