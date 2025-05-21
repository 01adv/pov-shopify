// // app/api/log/route.ts

// import { db } from "@/lib/firebase";
// import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
// import { v4 as uuidv4 } from "uuid";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const { sessionId, userId, logType, data, deviceInfo } = body;

//     if (!sessionId || !logType || !data) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const sessionDocRef = doc(db, "chatbot_logs", sessionId);
//     const logRef = doc(collection(sessionDocRef, logType), uuidv4());

//     // Set session metadata (merge ensures it's not overwritten)
//     await setDoc(
//       sessionDocRef,
//       {
//         user_id: userId || null,
//         session_start: serverTimestamp(),
//         device_info: deviceInfo || {},
//         tags: data.tags || ["chatbot"],
//       },
//       { merge: true }
//     );

//     // Log specific event
//     await setDoc(logRef, {
//       ...data,
//       timestamp: serverTimestamp(),
//     });

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error: any) {
//     console.error("Error logging to Firestore:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// app/api/log/route.ts

// import { adminDb, admin } from "@/lib/firebase-admin";
// import { v4 as uuidv4 } from "uuid";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { sessionId, userId, logType, data, deviceInfo } = body;

//     if (!sessionId || !logType || !data) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const sessionDocRef = adminDb.collection("chatbot_logs").doc(sessionId);
//     const logRef = sessionDocRef.collection(logType).doc(uuidv4());

//     await sessionDocRef.set(
//       {
//         user_id: userId || null,
//         session_start: admin.firestore.FieldValue.serverTimestamp(),
//         device_info: deviceInfo || {},
//         tags: data.tags || ["chatbot"],
//       },
//       { merge: true }
//     );

//     await logRef.set({
//       ...data,
//       timestamp: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     console.error("Error logging to Firestore:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { adminDb, admin } from "@/lib/firebase-admin";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, userId, logType, data, deviceInfo } = body;

    if (!sessionId || !logType || !data) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (logType === "append_conversation") {
      // Handle conversation logging (append to a single document)
      const conversationDocRef = adminDb
        .collection("conversations")
        .doc(sessionId);

      // Check if the conversation document exists
      const conversationDoc = await conversationDocRef.get();

      if (conversationDoc.exists) {
        // Append the new message to the existing messages array
        await conversationDocRef.update({
          messages: admin.firestore.FieldValue.arrayUnion(data.message),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          user_id: userId || null,
          device_info: deviceInfo || {},
          tags: data.tags || ["chatbot", "conversation"],
        });
      } else {
        // Create a new conversation document with the initial message
        await conversationDocRef.set({
          sessionId,
          user_id: userId || null,
          messages: [data.message],
          device_info: deviceInfo || {},
          tags: data.tags || ["chatbot", "conversation"],
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
    } else {
      // Handle other log types (e.g., user_query, recommendation_displayed) as before
      const sessionDocRef = adminDb.collection("chatbot_logs").doc(sessionId);
      const logRef = sessionDocRef.collection(logType).doc(uuidv4());

      // Update session document metadata
      await sessionDocRef.set(
        {
          user_id: userId || null,
          session_start: admin.firestore.FieldValue.serverTimestamp(),
          device_info: deviceInfo || {},
          tags: data.tags || ["chatbot"],
        },
        { merge: true }
      );

      // Store log data in the subcollection
      await logRef.set({
        ...data,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error logging to Firestore:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
