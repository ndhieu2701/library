import userApi from "./user.js";
import booksApi from "./books.js";

const routers = (app) => {
  app.use("/user", userApi);
  app.use("/books", booksApi);
};

export default routers;
