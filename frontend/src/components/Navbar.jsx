import { Link } from "react-router-dom";
import "../styles/Never.css";
import logo2 from "../images/logo1.png"
const Navbar = () => {
  return (
    <div className="container-navbar">
      <nav>
        <ul>
          <li>
            <Link to="/das">Dasboard</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/karyawan">Karyawan</Link>
          </li>
          <li>
            <Link to="/order">Order</Link>
          </li>
          <li>
            <Link to="/promosi">Promosi</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
          
            <h2><img src={logo2}/></h2>
          
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
