import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../App.css";

const ITEMS_PER_PAGE = 6;

const List = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedMenu = localStorage.getItem("menuItems");
    if (storedMenu) {
      const parsedMenu = JSON.parse(storedMenu);
      setMenuItems(parsedMenu);
      setFilteredItems(parsedMenu);
    }
  }, []);

  const addToCart = (item) => {
    localStorage.setItem("selectedItem", JSON.stringify(item));
    navigate(`/menu-details/${item.id}`);
  };

  const categories = [
    "All", "Basics", "Soups", "Salads", "Starters", "Dry Starters",
    "Maincourse", "Desserts", "Mocktails & Beverages", "Chinese",
    "Western", "North Indian Gravy", "Noodles", "Indian Street Food",
    "South Indian", "Seafood", "Vegan & Healthy", "Italian"
  ];

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    let filtered = category === "All" ? menuItems : menuItems.filter((item) => item.category === category);
    filtered = filtered.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    let filtered = menuItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }
    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="container-fluid py-3 custom-bg-ylw text-light min-vh-100">
      <div className="container mt-3">
        <div className="row">
          {/* Left Sidebar (Search & Categories) */}
          <div className="col-md-3">
            {/* Search Bar - Positioned Slightly Higher */}
            <div className="mb-4">
              <label className="text-dark fw-bold"></label>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control "
                  placeholder="Search menu..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
                {/* <button className="btn btn-warning">
                  <FaSearch />
                </button> */}
              </div>
            </div>

            {/* GAP BETWEEN SEARCH & CATEGORY - Yellow background visible */}
            <div className="mb-3"></div>

            {/* Categories - Separate Div */}
            <div className="p-3 bg-light rounded shadow-sm">
              <h5 className="text-dark">Categories</h5>
              <ul className="list-group">
                {categories.map((category) => (
                  <li
                    key={category}
                    className={`list-group-item ${selectedCategory === category ? "active" : ""}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => filterByCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side - Sorted & Filtered Menu Items */}
          <div className="col-md-9">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <div key={item.id} className="col text-center">
                    <div className="card p-3 shadow-sm">
                      <img src={item.image} alt={item.name} className="img-fluid rounded" />
                      <h5 className="mt-2 text-dark">{item.name}</h5>
                      <p className="text-secondary">{item.description}</p>
                      <h6 className="text-success">₹{(parseFloat(item.price) || 0).toFixed(2)}</h6>
                      <button className="btn btn-danger mt-2" onClick={() => addToCart(item)}>
                        <FaShoppingCart className="me-2" /> View Details
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-dark">No items available in this category.</p>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                <button
                  className="btn btn-warning"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Previous
                </button>
                <span className="text-dark">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-warning"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
