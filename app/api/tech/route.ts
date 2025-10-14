import { NextResponse } from "next/server";
import connect from "@/db";
import tech from "@/models/tech"

export const GET = async () => {
  try {
    await connect();
    const techs = await tech.find({});
    return new NextResponse(JSON.stringify(techs), { status: 200 });
  }

  catch (error) {
    return new NextResponse("Error fetching techs" + error, {
      status: 500,
    });
  }
}

export const POST = async (request: Request) => {
  try {
    await connect();
    const body = await request.json();
    const newTech = new tech(body);
    await newTech.save();
    return new NextResponse(JSON.stringify(newTech), { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating tech" + error, {
      status: 500,
    });
  }
}