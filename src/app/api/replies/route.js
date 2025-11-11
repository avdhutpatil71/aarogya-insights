import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);
const dbName = "aaragya-insights";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    await client.connect();
    const db = client.db(dbName);
    const replies = db.collection("replies");

    // Get all replies for a given postId
    const data = await replies
      .find({ postId })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching replies:", error);
    return NextResponse.json(
      { error: "Failed to fetch replies" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, comment, parentId, postId } = body;

    if (!name || !comment || !parentId || !postId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await client.connect();
    const db = client.db(dbName);
    const replies = db.collection("replies");

    const newReply = {
      name,
      comment,
      parentId: new ObjectId(parentId),
      postId,
      createdAt: new Date(),
    };

    await replies.insertOne(newReply);

    return NextResponse.json(
      { message: "Reply added successfully", reply: newReply },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error posting reply:", error);
    return NextResponse.json(
      { error: "Failed to post reply" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
