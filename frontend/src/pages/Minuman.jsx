import Home from "./Home";
import "../styles/Menu.css";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../components/Cart";

const Minuman = () => {
  const { cart, tambahKeKeranjang, kurangQty, hapusItem, totalSemua } = useCart();
  const navigate = useNavigate();

  const [dataMenu, setDataMenu] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [qty, setQty] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null);

  // 🔥 AMBIL DATA MINUMAN DARI LOCALSTORAGE
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const minuman = products.filter((p) => p.tipe === "minuman");
    setDataMenu(minuman);
  }, []);

  // 🔥 MENUTUP CART JIKA KLIK DI LUAR AREA
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setShowCart(false);
      }
    };

    if (showCart) document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [showCart]);

  return (
    <div className="container-menu">
      <Home />

      <div className="container-menu1">
        <p className="judul">Minuman</p>

        {/* pindah ke Makanan */}
        <button className="btnminum">
          <Link to="/menu">Makanan</Link>
        </button>

        <div className="scroll-makanan">
          {dataMenu.map((item) => (
            <div key={item.id} className="card-menu">
              <img src={item.image} alt={item.nama} />

              <p className="info1">
                {item.nama}
                <br />
                Rp {Number(item.harga).toLocaleString("id-ID")}
              </p>

              <button
                className="btn-tambah"
                onClick={() => {
                  setSelectedItem(item);
                  setQty(1);
                  setShowPopup(true);
                }}
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 TOMBOL TAMBAH PRODUK — AUTOMATIS TIPE MINUMAN */}
      <button
        className="btntambah"
        onClick={() => navigate("/admin?tipe=minuman")}
      >
        +
      </button>
      <p className="tt">Tambah Produk</p>

      {/* 🔥 CART ICON */}
      <button className="btn-cart" onClick={() => setShowCart(!showCart)}>
        🛒
      </button>

      {/* 🔥 POPUP TAMBAH PESANAN */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Tambah Pesanan</h3>

            <div className="samping">
              <p className="popup-nama">{selectedItem.nama}</p>
              <p className="popup-harga">
                Rp {Number(selectedItem.harga).toLocaleString("id-ID")}
              </p>
            </div>

            <div className="qty-box">
              <button onClick={() => qty > 1 && setQty(qty - 1)}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>

            <p className="popup-total">
              Total: Rp{" "}
              {Number(selectedItem.harga * qty).toLocaleString("id-ID")}
            </p>

            <div className="popup-action">
              <button
                className="popup-ya"
                onClick={() => {
                  tambahKeKeranjang(selectedItem, qty);
                  setShowPopup(false);
                }}
              >
                Tambah
              </button>

              <button
                className="popup-batal"
                onClick={() => setShowPopup(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 CART */}
      {showCart && (
        <div className="cart-fixed" ref={cartRef}>
          <h4 className="judulop">Keranjang</h4>

          {cart.length === 0 && <p>Kosong</p>}

          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span className="nama">{item.nama}</span>

              <div className="cart-qty">
                <button onClick={() => kurangQty(item.id)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => tambahKeKeranjang(item, 1)}>+</button>
              </div>

              <span className="harga">
                Rp {item.total.toLocaleString("id-ID")}
              </span>

              <button className="hapus" onClick={() => hapusItem(item.id)}>
                ❌
              </button>
            </div>
          ))}

          <div className="total9">
            <h4 className="total">
              Total:<br />
              Rp {totalSemua.toLocaleString("id-ID")}
            </h4>
            <button>Buat Pesanan</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Minuman;
