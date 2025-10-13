import { NextResponse } from "next/server";
import connect from "@/db";
import shop from "@/models/shop";

export const GET = async () => {
  try {
    await connect();
    const shops = await shop.find({});
    return new NextResponse(JSON.stringify(shops), { status: 200 });
  }

  catch (error) {
    return new NextResponse("Error fetching shops" + error, {
      status: 500,
    });
  }
}

export const POST = async (request: Request) => {
  try {
    await connect();
    const body = await request.json();
    const newShop = new shop(body);
    await newShop.save();
    return new NextResponse(JSON.stringify(newShop), { status: 201 });
  } catch (error) {
    return new NextResponse("Error creating shop" + error, {
      status: 500,
    });
  }
}
