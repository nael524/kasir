import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import db from "./db.js";

dotenv.config();

const app = express();

/* ====== CORS HARUS PALING ATAS ====== */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

/* ====== BODY PARSER ====== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ====== UPLOAD ====== */
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

/* ====== TEST ====== */
app.get("/", (req, res) => {
  res.send("Backend Railway OK ✅");
});

/* ====== API ====== */
app.post("/api/products", upload.single("image"), (req, res) => {
  const { nama, harga, stok, tipe } = req.body;
  const img = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO products (nama, harga, stok, tipe, img)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [nama, harga, stok, tipe, img], (err, result) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json(err);
    }
    res.json({ message: "Produk ditambahkan", id: result.insertId });
  });
});

/* ====== START ====== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
