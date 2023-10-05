import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 *
 * @param {string} id
 * @returns {Promise<{id: string, email: string}>}
 */
export async function getUserProfileById(id) {
  const docRef = await getDoc(doc(db, `users/${id}`));
  return {
    id: docRef.id,
    email: docRef.data().email,
  };
}

/**
 *
 * @param {string} id
 * @param {{email: string}} data
 */
export function createUserProfile(id, { email }) {
  return setDoc(doc(db, `users/${id}`), {
    email,
  });
}
