import "../styles/Register.css";
import gambar1 from "../images/logo1.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(
      "https://kasirkami-backend.up.railway.app/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          username,
          password,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Register gagal");
    }

    const data = await res.json();
    alert(data.message); // <-- "Akun anda berhasil dibuat"
  } catch (error) {
    alert("Server tidak dapat dihubungi");
    console.error(error);
  }
};



  return (
    <div className="container-register">
      <div className="container-register1">
        <p className="subjudregis">
          Create your Account
          <p className="subregis">Share your artwork and Get project</p>{" "}
        </p>
      </div>

      <form className="buttonsemuaregis" onSubmit={handleSubmit}>
        <p>Sign UP</p>
        <p className="palo">
          Already have an account ? <Link to="/">Log in</Link>
        </p>

        <input
          type="text"
          placeholder="First name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Join us</button>
      </form>
    </div>
  );
};

export default Register;
