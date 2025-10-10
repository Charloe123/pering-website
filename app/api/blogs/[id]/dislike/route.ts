import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { userId } = await request.json();
  await connectDB();

  const blog = await Blog.findById(id);
  if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

  const hasLiked = blog.likes.includes(userId);
  const hasDisliked = blog.dislikes.includes(userId);

  let update;
  if (hasDisliked) {
   
    update = { $pull: { dislikes: userId } };
  } else {
   
    update = {
      $addToSet: { dislikes: userId },
      $pull: { likes: userId }
    };
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, update, { new: true });
  if (!updatedBlog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(updatedBlog.toObject());
}
