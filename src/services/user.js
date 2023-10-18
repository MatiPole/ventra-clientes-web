import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  collection,
} from "firebase/firestore";
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
    role: docRef.data().role,
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
    role: "client",
  });
}

/**
 *
 * @param {string} id
 * @param {{email: string}} data
 */

export async function updateUserProfile({ id, username, email }) {
  await updateDoc(doc(db, "users", id), {
    username: username,
    email: email,
  });
}

/**
 * Obtiene el ID del usuario con rol de administrador.
 *
 * @returns {Promise<string | null>} - El ID del usuario administrador o null si no se encuentra.
 */

export async function getAdminUserId() {
  try {
    // Paso 1: Obtén el ID del usuario con el rol "admin."
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("role", "==", "admin"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // No se encontraron usuarios con el rol "admin."
      return null;
    }

    // Solo se espera un usuario con el rol "admin," por lo que obtenemos el primer documento.
    const adminUser = querySnapshot.docs[0];
    return adminUser.id;
  } catch (error) {
    console.error("Error al obtener el ID del usuario con rol admin:", error);
    throw error;
  }
}

/**
 *
 * @returns {Promise<{id: string, users: {username: string, email: string, rol: string}}>}
 */

export async function getAllUsers() {
  const usersRef = collection(db, "users");
  const querySnapshot = await getDocs(usersRef);

  const allUsers = querySnapshot.docs.map((doc) => {
    const user = doc.data();
    return {
      id: doc.id,
      user,
    };
  });

  return allUsers;
}
