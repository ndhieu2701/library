import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: String,
    releaseDate: {
      type: Date,
      required: true,
    },
    numberOfPage: Number,
    bookType: {
      type: mongoose.Types.ObjectId,
      ref: "BookType",
    },
    bookImage: String,
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;

// Book.insertMany([
//   {
//     title: "The Alchemist",
//     author: "Paulo Coelho",
//     description:
//       "A story about a shepherd boy who follows his dreams and discovers his personal legend",
//     releaseDate: "1988-04-01T00:00:00.000Z",
//     numberOfPage: 163,
//     bookType: "646785ff90350f7795b41074",
//   },
//   {
//     title: "Sapiens: A Brief History of Humankind",
//     author: "Yuval Noah Harari",
//     description:
//       "A book that explores the history of the human species from the emergence of Homo sapiens in Africa to the present day",
//     releaseDate: "2011-02-10T00:00:00.000Z",
//     numberOfPage: 498,
//     bookType: "646785ff90350f7795b41075",
//   },
//   {
//     title: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     description:
//       "A novel set in the Great Depression, which follows the life of a young girl named Scout Finch as she grows up and learns about racism and injustice in her community",
//     releaseDate: "1960-07-11T00:00:00.000Z",
//     numberOfPage: 281,
//     bookType: "646785ff90350f7795b41076",
//   },
//   {
//     title: "The Catcher in the Rye",
//     author: "J.D. Salinger",
//     description:
//       "A story about a teenage boy named Holden Caulfield who is struggling to find his place in the world",
//     releaseDate: "1951-07-16T00:00:00.000Z",
//     numberOfPage: 277,
//     bookType: "646785ff90350f7795b41075",
//   },
//   {
//     title: "1984",
//     author: "George Orwell",
//     description:
//       "A dystopian novel set in a totalitarian society where individualism and independent thinking are persecuted",
//     releaseDate: "1949-06-08T00:00:00.000Z",
//     numberOfPage: 328,
//     bookType: "646785ff90350f7795b41078",
//   },
//   {
//     title: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     description:
//       "A novel set in the Roaring Twenties, which follows the life of a young man named Jay Gatsby and his obsession with a woman named Daisy Buchanan",
//     releaseDate: "1925-04-10T00:00:00.000Z",
//     numberOfPage: 218,
//     bookType: "646785ff90350f7795b4107a",
//   },
//   {
//     title: "The Picture of Dorian Gray",
//     author: "Oscar Wilde",
//     description:
//       "A novel about a young man named Dorian Gray who sells his soul to preserve his youth and beauty",
//     releaseDate: "1890-07-01T00:00:00.000Z",
//     numberOfPage: 254,
//     bookType: "646785ff90350f7795b41079",
//   },
//   {
//     title: "Moby-Dick; or, The Whale",
//     author: "Herman Melville",
//     description:
//       "A novel about a captain's obsessive quest for revenge against a giant white sperm whale",
//     releaseDate: "1851-10-18T00:00:00.000Z",
//     numberOfPage: 585,
//     bookType: "646785ff90350f7795b41074",
//   },
// ]);
