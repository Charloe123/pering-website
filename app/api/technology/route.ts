import { NextResponse } from "next/server";
import connect from "@/db";
import technology from "@/models/technology";

export const GET = async () => {
  try {
    await connect();
    const technologies = await technology.find({});
    return new NextResponse(JSON.stringify(technologies), { status: 200 });
  }

  catch (error) {
    return new NextResponse("Error fetching technologies" + error, {
      status: 500,
    });
  }
}