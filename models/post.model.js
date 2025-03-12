const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    author: {type: Schema.ObjectId, ref: 'User'},
    title: { type: String, required: [true, "Sarlavha talab qilinadi"] },
    body: { type: String, required: [true, "Matn talab qilinadi"] },
    picture: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema);
