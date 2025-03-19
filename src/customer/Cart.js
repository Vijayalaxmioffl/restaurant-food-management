import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaCartArrowDown, FaTag, FaTrash, FaLock } from "react-icons/fa";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const shippingCharge = 50; 
  const totalItems = cart.length;
  const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  const finalTotal = (parseFloat(totalPrice) + shippingCharge).toFixed(2); // Adding shipping charge

  const updateCartInHeader = () => {
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    updateCartInHeader();
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartInHeader();
  };

  return (
    <div className="container-fluid custom-bg-ylw min-vh-100 py-5">
      <div className="px-0 text-dark text-center">
        <h2>Your Cart</h2>
        {cart.length > 0 ? (
          <div className="d-flex flex-column align-items-center">
            <table className="table table-light table-striped w-50">
              <thead>
                <tr className="cart-table th">
                  <th>Item</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img src={item.image} alt={item.name} style={{ width: "50px", marginRight: "10px" }} />
                      {item.name}
                    </td>
                    <td>₹{(parseFloat(item.price) || 0).toFixed(2)}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => removeItem(index)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex align-items-center mt-3">
              <div className="input-group">
                <span className="input-group-text bg-light">
                  <FaTag className="text-dark" />
                </span>
                <input type="text" className="form-control" placeholder="Coupon Code" />
              </div>
            </div>
            <h6 className="mt-3 text-dark">Total Items: {totalItems}</h6>
            <h6 className="mt-1 text-dark">Items Price: ₹{totalPrice}</h6>
            <h6 className="mt-1 text-danger">Shipping: ₹{shippingCharge}</h6>
            <h6 className="mt-1 text-dark">Final Total: ₹{finalTotal}</h6>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button className="btn btn-success" onClick={() => navigate("/customer/Shipping")}> 
                <FaCreditCard className="me-2" /> Proceed to Pay
              </button>
              <button className="btn btn-danger" onClick={clearCart}>
                <FaCartArrowDown className="me-2" /> Clear Cart
              </button>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button className="btn btn-secondary" onClick={() => navigate("/")}> 
                Back to Menu
              </button>
            </div>
          </div>
        ) : (
          <p>No items in cart</p>
        )}
        
        <div className="mt-4 text-center text-dark">
          <p style={{ fontSize: "1rem" }}>
            <small>By proceeding, I accept the T&C and Privacy Policy.</small><br />
            <FaLock className="me-2" /> <small>Secured by Blaze Web Services</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
