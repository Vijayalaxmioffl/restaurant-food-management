import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
//import Header from "../customer/Header";
const List = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedItem, setEditedItem] = useState({ name: "", image: "", description: "", price: "", category: "" });

  useEffect(() => {
    const storedMenu = localStorage.getItem("menuItems");
    if (storedMenu) {
      setMenuItems(JSON.parse(storedMenu));
    }
  }, []);

  const deleteMenuItem = (id) => {
    const updatedMenu = menuItems.filter((item) => item.id !== id);
    setMenuItems(updatedMenu);
    localStorage.setItem("menuItems", JSON.stringify(updatedMenu));
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditedItem(item);
  };

  const handleEditChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const saveEditedItem = () => {
    const priceAsNumber = parseFloat(editedItem.price);
    if (isNaN(priceAsNumber)) {
      alert("Please enter a valid number for price.");
      return;
    }
  
    const updatedMenu = menuItems.map((item) =>
      item.id === editingId ? { ...editedItem, id: item.id, price: priceAsNumber } : item
    );
    setMenuItems(updatedMenu);
    localStorage.setItem("menuItems", JSON.stringify(updatedMenu));
    setEditingId(null);
  };  

  // Group items by category
  const categories = [...new Set(menuItems.map((item) => item.category || "Uncategorized"))];

  return (
    <div className="custom-bg-ylw min-vh-100 d-flex flex-column">
    <div className="container custom-bg-ylw text-light">
      {/* <Header /> */}
      <h2 className="fw-bold text-center text-dark mb-4">Admin Menu List</h2>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-success" onClick={() => navigate("/admin/add")}>
          Back to Add Menu
        </button>
      </div>

      {categories.length === 0 ? (
        <p className="text-center">No menu items available.</p>
      ) : (
        categories.map((category) => (
          <div key={category} className="mb-4">
            <h3 className="text-warning">{category}</h3>
            <table className="table table-striped table-light">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th> {/* Added category header */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {menuItems
                  .filter((item) => (item.category || "Uncategorized") === category)
                  .map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px" }} />
                      </td>
                      {editingId === item.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={editedItem.name}
                              onChange={handleEditChange}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="description"
                              value={editedItem.description}
                              onChange={handleEditChange}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control"
                              name="price"
                              value={editedItem.price}
                              onChange={handleEditChange}
                            />
                          </td>
                          <td>
                            <select className="form-control" name="category" value={editedItem.category} onChange={handleEditChange}>
                            <option value="Basics">Basics</option>
                            <option value="Soups">Soups</option>
                            <option value="Salads">Salads</option>
                            <option value="Starters">Starters</option>
                            <option value="Dry Starters">Dry Starters</option>
                            <option value="Maincourse">Maincourse</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Mocktails & Beverages">Mocktails & Beverages</option>
                            <option value="Chinese">Chinese</option>
                            <option value="North Indian Gravy">North Indian Gravy</option>
                            <option value="Western">Western</option>
                            <option value="Noodles">Noodles</option>
                            <option value="Indian Street Food">Indian Street Food</option>
                            <option value="South Indian">South Indian</option>
                            <option value="Seafood">Seafood</option>
                            <option value="Vegan & Healthy">Vegan & Healthy</option>
                            <option value="Italian">Italian</option>
                            <option value="Uncategorized">Uncategorized</option>

                            </select>
                          </td>
                          <td>
                            <button className="btn btn-success me-2" onClick={saveEditedItem}>
                              <FaSave /> Save
                            </button>
                            <button className="btn btn-danger" onClick={() => deleteMenuItem(item.id)}>
                              <FaTrash /> Delete
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          {/* <td>₹{item.price.toFixed(2)}</td> */}
                          {/* <td>₹{Number(item.price).toFixed(2)}</td> */}
                          <td>₹{(parseFloat(item.price) || 0).toFixed(2)}</td>
                          <td>{item.category || "Uncategorized"}</td> {/* Display category */}
                          <td>
                            <button className="btn btn-warning me-2" onClick={() => startEditing(item)}>
                              <FaEdit /> Edit
                            </button>
                            <button className="btn btn-danger" onClick={() => deleteMenuItem(item.id)}>
                              <FaTrash /> Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
    </div>
  );
 
};

export default List;
