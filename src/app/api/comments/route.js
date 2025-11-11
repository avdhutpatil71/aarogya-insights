import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);
const dbName = "aaragya-insights";

// 📘 Get Comments for a Blog
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    await client.connect();
    const db = client.db(dbName);
    const comments = db.collection("comments");

    const data = await comments
      .find({ postId })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  } finally {
    await client.close();
  }
}

// 📝 Post a New Comment
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, comment, postId } = body;

    if (!name || !email || !comment || !postId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await client.connect();
    const db = client.db(dbName);
    const comments = db.collection("comments");

    const newComment = {
      name,
      email,
      comment,
      postId,
      createdAt: new Date(),
    };

    await comments.insertOne(newComment);
    return NextResponse.json({ message: "Comment added", comment: newComment }, { status: 201 });
  } catch (error) {
    console.error("Error posting comment:", error);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  } finally {
    await client.close();
  }
}
