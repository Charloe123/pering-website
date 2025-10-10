import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import User from "@/models/User";


export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("author", "username email")
      .populate("comments.author", "username email");

    return NextResponse.json(blogs, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    await connectDB();
    const { title, content, image, authorId } = await req.json();

    if (!title || !content || !authorId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const author = await User.findById(authorId);
    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    const newBlog = new Blog({
      title,
      content,
      image,
      author: author._id,
    });

    await newBlog.save();

    const populatedBlog = await Blog.findById(newBlog._id)
      .populate("author", "username email");

    return NextResponse.json(populatedBlog, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
