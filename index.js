require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error.middleware.js");
const cors = require("cors");

const app = express();

app.use(cors({}));
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static("static"));
app.use(cookieParser({}));

// Routes
app.use("/api/post", require("./routers/post.route.js"));
app.use("/api/auth", require("./routers/auth.route.js"));

app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;
const bootstrap = async () => {
  try {
    await mongoose.connect(DB_URL).then(() => console.log("Connected DB"));
    app.listen(PORT, () =>
      console.log(`Server is running - http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(`Error connecting with DB - ${error}`);
  }
};
bootstrap();
