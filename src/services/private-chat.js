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

import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 *
 * @param {string} senderId
 * @param {string} receiverId
 * @param {{email: string, message: string}} data
 */
export async function sendPrivateChatMessage(senderId, receiverId, data) {
  // Empezamos por crear el documento del chat privado en la collection.
  const privateChatRef = collection(db, "private-chats");

  const privateChatDoc = await addDoc(privateChatRef, {
    users: {
      [senderId]: true,
      [receiverId]: true,
    },
  });

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

export function subscribeToPrivateChat() {}
