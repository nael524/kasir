import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load env
dotenv.config();

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== ROOT CHECK (OPTIONAL) =====
app.get("/", (req, res) => {
  res.send("Kasir API is running 🚀");
});

// ===== REGISTER API =====
app.post("/api/register", (req, res) => {
  const { firstname, lastname, username, password } = req.body;

  // Validasi sederhana
  if (!firstname || !lastname || !username || !password) {
    return res.status(400).json({
      message: "Semua field wajib diisi",
    });
  }

  // (sementara) belum simpan ke DB
  return res.status(201).json({
    message: "Akun anda berhasil dibuat",
    data: {
      firstname,
      lastname,
      username,
    },
  });
});

// ===== 404 HANDLER =====
app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint tidak ditemukan",
  });
});

// ===== SERVER LISTEN (WAJIB RAILWAY) =====
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
