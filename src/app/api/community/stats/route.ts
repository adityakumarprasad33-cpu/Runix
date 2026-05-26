import { NextResponse } from "next/server";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET() {
  try {
    const postsSnap = await getDocs(query(
      collection(db, "community_posts"),
      orderBy("createdAt", "desc")
    ));
    const posts = postsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const usersSnap = await getDocs(collection(db, "users"));
    const users = usersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const commentsSnap = await getDocs(collection(db, "comments"));
    const totalComments = commentsSnap.size;

    const onlineUsers = users.filter((u: any) => u.onlineStatus === "online");

    const categoryCount: Record<string, number> = {};
    posts.forEach((p: any) => {
      const cat = p.category || "general";
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });

    const trending = Object.entries(categoryCount)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 5)
      .map(([category]) => category);

    return NextResponse.json({
      stats: {
        members: users.length,
        posts: posts.length,
        comments: totalComments,
        onlineNow: onlineUsers.length,
      },
      trending,
      activeMembers: users
        .sort(() => Math.random() - 0.5)
        .slice(0, 5)
        .map((u: any) => ({
          name: u.displayName || u.email?.split("@")[0] || "Anonymous",
          online: u.onlineStatus === "online",
        })),
    });
  } catch {
    return NextResponse.json({
      stats: { members: 0, posts: 0, comments: 0, onlineNow: 0 },
      trending: [],
      activeMembers: [],
    });
  }
}
