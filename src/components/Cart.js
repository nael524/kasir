import { useState, useEffect } from "react";

const CART_KEY = "cart";

export const useCart = () => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const tambahKeKeranjang = (item, jumlah) => {
    setCart((prev) => {
      const index = prev.findIndex((i) => i.id === item.id);
      const qtySekarang = index !== -1 ? prev[index].qty : 0;
      const qtyBaru = qtySekarang + jumlah;

      if (qtyBaru > item.stok) {
        alert("Stok tidak cukup!");
        return prev;
      }

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          qty: qtyBaru,
          total: qtyBaru * item.harga,
        };
        return updated;
      }

      return [...prev, { ...item, qty: jumlah, total: jumlah * item.harga }];
    });
  };

  const kurangQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1, total: (item.qty - 1) * item.harga }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const hapusItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalSemua = cart.reduce((sum, item) => sum + item.total, 0);

  return {
    cart,
    tambahKeKeranjang,
    kurangQty,
    hapusItem,
    totalSemua,
  };
};
