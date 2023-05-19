import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookTypeSchema = new Schema(
  {
    value: {
      type: String,
    },
  },
  { timestamps: true }
);

const BookType = mongoose.model("BookType", bookTypeSchema);
export default BookType;

// BookType.insertMany([
//  { value: "None" },
//   { value: "Classics" },
//   { value: "Science" },
//   { value: "Self-Help" },
//   { value: "Business" },
//   { value: "Autobiography" },
//   { value: "Social Science" },
//   { value: "Spirituality" },
//   { value: "Medicine" },
//   { value: "Textbooks" },
//   { value: "Life Skills" },
// ]);
