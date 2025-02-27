require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const postModel = require("./models/post.model");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const allPosts = await postModel.find();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.post("/", async (req, res) => {
  try {
    const { title, body } = req.body;
    const newPost = await postModel.create({ title, body });
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error); // Xatolikni chiqarish
    res
      .status(500)
      .json({ message: "Xato: post yaratishda xato", error: error.message });
  }
});

app.put("/:id", (req, res) => {
  const id = req.params;
  res.send(id);
});

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
