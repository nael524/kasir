import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const AdminPesanan = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, "orders"));
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetch();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Pesanan Masuk</h2>

      {orders.map((o) => (
        <div key={o.id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <p>Total: Rp {o.total}</p>
          {o.items.map((i) => (
            <p key={i.id}>
              {i.nama} x {i.qty}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AdminPesanan;
