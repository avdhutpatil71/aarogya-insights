import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
const dbName = "aaragya-insights";

let client;
let clientPromise;

// ✅ Use one global MongoDB client (works perfectly on Vercel)
async function connectDB() {
  if (!uri) {
    console.error("❌ DATABASE_URL not found in environment variables!");
    throw new Error("Missing DATABASE_URL in environment variables");
  }

  if (!clientPromise) {
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    clientPromise = client.connect();
  }

  return (await clientPromise).db(dbName);
}

// 📘 GET — fetch comments by postId
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json({ error: "Missing postId" }, { status: 400 });
    }

    const db = await connectDB();
    const comments = db.collection("comments");

    const data = await comments.find({ postId }).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

// 📝 POST — add a new comment
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, comment, postId } = body;

    if (!name || !email || !comment || !postId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const db = await connectDB();
    const comments = db.collection("comments");

    const newComment = {
      name,
      email,
      comment,
      postId,
      createdAt: new Date(),
    };

    await comments.insertOne(newComment);

    return NextResponse.json(
      { message: "Comment added", comment: newComment },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error posting comment:", error);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
