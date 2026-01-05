import "../styles/Login.css";
import gambar from "../images/logo1.png";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
 const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  // toggle show/hide password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // handle login
  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.username === "" || form.password === "") {
      setError("Oopss...\nTidak Boleh Kosong");
      return;
    }

    // akun statis
    const dummyUser = {
      username: "admin",
      password: "12345",
    };

    if (
      form.username === dummyUser.username &&
      form.password === dummyUser.password
    ) {
      setError("");
       navigate("/das");
    } else {
      setError("Oopss...\nUsarname atau Password kamu salah");
    }
  };

  // loading screen 2 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // auto-hide error 3 detik
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

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

          {/* pesan error */}
          {error && (
            <div className="error-text1"><br/>
              <span className="icon">❌</span><br/>
              <span style={{ whiteSpace: "pre-line" }}>{error}</span>
            </div>
          )}

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
            type="password"
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

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
