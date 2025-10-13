import { NextResponse } from "next/server";
import connect from "@/db";
import post from "@/models/post";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    await connect();
    const { id } = params;
    const singlePost = await post.findById(id);
    if (!singlePost) {
      return new NextResponse(JSON.stringify({ message: "Post not found" }), { status: 404 });
    }
    return new NextResponse(JSON.stringify(singlePost), { status: 200 });
  } catch (error) {
    return new NextResponse("Error fetching post: " + error, { status: 500 });
  }
};