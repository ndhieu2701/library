import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";

import routers from "./api/index.js";
import connectDB from "./config/connectDB.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
routers(app);

const PORT = process.env.PORT || 3001;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log("app listen on port: ", PORT));
  })
  .catch((error) => {
    console.log(error);
  });
