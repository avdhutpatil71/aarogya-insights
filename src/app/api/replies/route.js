import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const dbName = "aaragya-insights";

async function getClient() {
  const uri = process.env.DATABASE_URL;

  if (!uri) {
    throw new Error("DATABASE_URL is not defined");
  }

  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

// GET replies
export async function GET(request) {
  let client;

  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "postId is required" },
        { status: 400 }
      );
    }

    client = await getClient();
    const db = client.db(dbName);
    const replies = db.collection("replies");

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
    if (client) await client.close();
  }
}

// POST reply
export async function POST(request) {
  let client;

  try {
    const body = await request.json();
    const { name, comment, parentId, postId } = body;

    if (!name || !comment || !parentId || !postId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    client = await getClient();
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
    if (client) await client.close();
  }
}
