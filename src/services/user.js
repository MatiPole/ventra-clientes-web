import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 *
 * @param {string} id
 * @returns {Promise<{id: string, email: string, username: string}>}
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
 * @returns {Promise<{username: string}>}
 */

export async function getUsernameById(id) {
  const docRef = await getDoc(doc(db, `users/${id}`));
  return docRef.data().username;
}

/**
 *
 * @param {string} id
 * @param {{email: string}} data
 */
export function createUserProfile(id, { username, email }) {
  return setDoc(doc(db, `users/${id}`), {
    username,
    email,
  });
}
