import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Add from "./admin/Add";
import List from "./admin/List";
import RestaurantMenu from "./customer/List";
import Cart from "./customer/Cart";   
import Shipping from "./customer/Shipping";
import OrderSuccess from "./customer/OrderSuccess"; 
import Header from "./customer/Header"; 
import Footer from "./customer/Footer"; 
import MenuDetail from "./customer/MenuDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./customer/Login";
function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />  {/* Header appears on all pages */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<RestaurantMenu />} />
            <Route path="/menu-details/:id" element={<MenuDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Login" element={<Login />} />

            <Route path="/add" element={<Add />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/list" element={<List />} />
            <Route path="/orderSuccess" element={<OrderSuccess />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

console.log("App Component Loaded");

export default App;
