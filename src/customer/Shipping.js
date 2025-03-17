import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Shipping.css"; // Custom CSS for styling

export default function Shipping() {
  const navigate = useNavigate();
  const [useSameBilling, setUseSameBilling] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "India",
    state: "",
    city: "",
    pincode: "",
    phone: "+91",
    doorNumber: "",
    streetName: "",
    areaName: "",
    landmark: "",
    additionalInfo: "",
  });

  const [billingAddress, setBillingAddress] = useState({
    ...deliveryAddress,
  });

  const stateCityMap = {
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Kanyakumari", 
      "Virudhunagar", "Dindugal", "Cuddalore", "Tirunelveli", "Chengalpattu", 
      "Theni", "Hosur", "Krishnagiri", "Ramanathapuram"],
    "Karnataka": ["Bangalore", "Mysore", "Mangalore"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    "Delhi": ["New Delhi"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Noida"],
    "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  };
  
  const [paymentMethod, setPaymentMethod] = useState("debit");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const states = Object.keys(stateCityMap);
  const [upiId, setUpiId] = useState("");
  const handleSubmit = () => {
    toast("Please check your address before proceeding.", 
      { position: "top-center", autoClose: 3000 });
    setTimeout(() => {
      navigate("/OrderSuccess");
    }, 3000);
  };

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    if (name === "pincode" && (value.length > 6 || isNaN(value))) return;
    if (name === "phone" && (value.length > 13 || isNaN(value.replace('+91', '')))) return;
    setDeliveryAddress({ ...deliveryAddress, [name]: value });
    if (useSameBilling) setBillingAddress({ ...deliveryAddress, [name]: value });
  };

  return (
    <div className="container py-5">
      <div className="row">
        {/* Address Details */}
        <div className="col-md-6">
          <div className="p-3 border rounded shadow-sm bg-light">
            <h5>Delivery Address</h5>
            <input className="form-control form-control-sm mt-2" type="text" name="firstName" placeholder="First Name" value={deliveryAddress.firstName} onChange={handleDeliveryChange} />
            <input className="form-control form-control-sm mt-2" type="text" name="lastName" placeholder="Last Name" value={deliveryAddress.lastName} onChange={handleDeliveryChange} />
            <input className="form-control form-control-sm mt-2" type="email" name="email" placeholder="Email" value={deliveryAddress.email} onChange={handleDeliveryChange} />
            <input className="form-control form-control-sm mt-2" type="text" name="doorNumber" placeholder="Door Number" value={deliveryAddress.doorNumber} onChange={handleDeliveryChange} />
            <input className="form-control form-control-sm mt-2" type="text" name="streetName" placeholder="Street Name" value={deliveryAddress.streetName} onChange={handleDeliveryChange} />
            <input className="form-control form-control-sm mt-2" type="text" name="areaName" placeholder="Area Name" value={deliveryAddress.areaName} onChange={handleDeliveryChange} />
            <select className="form-control form-control-sm mt-2" name="state" value={deliveryAddress.state} onChange={handleDeliveryChange}>
              <option value="">Select State</option>
              {states.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
            <select className="form-control form-control-sm mt-2" name="city" value={deliveryAddress.city} onChange={handleDeliveryChange} disabled={!deliveryAddress.state}>
              <option value="">Select City</option>
              {deliveryAddress.state && stateCityMap[deliveryAddress.state].map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
            <input className="form-control form-control-sm mt-2" type="number" name="pincode" placeholder="Pincode" value={deliveryAddress.pincode} onChange={handleDeliveryChange} maxLength="6" />
            <input className="form-control form-control-sm mt-2" type="text" name="phone" placeholder="Phone Number" value={deliveryAddress.phone} onChange={handleDeliveryChange} maxLength="13" />
            <input className="form-control form-control-sm mt-2" type="text" name="landmark" placeholder="Landmark" value={deliveryAddress.landmark} onChange={handleDeliveryChange} />
            <div className="form-check mt-2">
              <input className="form-check-input" type="checkbox" id="sameBilling" checked={useSameBilling} onChange={() => setUseSameBilling(!useSameBilling)} />
              <label className="form-check-label" htmlFor="sameBilling">Use same address for billing</label>
            </div>
            <button className="btn btn-success mt-3 w-100" onClick={handleSubmit}>Confirm Address </button>

          </div>
        </div>

         {/* Payment Details */}
         <div className="col-md-6">
          <div className="p-3 border rounded shadow-sm bg-light">
            <h5>Payment Information</h5>
            <select className="form-control form-control-sm mt-2" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="debit">Debit Card</option>
              <option value="upi">UPI</option>
              <option value="gpay">Google Pay</option>
              <option value="paytm">Paytm</option>
              <option value="phonepe">PhonePe</option>
            </select>
            {paymentMethod === "debit" && (
              <>
                <input className="form-control form-control-sm mt-2" type="text" name="cardNumber" placeholder="Card Number" value={cardDetails.cardNumber} onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })} />
                <input className="form-control form-control-sm mt-2" type="text" name="expiry" placeholder="Expiry (MM/YY)" value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
                <input className="form-control form-control-sm mt-2" type="text" name="cvv" placeholder="CVV" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
                <input className="form-control form-control-sm mt-2" type="text" name="name" placeholder="Name on Card" value={cardDetails.name} onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })} />
              </>
            )}
            {paymentMethod === "upi" && (
              <input className="form-control form-control-sm mt-2" type="text" name="upiId" placeholder="Enter UPI ID" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
            )}
                  <button className="btn btn-success mt-3 w-100" onClick={handleSubmit}>Proceed to Payment</button>

          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
