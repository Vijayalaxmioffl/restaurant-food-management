import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Header from "./Header";

const MenuDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedMenu = JSON.parse(localStorage.getItem("menuItems"));
    const selectedItem = storedMenu?.find((i) => String(i.id) === id);
  
    if (selectedItem) {
      setItem(selectedItem);
    } else {
      navigate("/"); // Redirect if no item found
    }

    // Get initial cart count
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(savedCart.length);
  }, [id, navigate]);

  const addToCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    savedCart.push(item);
    localStorage.setItem("cart", JSON.stringify(savedCart));

    // Update cart count
    setCartCount(savedCart.length);

    // Dispatch a storage event to update the cart icon in Header
    window.dispatchEvent(new Event("storage"));
  };

  if (!item) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container-fluid custom-bg-ylw min-vh-100 py-5">
      {/* <Header cartCount={cartCount} /> Pass updated cart count */}
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side - Image */}
          <div className="col-md-6 text-center">
            <img
              src={item.image}
              alt={item.name}
              className="img-fluid my-5 rounded shadow-lg"
              style={{ maxWidth: "100%", maxHeight: "70%" }}
            />
          </div>

          {/* Right Side - Details */}
          <div className="col-md-6">
            <div className="card p-4 shadow-sm border-0 bg-warning">
              <h2 className="mt-3">{item.name}</h2>
              <p>{item.description}</p>
              <h6 className="text-success">₹{(parseFloat(item.price) || 0).toFixed(2)}</h6>
              <button className="btn btn-primary mt-3" onClick={addToCart}>
                <FaShoppingCart className="me-2" /> Add to Cart
              </button>
              <p className="mt-2">Items in Cart: {cartCount}</p> {/* Optional: Show cart count */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
