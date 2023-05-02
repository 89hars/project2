const { Schema, model, default: mongoose } = require("mongoose");
//const { checkout } = require("../app");

const commentSchema = new Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    content: {
        type: String,
        required: true,
    },
},
// this second object adds extra properties: `createdAt` and `updatedAt`    
{timestamps: true}
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
