import React from "react";
import { BrowserRouter as Router, Routes, Route   } from "react-router-dom";
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
        <Header />  
        <main className="flex-grow-1">
          <Routes>
            {/* Customer Routes */}
            <Route path="/customer/shipping" element={<Shipping />} />
            <Route path="/customer/orderSuccess" element={<OrderSuccess />} />
            <Route path="/customer/list" element={<RestaurantMenu />} />
            <Route path="/customer/menu-details/:id" element={<MenuDetail />} />
            <Route path="/customer/cart" element={<Cart />} />
            <Route path="/" element={<Login />} />
            {/* Admin Routes */}
            <Route path="/admin/add" element={<Add />} />
            <Route path="/admin/list" element={<List />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

console.log("App Component Loaded");

export default App;
