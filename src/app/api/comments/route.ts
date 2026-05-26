import { NextResponse } from "next/server";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  try {
    const q = postId
      ? query(collection(db, "comments"), where("postId", "==", postId))
      : collection(db, "comments");
    const snapshot = await getDocs(q);
    const comments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json({ comments });
  } catch {
    return NextResponse.json({ comments: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { postId, content, authorId, authorName } = body;

    if (!postId || !content) {
      return NextResponse.json(
        { error: "PostId and content are required" },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "comments"), {
      postId,
      content,
      authorId: authorId || "",
      authorName: authorName || "Anonymous",
      likes: 0,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ id: docRef.id, success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
