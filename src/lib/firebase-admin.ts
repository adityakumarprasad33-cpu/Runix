import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

function base64Decode(str: string): string {
  return Buffer.from(str, "base64").toString("utf-8");
}

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? base64Decode(process.env.FIREBASE_PRIVATE_KEY)
  : undefined;

const apps = getApps();

const app = apps.length
  ? apps[0]
  : initializeApp({
      credential: cert({
        projectId,
        clientEmail: clientEmail || "",
        privateKey: privateKey || "",
      }),
    });

export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);
