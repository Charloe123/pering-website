import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    console.log("GET /api/blogs/[id]: id =", id);

    const blog = await Blog.findById(id);
    console.log("Blog found:", !!blog);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { action, userId, content } = await request.json();
    console.log("API POST /api/blogs/[id]:", { id, action, userId, content });

    if (!id || id === "undefined" || !action || !userId) {
      console.log("Missing required fields:", { id, action, userId });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const blog = await Blog.findById(id);
    if (!blog)
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    // Migrate old schema if needed
    if (Array.isArray(blog.likes)) {
      blog.likedBy = [...blog.likes];
      blog.likes = blog.likes.length;
      blog.dislikedBy = Array.isArray(blog.dislikes) ? [...blog.dislikes] : [];
      blog.dislikes = Array.isArray(blog.dislikes) ? blog.dislikes.length : 0;
      await blog.save();
    }

    if (action === "like") {
      if (!blog.likedBy.includes(userId)) {
        blog.likedBy.push(userId);
        if (blog.dislikedBy.includes(userId)) {
          blog.dislikedBy = blog.dislikedBy.filter((u: string) => u !== userId);
        }
      }
      blog.likes = blog.likedBy.length;
      blog.dislikes = blog.dislikedBy.length;
      await blog.save();
      return NextResponse.json({
        liked: blog.likedBy.includes(userId),
        likes: blog.likes,
      });
    } else if (action === "unlike") {
      if (blog.likedBy.includes(userId)) {
        blog.likedBy = blog.likedBy.filter((u: string) => u !== userId);
      }
      blog.likes = blog.likedBy.length;
      blog.dislikes = blog.dislikedBy.length;
      await blog.save();
      return NextResponse.json({
        liked: blog.likedBy.includes(userId),
        likes: blog.likes,
      });
    }

    if (action === "dislike") {
      if (!blog.dislikedBy.includes(userId)) {
        blog.dislikedBy.push(userId);
        if (blog.likedBy.includes(userId)) {
          blog.likedBy = blog.likedBy.filter((u: string) => u !== userId);
        }
      }
      blog.likes = blog.likedBy.length;
      blog.dislikes = blog.dislikedBy.length;
      await blog.save();
      return NextResponse.json({
        disliked: blog.dislikedBy.includes(userId),
        dislikes: blog.dislikes,
      });
    } else if (action === "undislike") {
      if (blog.dislikedBy.includes(userId)) {
        blog.dislikedBy = blog.dislikedBy.filter((u: string) => u !== userId);
      }
      blog.likes = blog.likedBy.length;
      blog.dislikes = blog.dislikedBy.length;
      await blog.save();
      return NextResponse.json({
        disliked: blog.dislikedBy.includes(userId),
        dislikes: blog.dislikes,
      });
    }

    if (action === "comment") {
      if (!content || content.trim() === "") {
        console.log("Invalid content for comment:", content);
        return NextResponse.json(
          { error: "Content is required" },
          { status: 400 }
        );
      }
      const newComment = {
        author: userId,
        content: content.trim(),
        createdAt: new Date(),
      };
      console.log("Adding comment:", newComment);
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { $push: { comments: newComment } },
        { new: true }
      );
      if (!updatedBlog)
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      console.log("Comment added successfully");
      return NextResponse.json(newComment);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error in POST /api/blogs/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
