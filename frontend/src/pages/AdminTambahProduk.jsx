import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/adminproduk.css";

const AdminTambahProduk = () => {
  const location = useLocation();
  const paramTipe = new URLSearchParams(location.search).get("tipe");

  const [form, setForm] = useState({
    nama: "",
    harga: "",
    stok: "",
    tipe: "makanan",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (paramTipe) {
      setForm((f) => ({ ...f, tipe: paramTipe }));
    }
  }, [paramTipe]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ===============================
     SUBMIT FINAL (API MYSQL)
  ================================ */
  const submit = () => {
    if (!form.nama || !form.harga || !form.stok || !file) {
      alert("Lengkapi semua data!");
      return;
    }

    setLoading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const res = await fetch("http://localhost:3000/produk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nama: form.nama,
            harga: Number(form.harga),
            stok: Number(form.stok),
            tipe: form.tipe,
            img: reader.result, // WAJIB img
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Gagal menyimpan produk");
          setLoading(false);
          return;
        }

        alert("Produk berhasil ditambahkan!");

        setForm({
          nama: "",
          harga: "",
          stok: "",
          tipe: paramTipe || "makanan",
        });
        setFile(null);
      } catch (err) {
        console.error(err);
        alert("Server tidak merespon");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2>Tambah Produk</h2>

        <label>Tipe Produk</label>
        <select name="tipe" value={form.tipe} onChange={handleChange}>
          <option value="makanan">Makanan</option>
          <option value="minuman">Minuman</option>
        </select>

        <input
          name="nama"
          placeholder="Nama Produk"
          value={form.nama}
          onChange={handleChange}
        />

        <input
          name="harga"
          type="number"
          placeholder="Harga"
          value={form.harga}
          onChange={handleChange}
        />

        <input
          name="stok"
          type="number"
          placeholder="Stok"
          value={form.stok}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={submit} disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan Produk"}
        </button>
      </div>
    </div>
  );
};

export default AdminTambahProduk;
