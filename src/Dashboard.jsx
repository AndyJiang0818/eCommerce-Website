import React, { Component } from "react";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <h4 className="m-1 p-2">Dashboard</h4>
      </div>
    );
  }

  componentDidMount() {
    document.title = "Dashboard - eCommerce";
  }
}
