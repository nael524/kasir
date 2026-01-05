import { useState } from "react";
import api from "../api";
import "../styles/adminproduk.css";

const AdminTambahProduk = () => {
  const [form, setForm] = useState({
    nama: "",
    harga: "",
    stok: "",
    tipe: "makanan",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    if (!form.nama || !form.harga || !form.stok || !file) {
      alert("Lengkapi semua data");
      return;
    }

    const formData = new FormData();
    formData.append("nama", form.nama);
    formData.append("harga", form.harga);
    formData.append("stok", form.stok);
    formData.append("tipe", form.tipe);
    formData.append("image", file);

    try {
      setLoading(true);

      await api.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Produk berhasil ditambahkan");

      setForm({
        nama: "",
        harga: "",
        stok: "",
        tipe: "makanan",
      });
      setFile(null);
    } catch (err) {
      console.error("ERROR TAMBAH PRODUK:", err);
      alert("❌ Gagal simpan produk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2>Tambah Produk</h2>

        <input
          name="nama"
          placeholder="Nama Produk"
          value={form.nama}
          onChange={handleChange}
        />

        <input
          name="harga"
          placeholder="Harga"
          type="number"
          value={form.harga}
          onChange={handleChange}
        />

        <input
          name="stok"
          placeholder="Stok"
          type="number"
          value={form.stok}
          onChange={handleChange}
        />

        <select
          name="tipe"
          value={form.tipe}
          onChange={handleChange}
        >
          <option value="makanan">Makanan</option>
          <option value="minuman">Minuman</option>
        </select>

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
