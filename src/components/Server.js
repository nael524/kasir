import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// ROUTE REGISTER
app.post("/api/register", (req, res) => {
  const { firstname, lastname, username, password } = req.body;

  if (!firstname || !lastname || !username || !password) {
    return res.status(400).json({
      message: "Data tidak lengkap",
    });
  }

  return res.status(201).json({
    message: "Akun anda berhasil dibuat",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
