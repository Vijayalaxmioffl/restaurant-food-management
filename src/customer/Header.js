import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";


const Header = () => { 
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation(); 

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

  // Logout function with confirmation
  const handleLogout = () => {
    toast.success("Logging out!", {
      position: "top-center",
      autoClose: 2000,
    });
  
    setTimeout(() => {
      localStorage.removeItem("isAuthenticated");
      navigate("/");
    }, 2000); 
  };

  // Hide header on login page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-between align-items-center">
        
        <Link to="/customer/list" className="navbar-brand fw-bold text-warning fs-1">
          Hotel Marriot
        </Link>
        
        <div className="d-flex align-items-center gap-3">
          {/* <Link to="/customer/login" className="btn btn-warning d-flex align-items-center"> 
            <FaUser className="me-2" /> Login / Signup
          </Link> */}
          <button className="btn btn-warning" onClick={() => navigate("/admin/add")}>Admin Login</button>
          
          {/* Cart Button */}
          <Link to="/customer/cart" className="btn btn-warning position-relative">
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Logout Button */}
          <button className="btn btn-warning" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
