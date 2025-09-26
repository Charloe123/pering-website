
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const userId = url.searchParams.get("userId"); 

    let blogs;
    if (userId) {
      
      blogs = await Blog.find({ author: userId })
        .sort({ createdAt: -1 })
        .populate("author", "username");
    } else {
      
      blogs = await Blog.find().sort({ createdAt: -1 }).populate("author", "username");
    }

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

    if (!authorId) {
      return NextResponse.json({ error: "Author ID is required" }, { status: 400 });
    }

    // Make sure the author exists
    const author = await User.findById(authorId);
    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    const newBlog = new Blog({ title, content, image, author: author._id });
    await newBlog.save();

    // Populate author for response
    await newBlog.populate("author", "username");

    return NextResponse.json(newBlog, { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
