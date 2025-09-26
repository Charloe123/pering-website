import { NextResponse } from "next/server";
import connect from "@/db";
import daily from "@/models/daily";

export const GET = async () => {
  try {
    await connect();
    const dailys = await daily.find({});
    return new NextResponse(JSON.stringify(dailys), { status: 200 });
  } 
  
  catch (error) {
    return new NextResponse("Error fetching dailys" + error, {
      status: 500,
    });
  }
}
