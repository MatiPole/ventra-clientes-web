import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const refEvents = collection(db, "products");

/**
 * @param {(messages: {}[]) => null} callback
 */

export function subscribeToEvents(callback) {
  const q = query(refEvents, orderBy("name"));

  return onSnapshot(q, (querySnapshot) => {
    const events = querySnapshot.docs.map((doc) => {
      return {
        name: doc.data().name,
        price: doc.data().price,
        description: doc.data().description,
        date: doc.data().date,
        id: doc.id,
      };
    });
    callback(events);
  });
}

export async function createEvent({ name, description, price, date }) {
  await addDoc(collection(db, "products"), {
    name,
    description,
    price,
    date,
  });
}

export async function updateEvent({ id, name, description, price, date }) {
  await setDoc(doc(db, "products", id), {
    name: name,
    price: price,
    description: description,
    date: date,
  });
}

export async function deleteEvent(id) {
  await deleteDoc(doc(db, "products", id));
}

export async function getEventById(id) {
  const evRef = await getDoc(doc(db, `products/${id}`));
  return {
    id: evRef.id,
    name: evRef.data().name,
    price: evRef.data().price,
    description: evRef.data().description,
    date: evRef.data().date,
  };
}
