import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { dateToFormattedString } from "../helpers/datetime.js";

const refChat = collection(db, "private-chats");

/**
 *
 * @param {(messages: {}[]) => null} callback
 * @returns {import("firebase/auth").Unsubscribe}
 */

export function subscribeToChatMessages(callback) {
  const q = query(refChat, orderBy("created_at"));

  return onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map((doc) => {
      return {
        userId: doc.data().userId,
        user: doc.data().user,
        message: doc.data().message,
        created_at: dateToFormattedString(doc.data().created_at?.toDate()),
      };
    });
    callback(messages);
  });
}

/**
 * Graba un mensaje de chat global.
 *
 * @param {{userId: string, user: string, message: string}} data
 * @returns Promise
 */
export function chatSaveMessage(data) {
  data.created_at = serverTimestamp();
  return addDoc(refChat, data);
}
