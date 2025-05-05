import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500, // Limite máximo de caracteres para o post
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // Adicione outros campos relevantes conforme necessário, como:
  // author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Se houver um modelo de usuário
  // likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

const Post = mongoose.model("Post", postSchema);

export default Post;