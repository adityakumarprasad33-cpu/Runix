import { NextResponse } from "next/server";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, reason, deviceDetails, experience, interestArea, type } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "applications"), {
      name,
      email,
      reason: reason || "",
      deviceDetails: deviceDetails || "",
      experience: experience || "",
      interestArea: interestArea || "",
      type: type || "early-access",
      status: "pending",
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ id: docRef.id, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    const q = userId
      ? query(collection(db, "applications"), where("userId", "==", userId))
      : collection(db, "applications");
    const snapshot = await getDocs(q);
    const applications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ applications: [] });
  }
}
