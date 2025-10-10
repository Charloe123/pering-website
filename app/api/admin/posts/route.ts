// app/api/blogs/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET() {
  try {
    await connectDB();

    // Fetch all blogs
    const blogs = await Blog.find({}).lean();

    // Remove duplicates safely by comparing stringified IDs
    const uniqueBlogs = blogs.filter(
      (blog, index, self) =>
        index === self.findIndex((b) => String(b._id) === String(blog._id))
    );

    // Return JSON response with blogs and count
    return NextResponse.json(
      { blogs: uniqueBlogs, count: uniqueBlogs.length },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Error fetching blogs" },
      { status: 500 }
    );
  }
}
