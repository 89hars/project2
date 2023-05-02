const { Schema, model } = require("mongoose");
//const { checkout } = require("../app");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const commentSchema = new Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Employee',
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