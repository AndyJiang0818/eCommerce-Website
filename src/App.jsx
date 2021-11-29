import React, { Component } from "react";
import NavBar from "./NavBar";
import Login from "./Login";
import CustomersList from "./CustomersList";
import ShoppingCart from "./ShoppingCart";
import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import NoMatchPage from "./NoMatchPage";
import SideBar from "./SideBar";
import ProductByID from "./ProductByID";
import { HashRouter } from "react-router-dom";
import InsertCustomer from "./InsertCustomer";
import UpdateCustomer from "./UpdateCustomer";
import Registration from "./Registration";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  render() {
    return (
      <HashRouter>
        <NavBar
          isLoggedIn={this.state.isLoggedIn}
          updateIsLoggedInStatus={this.updateIsLoggedInStatus}
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              {this.state.isLoggedIn ? <SideBar /> : ""}
            </div>
            <div className="col-lg-9">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Login
                      updateIsLoggedInStatus={this.updateIsLoggedInStatus}
                    />
                  }
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/customers" element={<CustomersList />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/product/:id" element={<ProductByID />} />
                <Route path="/new-customer" element={<InsertCustomer />} />
                <Route path="/edit-customer/:id" element={<UpdateCustomer />} />
                <Route path="/register" element={<Registration />} />
                <Route path="*" element={<NoMatchPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }

  updateIsLoggedInStatus = (status) => {
    this.setState({ isLoggedIn: status });
  };
}
