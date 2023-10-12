/*
¿Cómo vamos a organizar la estructura de los datos para el chat privado?
[C] => Collection
[D] => Document

Primero que nada, vamos a necesitar una collection:

    [C] private-chats

Dentro de esa collection, vamos a crear un documento por cada chat privado entre dos usuarios.

    [C] private-chats {
        [D] idAuto {

        }
    }

Ahora necesitamos guardar dos cosas en ese documento:
a. Qué usuarios son los que participan en el chat.
b. Los mensajes del chat.

Documentación sobre posibilidades para guardar datos en Firestore: 
https://firebase.google.com/docs/firestore/manage-data/structure-data

Para los usuarios, vamos a guardarlos como un objeto dentro del documento. Las claves del objeto 
van a ser los ids de los usuarios, y como valor les asignaremos true.

    {
        [userId1]: true,
        [userId2]: true,
    }

Para los mensajes, que pueden ser infinitos y crecer con el tiempo, vamos a usar una 
subcollection dentro del documetno del chat.

La estructura final que queremos lograr es:

    [C] private-chats {
        [D] idAuto: {
            users: {
                [userId1]: true,
                [userId2]: true,
            }

            [C] messages {
                [D] idAuto: {
                    senderId: userId1,
                    user: email,
                    message: ...,
                    created_at: ...
                }
            }
        }
    }
*/

import {
  addDoc,
  collection,
  DocumentReference,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { dateToFormattedString } from "../helpers/datetime";
import { db } from "./firebase";

/** @type {{}} Las referencias de los documentos del chat privado. */
const privateChatsCache = {};

/**
 *
 * @param {string} senderId
 * @param {string} receiverId
 * @param {{user: string, message: string}} data
 */
export async function sendPrivateChatMessage(senderId, receiverId, data) {
  const privateChatDoc = await getPrivateChatDoc(senderId, receiverId);

  // Una vez que tenemos el documento del chat privado, podemos preparar la referencia para la
  // subcollection de messages, donde pusheamos el nuevo mensaje.
  // Noten que en Firestore para indicar la dependencia de collections y documentos lo hacemos
  // usando una sintaxis de URL.
  const messagesRef = collection(
    db,
    `private-chats/${privateChatDoc.id}/messages`
  );

  return addDoc(messagesRef, {
    ...data,
    senderId,
    created_at: serverTimestamp(),
  });
}

/**
 *
 * @param {string} senderId
 * @param {string} receiverId
 * @param {({}[]) => void} callback
 * @returns {Promise<function>} Función para cancelar la suscripción.
 */
export async function subscribeToPrivateChat(senderId, receiverId, callback) {
  const privateChatDoc = await getPrivateChatDoc(senderId, receiverId);

  const q = query(
    collection(db, `/private-chats/${privateChatDoc.id}/messages`),
    orderBy("created_at")
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        senderId: doc.data().senderId,
        user: doc.data().user,
        message: doc.data().message,
        created_at: dateToFormattedString(doc.data().created_at?.toDate()),
      };
    });

    callback(messages);
  });
}

/**
 * Retorna el documento del chat privado para los usuarios.
 * Si no existe, lo crea.
 *
 * @param {string} senderId
 * @param {string} receiverId
 * @return {Promise<DocumentReference>}
 */
async function getPrivateChatDoc(senderId, receiverId) {
  const cached = getFromCache(senderId, receiverId);
  if (cached) return cached;

  // console.log('[private-chat.js getPrivateChatDoc] Creating/Searching doc');

  const privateChatRef = collection(db, "private-chats");
  const users = { [senderId]: true, [receiverId]: true };

  // Lo primero que hacemos en buscar a ver si existe el documento para esta conversación.
  const q = query(privateChatRef, where("users", "==", users), limit(1));

  const docsSnap = await getDocs(q);

  let privateChatDoc;

  if (docsSnap.empty) {
    privateChatDoc = await addDoc(privateChatRef, {
      users,
    });
  } else {
    privateChatDoc = docsSnap.docs[0];
  }

  setToCache(senderId, receiverId, privateChatDoc);

  return privateChatDoc;
}

function setToCache(senderId, receiverId, value) {
  const key = senderId + receiverId;
  // console.log('[private-chat.js setToCache] Added key ', key, ' with value: ', value);
  privateChatsCache[key] = value;
}

function getFromCache(senderId, receiverId) {
  const key = senderId + receiverId;
  // console.log('[private-chat.js getFromCache] Searching for key ', key);
  // console.log('[private-chat.js getFromCache] Value obtained: ', privateChatsCache[key]);
  return privateChatsCache[key] || null;
}

export async function getPrivateChats() {
  const privateChatsRef = collection(db, "private-chats");
  const querySnapshot = await getDocs(privateChatsRef);

  const chats = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    const users = Object.keys(data.users); // Obtén los IDs de los usuarios
    return {
      id: doc.id,
      users, // Agrega los IDs de los usuarios a la conversación
    };
  });

  return chats;
}
