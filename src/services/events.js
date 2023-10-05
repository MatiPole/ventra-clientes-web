import { db } from "./firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

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
      };
    });
    callback(events);
  });
}
