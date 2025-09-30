import { NextResponse } from "next/server";
import connect from "@/db";
import motivation from "@/models/motivation";

export const GET = async () => {
  try {
    await connect();
    const motivations = await motivation.find({});
    return new NextResponse(JSON.stringify(motivations), { status: 200 });
  } 
  
  catch (error) {
    return new NextResponse("Error fetching motivations" + error, {
      status: 500,
    });
  }
}
