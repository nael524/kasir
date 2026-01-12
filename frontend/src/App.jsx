import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dasboard from "./pages/Dasboard";
import Menu from "./pages/Menu";
import Promosi from "./pages/Promosi";
import Order from "./pages/Order";
import Karyawan from "./pages/Karyawan";
import History from "./pages/History";
import Profil from "./pages/Profil";
 import AdminTambahProduk from "./pages/AdminTambahProduk";
import Minuman from "./pages/Minuman";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/das" element={<Dasboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/promosi" element={<Promosi />} />
          <Route path="/order" element={<Order />} />
          <Route path="/karyawan" element={<Karyawan />} />
          <Route path="/history" element={<History />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/minum" element={<Minuman />} />
          <Route path="/admin" element={<AdminTambahProduk />} />
         </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
