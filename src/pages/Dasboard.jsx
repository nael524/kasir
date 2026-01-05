import Home from "./Home";
import "../styles/das.css";
import { useEffect, useState } from "react";
import gambar from "../images/logo1.png";
import es from "../images/menu/minum.jpg";
import cro from "../images/menu/Croissant.jpeg";

const Dasboard = () => {
  const [loading, setLoading] = useState(true);

  const [pesanan, setPesanan] = useState(0);
  const [laba, setLaba] = useState(0);
  const [pemasukan, setPemasukan] = useState(0);

  const targetPesanan = 120;
  const targetLaba = 4500000;
  const targetPemasukan = 7800000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 🔥 animasi hitung angka
  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        setPesanan((prev) => (prev < targetPesanan ? prev + 1 : prev));
        setLaba((prev) => (prev < targetLaba ? prev + 50000 : prev));
        setPemasukan((prev) => (prev < targetPemasukan ? prev + 70000 : prev));
      }, 20);

      return () => clearInterval(interval);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="loading-screen">
        <img src={gambar} alt="logo" className="logo-spin" />
      </div>
    );
  }

  return (
    <div>
      <Home />

      <div className="intikotak">
        <div className="kotak">
          Total Pesanan
          <div className="angka">{pesanan}</div>
        </div>

        <div className="kotak1">
          Total Laba
          <div className="angka">Rp {laba.toLocaleString("id-ID")}</div>
        </div>

        <div className="kotak2">
          Pemasukan
          <div className="angka">Rp {pemasukan.toLocaleString("id-ID")}</div>
        </div>
        <div className="stok">
          Stok telaris
          <p></p>
        </div>
        <div className="stok1">Stok Terendah
          <p></p>
        </div>
        <p className="promosi">Promosi
          <p></p>
        </p>
         <div className="promosi1">
          <div className="promosi2">
            <img src={es} alt="Minuman"/>
          </div>
          <div className="promosi3">
            <img src={cro} alt="makanan"/>
          </div>
         </div>
      </div>
    </div>
  );
};

export default Dasboard;
