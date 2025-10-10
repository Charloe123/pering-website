import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/post";

export async function GET() {
  await connectDB();
  const posts = await Post.find({}).sort({ createdAt: -1 });
  const formatted = posts.map((b) => ({
    _id: b._id.toString(),
    title: b.title,
    author: b.author,
    content: b.content,
    date: b.createdAt.toISOString().split("T")[0],
  }));
  return NextResponse.json(formatted);
}

export async function DELETE(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "No ID provided" }, { status: 400 });

  await Post.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" });
}
