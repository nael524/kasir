import "../styles/Home.css";
import gambar from "../images/logo1.png";
import { FaSearch } from "react-icons/fa";
 import Navbar from "../components/Navbar";
import { use } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container-home">
      <Navbar />
      <div className="logo1">
        <img src={gambar} alt="logo" />
        Kasir Kami
        <div className="search">
          <FaSearch className="icon-search" />

          <input type="text" placeholder="Search" className="search-input" />
          <img className="profil" onClick={()=> navigate("/profil")}/> 
          <span className="nama-user">Natanael</span>

          <div className="containerkotak">
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
