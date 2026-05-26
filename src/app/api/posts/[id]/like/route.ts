import { NextResponse } from "next/server";
import { doc, updateDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const { userId, liked } = await _request.json();

    const postRef = doc(db, "community_posts", id);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const currentLikes = postSnap.data().likes || 0;

    if (liked) {
      await updateDoc(postRef, {
        likes: currentLikes - 1,
        likedBy: arrayRemove(userId),
      });
    } else {
      await updateDoc(postRef, {
        likes: currentLikes + 1,
        likedBy: arrayUnion(userId),
      });
    }

    const updated = await getDoc(postRef);
    return NextResponse.json({ likes: updated.data()?.likes || 0 });
  } catch {
    return NextResponse.json({ error: "Failed to update like" }, { status: 500 });
  }
}
