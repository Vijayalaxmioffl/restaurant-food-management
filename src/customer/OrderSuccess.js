import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { FaCheckCircle } from "react-icons/fa";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const address = JSON.parse(localStorage.getItem("address")) || {};

  // Group items by count
  const itemCounts = cart.reduce((acc, item) => {
    acc[item.id] = acc[item.id] ? { ...item, count: acc[item.id].count + 1 } : { ...item, count: 1 };
    return acc;
  }, {});

  const orderedItems = Object.values(itemCounts);
  const totalItems = cart.length;

  return (
    <div className="custom-bg-ylw min-vh-100 d-flex flex-column">
    <div className="container-fluid custom-bg-ylw px-0 mt-5 text-light text-center">
      {/* Success Icon with Order Message */}
      <div className="d-flex flex-column align-items-center mt-4">
        <FaCheckCircle size={75} color="green" className="mb-2" />
        <h2 className="text-primary">Order Placed Successfully!</h2>
      </div>
      <p className="mt-2 text-dark">Thank you for your order. We will deliver your items soon.</p>
      {/* Ordered Items Table */}
      <h4 className="mt-3 text-dark">Your Ordered Items ({totalItems}):</h4>
      {totalItems > 0 ? (
        <div className="d-flex justify-content-center mt-2">
          <table className="table table-light table-bordered w-50 text-center">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {orderedItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={item.image} alt={item.name} className="rounded" style={{ width: "50px", height: "50px" }} />
                  </td>
                  <td className="align-middle">{item.name}</td>
                  {/* <td className="align-middle">₹{item.price.toFixed(2)}</td> */}
                  <td className="align-middle">₹{(parseFloat(item.price) || 0).toFixed(2)}</td>
                  <td className="align-middle">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-warning mt-3">No items were found in your cart.</p>
      )}

      {/* Address Details */}
      {Object.keys(address).length > 0 && (
        <div className="mt-4 border p-3 rounded bg-dark w-50 mx-auto">
          <h4 className="text-warning">Delivery Address</h4>
          <p className="mb-0"><strong>Name:</strong> {address.name}</p>
          <p className="mb-0"><strong>Phone:</strong> {address.phone}</p>
          <p className="mb-0"><strong>Street:</strong> {address.street}</p>
          <p className="mb-0"><strong>City:</strong> {address.city}</p>
          <p className="mb-0"><strong>Zip Code:</strong> {address.zipcode}</p>
        </div>
      )}

      <button className="btn btn-primary mt-4" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
    </div>
  );
}
