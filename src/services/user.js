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
    username: docRef.data().username,
    role: docRef.data().rol,
  };
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

export async function updateUserProfile({ id, username, email }) {
  await setDoc(doc(db, "users", id), {
    username: username,
    email: email,
  });
}
