import React, { Component } from "react";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "", message: "" };
  }

  render() {
    return (
      <div>
        <h4 className="m-1 p-2 border-bottom">Login</h4>

        <div className="form-group form-row m-1">
          <label className="col-lg-4 m-1">Email: </label>
          <input
            type="text"
            className="form-control"
            value={this.state.email}
            onChange={(event) => {
              this.setState({ email: event.target.value });
            }}
          />
        </div>

        <div className="form-group form-row m-1">
          <label className="col-lg-4 m-1">Password: </label>
          <input
            type="password"
            className="form-control"
            value={this.state.password}
            onChange={(event) => {
              this.setState({ password: event.target.value });
            }}
          />
        </div>

        <div className="text-end m-1">
          {this.state.message}

          <button className="btn btn-primary m-1" onClick={this.onLoginClick}>
            Login
          </button>
        </div>
      </div>
    );
  }

  onLoginClick = async () => {
    let response = await fetch(
      `http://localhost:5000/users?email=${this.state.email}&password=${this.state.password}`,
      { method: "GET" }
    );

    let body = await response.json();

    if (body.length > 0) {
      this.setState({
        message: <span className="text-success m-1">Login Successfully</span>,
      });
    } else {
      this.setState({
        message: <span className="text-danger m-1">Login Failed</span>,
      });
    }
  };
}
