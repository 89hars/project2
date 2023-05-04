
const { Schema, model, default: mongoose } = require("mongoose");

// Model of the comments to connect with the DB. This model is related to the Employee model by the ref.

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
