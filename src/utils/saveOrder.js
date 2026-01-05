import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export const saveOrder = async (cart, total) => {
  if (cart.length === 0) return;

  await addDoc(collection(db, "orders"), {
    items: cart,
    total,
    status: "baru",
    createdAt: new Date(),
  });

  alert("Pesanan disimpan");
};
