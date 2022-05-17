const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  author: String,
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      content: String,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    if (returnedObject.comments) {
      returnedObject.comments.map((comment) => {
        comment.id = comment._id.toString();
        delete comment._id;
      });
    }
  },
});

module.exports = mongoose.model("Blog", schema);
