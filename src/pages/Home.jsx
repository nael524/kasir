import "../styles/Home.css";
import gambar from "../images/logo1.png";

const Home = () => {
  return (
    <div className="container-home">
      <div className="logo1">
        <img src={gambar} alt="logo" />
        Kasir Kami
        <div className="search">
          <input
            type="text"
            placeholder="Cari produk..."
            className="search-input"
          />
         </div>
      </div>
    </div>
  );
};

export default Home;
