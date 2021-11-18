import React, { Component } from "react";
import NavBar from "./NavBar";
import Login from "./Login";
import CustomersList from "./CustomersList";
import ShoppingCart from "./ShoppingCart";
import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import NoMatchPage from "./NoMatchPage";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<CustomersList />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/*" element={<NoMatchPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
