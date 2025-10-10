// app/api/visits/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Visit from "@/models/Visit";

export async function GET() {
  await connectDB();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let visit = await Visit.findOne({ date: today });
  if (!visit) {
    visit = new Visit({ date: today, count: 0 });
    await visit.save();
  }

  return NextResponse.json({ count: visit.count });
}

export async function POST() {
  await connectDB();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const visit = await Visit.findOneAndUpdate(
    { date: today },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );

  return NextResponse.json({ count: visit.count });
}
