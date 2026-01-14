require("dotenv").config(); // WAJIB

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

/* =======================
   DEBUG ENV (CEK RAILWAY)
======================= */
console.log("🔍 ENV CHECK:", {
  MYSQLHOST: process.env.MYSQLHOST,
  MYSQLUSER: process.env.MYSQLUSER,
  MYSQLDATABASE: process.env.MYSQLDATABASE,
  MYSQLPORT: process.env.MYSQLPORT,
  PORT: process.env.PORT,
});

/* =======================
   MIDDLEWARE
======================= */
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   UPLOADS
======================= */
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
app.use("/uploads", express.static(uploadDir));

/* =======================
   MULTER
======================= */
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/* =======================
   DATABASE (RAILWAY)
======================= */
const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT),
  waitForConnections: true,
  connectionLimit: 10,
  ssl: process.env.MYSQLHOST?.includes("railway")
    ? { rejectUnauthorized: false }
    : false,
});

/* TEST DATABASE */
db.getConnection((err, conn) => {
  if (err) {
    console.error("❌ DATABASE ERROR:", err.message);
  } else {
    console.log("✅ DATABASE CONNECTED");
    conn.release();
  }
});

/* =======================
   HEALTH CHECK (WAJIB)
======================= */
app.get("/", (req, res) => {
  res.json({ status: "OK", service: "Kasir API running" });
});

/* =======================
   ROUTES
======================= */
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, rows) => {
    if (err) {
      console.error("SQL ERROR:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
});

app.post("/products", upload.single("gambar"), (req, res) => {
  const { tipe, nama, harga, stok } = req.body;
  const img = req.file?.filename;

  if (!tipe || !nama || !harga || !stok || !img) {
    return res.status(400).json({ error: "Field belum lengkap" });
  }

  const sql =
    "INSERT INTO products (tipe, nama, harga, stok, img) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [tipe, nama, harga, stok, img], (err) => {
    if (err) {
      console.error("SQL ERROR:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({
      message: "Produk berhasil ditambahkan",
      imageUrl: `${req.protocol}://${req.get("host")}/uploads/${img}`,
    });
  });
});

/* =======================
   START SERVER
======================= */
const PORT = process.env.PORT;

if (!PORT) {
  console.error("❌ PORT not provided");
  process.exit(1);
}

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port", PORT);
});
