require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(fileUpload({}));
app.use(express.static("static"));

// Routes
app.use("/api/post", require("./routers/post.router.js"));

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
