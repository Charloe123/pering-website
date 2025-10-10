import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  let userId;
  try {
    const body = await request.json();
    userId = body.userId;
  } catch (jsonError) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  await connectDB();

  
  const blog = await Blog.findById(id);
  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  const hasLiked = blog.likes.includes(userId);
  const hasDisliked = blog.dislikes.includes(userId);

  let update;
  if (hasLiked) {
   
    update = { $pull: { likes: userId } };
  } else {
    
    update = {
      $addToSet: { likes: userId },
      $pull: { dislikes: userId }
    };
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, update, { new: true });
  if (!updatedBlog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(updatedBlog.toObject());
}
