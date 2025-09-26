import mongoose from "mongoose";

const MONGODB_URI ="mongodb+srv://charlottencube233_db_user:vCtuddEbISPL0itv@cluster0.pahu2zm.mongodb.net/Pering?retryWrites=true&w=majority&appName=Cluster0" ;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}


declare global {

  var mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}


let cached = globalThis.mongooseCache;

if (!cached) {
  cached = globalThis.mongooseCache = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
