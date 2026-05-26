import { NextResponse } from "next/server";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    const q = query(
      collection(db, "community_posts"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ posts: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, category, authorId, authorName } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "community_posts"), {
      title,
      content,
      category: category || "general",
      authorId: authorId || "",
      authorName: authorName || "Anonymous",
      likes: 0,
      likedBy: [],
      commentCount: 0,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ id: docRef.id, success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
