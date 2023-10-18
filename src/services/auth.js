import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { createUserProfile } from "./user";

const ERROR_MAP = {
  "auth/wrong-password": "El password es incorrecto.",
};

let userData = {
  id: null,
  email: null,
};
let observers = [];

if (localStorage.getItem("userData")) {
  userData = JSON.parse(localStorage.getItem("userData"));
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    userData = {
      id: user.uid,
      email: user.email,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
  } else {
    userData = {
      id: null,
      email: null,
    };
    localStorage.removeItem("userData");
  }
  notifyAll();
});

/**
 *
 * @param {{email: string, password: string,}} userData
 * @returns {Promise}
 */

export async function register({ username, email, password }) {
  try {
    const userDoc = await createUserWithEmailAndPassword(auth, email, password);
    return createUserProfile(userDoc.user.uid, { username, email });
  } catch (error) {
    throw new Error(ERROR_MAP[error.code] || error.message);
  }
}

/**
 *
 * @param {{email: string, password: string}} user
 * @returns {Promise}
 */

export async function login({ email, password }) {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return { ...userData };
  } catch (error) {
    throw new Error(ERROR_MAP[error.code] || error.message);
  }
}

/**
 *
 * @returns {Promise}
 */
export async function logout() {
  return signOut(auth);
}

/**
 *
 * @param {({id: null|string, email: null|string, username: null|string}) => void} callback
 * @return {() => void} Función para cancelar la suscripción.
 */
export function subscribeToAuth(callback) {
  observers.push(callback);

  console.log("[auth.js] Observer agregado. El stack es: ", observers);

  notify(callback);

  return () => {
    observers = observers.filter((obs) => obs !== callback);
  };
}

/**
 *
 * @param {({id: null|string, email: null|string}) => void} callback
 */
function notify(callback) {
  callback({
    ...userData,
  });
}

/**
 *
 */
function notifyAll() {
  observers.forEach((callback) => notify(callback));
}

//UPDATE PASSWORD

/**
 *
 * @param {password: string} user
 * @returns {Promise}
 */

export async function handleChangePassword(newPassword) {
  try {
    const user = auth.currentUser; // Obtener el usuario actualmente autenticado
    await updatePassword(user, newPassword); // Actualizar la contraseña del usuario
    console.log("Contraseña actualizada exitosamente.");
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    throw error; // Propagar el error para manejarlo adecuadamente en el componente
  }
}
