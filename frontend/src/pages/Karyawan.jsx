import Home from "./Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import "../styles/Karyawan.css";

const Karyawan = () => {
  const dataKaryawan = [
    { id: 1, nama: "Natanael H.", jabatan: "Admin", email: "natanael@mail.com" },
    { id: 2, nama: "Agnes P.", jabatan: "Kasir", email: "agnes@mail.com" },
    { id: 3, nama: "Chania M.", jabatan: "Staff", email: "chania@mail.com" },
  ];

  return (
    <div>
      <Home />
      <div className="navbarsearch">
        <FontAwesomeIcon icon={faUser} />
        <div className="isi">
          <p>
            Karyawan <span>Daftar Karyawan</span>
          </p>
          <p className="namadaftar">Daftar Karyawan</p>
          <button className="btn">
            <FontAwesomeIcon icon={faUserPlus} /> Tambah anggota
          </button>
        </div>
      </div>

      <div className="table-name"></div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Jabatan</th>
              <th>Email</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataKaryawan.map((karyawan, index) => (
              <tr key={karyawan.id}>
                <td>{index + 1}</td>
                <td>{karyawan.nama}</td>
                <td>{karyawan.jabatan}</td>
                <td>{karyawan.email}</td>
                <td>
                  <button className="btn-edit">Edit</button>
                  <button className="btn-delete">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Karyawan;
