import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import history from "./history";

export default class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-style">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              eCommerce
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                {!this.props.isLoggedIn ? (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/"
                      activeClassName="active"
                    >
                      Login
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}

                {!this.props.isLoggedIn ? (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/register"
                      activeClassName="active"
                    >
                      Register
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}

                {this.props.isLoggedIn ? (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/dashboard"
                      activeClassName="active"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}

                {this.props.isLoggedIn ? (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/customers"
                      activeClassName="active"
                    >
                      Customers
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}

                {this.props.isLoggedIn ? (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/cart"
                      activeClassName="active"
                    >
                      Shopping Cart
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}

                {this.props.isLoggedIn ? (
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="#"
                      onClick={this.onLogoutClick}
                    >
                      Logout
                    </a>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }

  onLogoutClick = (event) => {
    event.preventDefault();

    this.props.updateIsLoggedInStatus(false);

    document.location.hash = "/";
  };
}

// export default NavBar;
