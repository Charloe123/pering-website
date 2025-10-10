
import { NextRequest } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

const ADMIN_EMAILS = ["admin@example.com"]; 

export async function requireAdmin(req: NextRequest) {
  await connectDB();

  const userId = req.cookies.get("userId")?.value;
  if (!userId) throw new Error("Not authorized");

  const user = await User.findById(userId);
  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    throw new Error("Not authorized");
  }

  return user;
}
