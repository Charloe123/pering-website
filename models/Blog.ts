import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  author: string;
  content: string;
  date: string;
  likes: string[];
  dislikes: string[];
  comments: { author: string; content: string; createdAt: Date }[];
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, default: () => new Date().toISOString() },
    likes: { type: [String], default: [] },
    dislikes: { type: [String], default: [] },
    comments: [
      {
        author: { type: String, required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
