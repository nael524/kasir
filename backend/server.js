const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(
  cors({
    origin: "*", // 🔥 PENTING: IZINKAN SEMUA ORIGIN (DEV + PROD)
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   UPLOADS FOLDER
======================= */
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* =======================
   MULTER CONFIG
======================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) =>
    Date.now() +
    "-" +
    Math.round(Math.random() * 1e9) +
    path.extname(file.originalname),
});

const upload = multer({ storage });

/* =======================
   DATABASE
======================= */
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "kasirkami",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL ERROR:", err);
    process.exit(1);
  }
  console.log("Database Connected");
});

/* =======================
   ROUTES
======================= */
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
});

app.post("/products", upload.single("gambar"), (req, res) => {
  const { tipe, nama, harga, stok } = req.body;
  const img = req.file?.filename;

  if (!tipe || !nama || !harga || !stok || !img) {
    return res
      .status(400)
      .json({ error: "Semua field wajib diisi + gambar" });
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
const PORT = process.env.PORT || 8081;

// 🔥 JANGAN PAKAI "localhost" DI PRODUCTION
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
