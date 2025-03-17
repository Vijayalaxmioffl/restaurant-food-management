import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Header = () => { 
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  // Fetch cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(savedCart.length);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/" className="navbar-brand fw-bold text-warning fs-1">
          Hotel Marriot
        </Link>
        
        {/* Cart, Admin Login & User Login */}
        <div className="d-flex align-items-center gap-3">
          <Link to="/login" className="btn btn-warning d-flex align-items-center"> 
            <FaUser className="me-2" /> Login / Signup
          </Link>
          <button className="btn btn-warning" onClick={() => navigate("/add")}>Admin Login</button>
          <Link to="/cart" className="btn btn-warning position-relative">
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;

