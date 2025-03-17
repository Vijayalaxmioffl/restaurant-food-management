import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ menu }) => { // Menu is passed as a prop dynamically
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenu, setFilteredMenu] = useState([]);
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

  // Filter menu based on search query dynamically
  useEffect(() => {
    if (searchQuery.trim() && Array.isArray(menu)) {
      const results = menu.filter((dish) =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMenu(results);
    } else {
      setFilteredMenu([]);
    }
  }, [searchQuery, menu]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/" className="navbar-brand fw-bold text-warning fs-1">
          Hotel Marriot
        </Link>

        {/* Search Bar */}
        <form className="d-flex position-relative" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-warning" type="submit">
            <FaSearch />
          </button>

          {/* Search Results Dropdown */}
          {filteredMenu.length > 0 && (
            <ul className="list-group position-absolute bg-light mt-2 w-100" style={{ zIndex: 10, top: "100%" }}>
              {filteredMenu.map((dish) => (
                <li
                  key={dish.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => {
                    navigate(`/menu/${dish.id}`);
                    setSearchQuery(""); // Clear input after selection
                    setFilteredMenu([]); // Hide dropdown
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {dish.name}
                </li>
              ))}
            </ul>
          )}
        </form>
       
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
