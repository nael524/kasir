import express from "express";
import db from "./db.js";
import multer from "multer";

const router = express.Router();

// konfigurasi upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ➕ tambah produk
router.post("/", upload.single("image"), (req, res) => {
  const { nama, harga, stok, tipe } = req.body;
  const img = req.file
    ? `http://localhost:5000/uploads/${req.file.filename}`
    : "";

  const sql =
    "INSERT INTO products (nama, harga, stok, tipe, img) VALUES (?,?,?,?,?)";

  db.query(sql, [nama, harga, stok, tipe, img], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

// 📥 ambil produk
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

export default router;
