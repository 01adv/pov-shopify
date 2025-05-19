// // app/api/test/route.ts

// import { db } from "@/lib/firebase";
// import { doc, setDoc } from "firebase/firestore";
// import { NextResponse } from "next/server";

// export async function POST() {
//   try {
//     await setDoc(doc(db, "test2", "sample2"), {
//       test: "Firestore is working with admin",
//       timestamp: new Date().toISOString(),
//     });

//     return NextResponse.json({ message: "Success" }, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// app/api/test/route.ts

import { adminDb, admin } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await adminDb.collection("test2").doc("sample2").set({
      test: "Firestore is working with admin",
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error: any) {
    console.error("Admin Firestore Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
