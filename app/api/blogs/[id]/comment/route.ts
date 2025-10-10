import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const { content, author } = await request.json();

  await connectDB();

  const blog = await Blog.findByIdAndUpdate(
    id,
    { $push: { comments: { author, content, createdAt: new Date() } } },
    { new: true }
  );

  if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

  return NextResponse.json(blog.toObject());
}
