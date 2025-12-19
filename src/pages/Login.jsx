import "../styles/Login.css";
import gambar from "../images/logo1.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // ⬅️ Tambahan state untuk error
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login button
  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.username === "" || form.password === "") {
      setError("⚠️ Username dan Password tidak boleh kosong!");
      return;
    }

    // kalau mau cek username/password benar, bisa tambahkan disini
    setError("");
    alert("Login berhasil!");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <img src={gambar} alt="logo" className="logo-spin" />
      </div>
    );
  }

  return (
    <div className="container-login1">
      <div className="container-login">
        <form onSubmit={handleSubmit}>
          <p className="logo">
            <img src={gambar} alt="logo" />
          </p>

          {/* Pesan Error */}
          {error && <p className="error-text">{error}</p>}

          <input
            type="text"
            placeholder="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          <br />
          <br />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <br />
          <br />

          <label>
            <input
              className="inpot"
              type="checkbox"
              checked={showPassword}
              onChange={handleShowPassword}
            />
            Show Password
          </label>

          <label className="sing">
            <Link to="/reg">Sign Up</Link>
          </label>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
