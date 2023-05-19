import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
  getBookTypes
} from "../controller/booksController.js";
const router = express.Router();

router.get("/", getAllBooks);
router.get("/booktypes", verifyToken, getBookTypes)
router.get("/:bookID", verifyToken, getBook)
router.post("/newbook", verifyToken, createBook);
router.put("/:bookID", verifyToken, updateBook);

router.delete("/:bookID", verifyToken, deleteBook);

export default router;
