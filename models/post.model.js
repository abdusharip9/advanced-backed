const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  title: { type: String, required: [true, "Sarlavha talab qilinadi"] },
  body: { type: String, required: [true, "Matn talab qilinadi"] },
});

module.exports = model("Post", postSchema);
