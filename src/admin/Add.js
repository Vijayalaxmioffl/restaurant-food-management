import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
function Add() {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState(() => {
    const storedMenu = localStorage.getItem("menuItems");
    return storedMenu ? JSON.parse(storedMenu) : [];
  });

  const [newItem, setNewItem] = useState({ name: "", image: "", description: "", price: "", category: "Starters" });

  useEffect(() => {
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
  }, [menuItems]);
     const handleAddDish = () => {
      toast("Item added Successfully.", {
        position: "top-center",
        autoClose: 3500,
        className: "custom-toast",
      });
  
      setTimeout(() => {
        // navigate("/");
      }, 3500); // Delay navigation to let the toast be visible
    };
  const addMenuItem = () => {
    if (!newItem.name || !newItem.image || !newItem.description || !newItem.price || !newItem.category) return;

    const priceAsNumber = parseFloat(newItem.price);
    if (isNaN(priceAsNumber)) {
      alert("Please enter a valid number for price.");
      return;
    }

    const updatedMenu = [...menuItems, {
      ...newItem,
      id: Date.now(),
      price: priceAsNumber // Ensure price is stored as a number
    }];
    setMenuItems(updatedMenu);
    setNewItem({ name: "", image: "", description: "", price: "", category: "Starters" });
  };
  useEffect(() => {
    console.log("Saving to localStorage:", menuItems); // Debugging line
    localStorage.setItem("menuItems", JSON.stringify(menuItems));
  }, [menuItems]);

  return (
    <div className="custom-bg-ylw d-flex flex-column">
      <div className="container text-light  flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h2 className="fw-bold text-dark pt-5 mx-auto">Add Menu Here</h2>
          <button className="btn btn-success" onClick={() => navigate("/")}>
            Back to Home Menu
          </button>
        </div>
        <div className="mb-3 w-50 mx-auto">
          <input className="form-control" type="text" placeholder="Dish Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
          <input className="form-control mt-2" type="text" placeholder="Image URL" value={newItem.image} onChange={(e) => setNewItem({ ...newItem, image: e.target.value })} />
          <input className="form-control mt-2" type="text" placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
          <input className="form-control mt-2" type="number" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })} />

          {/* Dropdown */}
          <select className="form-control mt-2" value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}>
            <option value="Basics">Basics</option> 
            <option value="Starters">Starters</option>
            <option value="Dry Starters">Dry Starters</option>
            <option value="Soups">Soups</option>
            <option value="Salads">Salads</option>
            <option value="Main Course">Main Course</option>
            <option value="Desserts">Desserts</option>
            <option value="Mocktails & Beverages">Mocktails & Beverages</option>
            <option value="Chinese">Chinese</option>
            <option value="Noodles">Noodles</option>
            <option value="North Indian Gravy">North Indian Gravy</option>
            <option value="Indian Street Food">Indian Street Food</option>
            <option value="South Indian">South Indian</option>
            <option value="Seafood">Seafood</option>
            <option value="Vegan & Healthy">Vegan & Healthy</option>
            <option value="Italian">Italian</option>
          </select>
          <div className="d-flex gap-2 mt-3">
          <button className="btn btn-success w-100" onClick={() => {  addMenuItem(); 
             setTimeout(handleAddDish, 500); // Delay calling handleAddDish to ensure state updates
              }}>Add Dish</button>
           
          </div>
          <button className="btn btn-warning w-100 my-2" onClick={() => navigate("/List")}>
          Edit/Delete Menu
            </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );

}

export default Add;
