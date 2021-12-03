import React, { useReducer } from "react";
import Login from "./Login";
import Register from "./Register";
import NoMatchPage from "./NoMatchPage";
import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import { HashRouter } from "react-router-dom";
import { Route, Switch, Routes } from "react-router";
import { UserContext } from "./UserContext";
import Store from "./Store";
import ProductsList from "./ProductsList";

let initialUser = {
  isLoggedIn: false,
  currentUserID: null,
  currentUserName: null,
  currentUserRole: null,
};

let reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        isLoggedIn: true,
        currentUserID: action.payload.currentUserID,
        currentUserName: action.payload.currentUserName,
        currentUserRole: action.payload.currentUserRole,
      };

    case "logout":
      return {
        isLoggedIn: false,
        currentUserID: null,
        currentUserName: null,
        currentUserRole: null,
      };

    default:
      return state;
  }
};

function App() {
  let [user, dispatch] = useReducer(reducer, initialUser);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <HashRouter>
        <NavBar />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/store" element={<Store />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="*" element={<NoMatchPage />} />
          </Routes>
        </div>
      </HashRouter>
    </UserContext.Provider>
  );
}

export default App;
