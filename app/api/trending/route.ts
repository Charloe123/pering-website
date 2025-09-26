import { NextResponse } from "next/server";
import connect from "@/db";
import trending from "@/models/trending";

export const GET = async () => {
  try {
    await connect();
    const trendings = await trending.find({});
    return new NextResponse(JSON.stringify(trendings), { status: 200 });
  } 
  
  catch (error) {
    return new NextResponse("Error fetching trendings" + error, {
      status: 500,
    });
  }
}
