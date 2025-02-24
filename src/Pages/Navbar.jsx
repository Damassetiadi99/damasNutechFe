import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SIMS from '../assets/Logo.png';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [token, setToken] = useState(Cookies.get("token"));

  useEffect(() => {
    // Function untuk update token ketika ada perubahan
    const updateToken = () => {
      setToken(Cookies.get("token"));
    };

    // Dengarkan event perubahan token
    window.addEventListener("tokenUpdated", updateToken);

    return () => {
      window.removeEventListener("tokenUpdated", updateToken);
    };
  }, []);

  if (!token) return null; 

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent fixed-top mb-5 border">
      <div className="container">
        <Link className="navbar-brand text-dark fw-medium" to="/menu">
          <img src={SIMS} alt="Icon" style={{ width: '40px', height: '40px', marginRight: '8px' }} />
          SIMS PPOB
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto fw-medium p-4 gap-5">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/topup">Topup</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/transaction">Transaction</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/account">Akun</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
