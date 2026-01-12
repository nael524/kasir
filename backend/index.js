import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
const PORT = 3000;

/* ===============================
   MIDDLEWARE
================================ */
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

/* ===============================
   KONEKSI DATABASE
================================ */
const db = mysql.createConnection({
  host: "hopper.proxy.rlwy.net",
  port: 16125,
  user: "root",
  password: "blrrNXtIFrEpCPDkteoKuqwuNHufpvvh",
  database: "railway",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Gagal konek MySQL:", err);
  } else {
    console.log("✅ MySQL Railway terhubung");
  }
});

/* ===============================
   TEST API
================================ */
app.get("/", (req, res) => {
  res.send("API KASIR AKTIF 🚀");
});

/* ===============================
   PRODUK
================================ */

// ➕ TAMBAH PRODUK
app.post("/produk", (req, res) => {
  const { nama, harga, stok, tipe, img } = req.body;

  if (!nama || !harga || !stok || !tipe || !img) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  const sql =
    "INSERT INTO products (nama, harga, stok, tipe, img) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [nama, harga, stok, tipe, img], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal simpan produk" });
    }

    res.json({
      message: "Produk berhasil ditambahkan",
      id: result.insertId,
    });
  });
});

// 📥 AMBIL SEMUA PRODUK
app.get("/produk", (req, res) => {
  db.query("SELECT * FROM products ORDER BY id DESC", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal ambil produk" });
    }
    res.json(data);
  });
});

// ✏️ UPDATE PRODUK
app.put("/produk/:id", (req, res) => {
  const { id } = req.params;
  const { nama, harga, stok, tipe } = req.body;

  const sql =
    "UPDATE products SET nama=?, harga=?, stok=?, tipe=? WHERE id=?";

  db.query(sql, [nama, harga, stok, tipe, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal update produk" });
    }

    res.json({ message: "Produk berhasil diupdate" });
  });
});

// ❌ HAPUS PRODUK
app.delete("/produk/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM products WHERE id=?", [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal hapus produk" });
    }

    res.json({ message: "Produk berhasil dihapus" });
  });
});

/* ===============================
   JALANKAN SERVER
================================ */
app.listen(PORT, () => {
  console.log(`🚀 Server jalan di http://localhost:${PORT}`);
});
