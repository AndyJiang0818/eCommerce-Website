import React, { Component } from "react";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      fullName: "",
      dateOfBirth: "",
      gender: "",
      country: "",
      receiveNews: false,
      controls: [
        "email",
        "password",
        "fullName",
        "dob",
        "gender",
        "country",
        "receiveNews",
      ],
      errors: {
        email: [],
        password: [],
        fullName: [],
        dob: [],
        gender: [],
        country: [],
        receiveNews: [],
      },
      message: "",
      dirty: {
        email: false,
        password: false,
        fullName: false,
        dob: false,
        gender: false,
        country: false,
        receiveNews: false,
      },
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <h4 className="m-1 p-2">Register</h4>

          <div className="form-group form-row">
            <label className="col-lg-4 col-form-label" htmlFor="email">
              Email:
            </label>
            <div className="col-lg-8">
              <input
                type="text"
                id="email"
                className="form-control"
                autoFocus="autofocus"
                value={this.state.email}
                onChange={(event) => {
                  let dirty = this.state.dirty;
                  dirty.email = true;

                  this.setState(
                    { email: event.target.value, dirty: dirty },
                    this.validate
                  );
                }}
                onBlur={(event) => {
                  let dirty = this.state.dirty;
                  dirty.email = true;

                  this.setState({ dirty: dirty }, this.validate);
                }}
              />

              <div className="text-danger">
                {this.state.errors.email[0] && this.state.dirty.email
                  ? this.state.errors["email"]
                  : ""}
              </div>
            </div>
          </div>

          <div className="form-group form-row">
            <label className="col-lg-4 col-form-label" htmlFor="password">
              Password:
            </label>
            <div className="col-lg-8">
              <input
                type="password"
                id="password"
                className="form-control"
                value={this.state.password}
                onChange={(event) => {
                  let dirty = this.state.dirty;
                  dirty.password = true;

                  this.setState(
                    { password: event.target.value, dirty: dirty },
                    this.validate
                  );
                }}
                onBlur={(event) => {
                  let dirty = this.state.dirty;
                  dirty.password = true;

                  this.setState({ dirty: dirty }, this.validate);
                }}
              />

              <div className="text-danger">
                {this.state.errors.password[0] && this.state.dirty.password
                  ? this.state.errors["password"]
                  : ""}
              </div>
            </div>
          </div>

          <div className="form-group form-row">
            <label className="col-lg-4 col-form-label" htmlFor="fullName">
              Full Name:
            </label>
            <div className="col-lg-8">
              <input
                type="text"
                id="fullName"
                className="form-control"
                value={this.state.fullName}
                onChange={(event) => {
                  let dirty = this.state.dirty;
                  dirty.fullName = true;

                  this.setState(
                    { fullName: event.target.value, dirty: dirty },
                    this.validate
                  );
                }}
                onBlur={(event) => {
                  let dirty = this.state.dirty;
                  dirty.fullName = true;

                  this.setState({ dirty: dirty }, this.validate);
                }}
              />

              <div className="text-danger">
                {this.state.errors.fullName[0] && this.state.dirty.fullName
                  ? this.state.errors["fullName"]
                  : ""}
              </div>
            </div>
          </div>

          <div className="form-group form-row">
            <label className="col-lg-4 col-form-label" htmlFor="dob">
              Date of Birth:
            </label>
            <div className="col-lg-8">
              <input
                type="date"
                id="dob"
                className="form-control"
                value={this.state.dob}
                onChange={(event) => {
                  let dirty = this.state.dirty;
                  dirty.dob = true;

                  this.setState(
                    { dob: event.target.value, dirty: dirty },
                    this.validate
                  );
                }}
                onBlur={(event) => {
                  let dirty = this.state.dirty;
                  dirty.dob = true;

                  this.setState({ dirty: dirty }, this.validate);
                }}
              />

              <div className="text-danger">
                {this.state.errors.dob[0] && this.state.dirty.dob
                  ? this.state.errors["dob"]
                  : ""}
              </div>
            </div>
          </div>

          <div className="form-group form-row">
            <label className="col-lg-4 col-form-label">Gender</label>
            <div className="col-lg-8">
              <div className="form-check">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  className="form-check-input"
                  value="male"
                  checked={this.state.gender === "male" ? true : false}
                  onChange={(event) => {
                    let dirty = this.state.dirty;
                    dirty.gender = true;

                    this.setState({ gender: event.target.value, dirty: dirty });
                  }}
                  onBlur={(event) => {
                    let dirty = this.state.dirty;
                    dirty.gender = true;

                    this.setState({ dirty: dirty });
                  }}
                />

                <label htmlFor="male" className="form-check-label">
                  Male
                </label>
              </div>

              <div className="form-check">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  className="form-check-input"
                  value="female"
                  checked={this.state.gender === "female" ? true : false}
                  onChange={(event) => {
                    let dirty = this.state.dirty;
                    dirty.gender = true;

                    this.setState({ gender: event.target.value, dirty: dirty });
                  }}
                  onBlur={(event) => {
                    let dirty = this.state.dirty;
                    dirty.gender = true;

                    this.setState({ dirty: dirty });
                  }}
                />

                <label htmlFor="female" className="form-check-label">
                  Female
                </label>
              </div>

              <div className="text-danger">
                {this.state.errors.gender[0] && this.state.dirty.gender
                  ? this.state.errors["gender"]
                  : ""}
              </div>
            </div>
          </div>

          <div className="form-group form-row">
            <label htmlFor="country" className="col-lg-4 col-form-label">
              Country
            </label>

            <div
              className="col-lg-8"
              value={this.state.country}
              onChange={(event) => {
                let dirty = this.state.dirty;
                dirty.country = true;

                this.setState(
                  { country: event.target.value, dirty: dirty },
                  this.validate
                );
              }}
              onBlur={(event) => {
                let dirty = this.state.dirty;
                dirty.country = true;

                this.setState({ dirty: dirty });
              }}
            >
              <select className="form-control">
                <option value="">Please Select</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Japan">Japan</option>
              </select>

              <div className="text-danger">
                {this.state.errors.country[0] && this.state.dirty.country
                  ? this.state.errors["country"]
                  : ""}
              </div>
            </div>
          </div>

          <div className="form-group form-row">
            <label className="col-lg-4"></label>
            <div className="col-lg-8">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  value="true"
                  checked={this.state.receiveNews}
                  onChange={(event) => {
                    let dirty = this.state.dirty;
                    dirty.receiveNews = true;

                    this.setState(
                      { receiveNews: event.target.checked, dirty: dirty },
                      this.validate
                    );
                  }}
                  onBlur={(event) => {
                    let dirty = this.state.dirty;
                    dirty.receiveNews = true;

                    this.setState({ dirty: dirty });
                  }}
                  id="receiveNews"
                />
                <label htmlFor="receiveNews" className="form-check-label">
                  Receive Newsletters
                </label>

                <div className="text-danger">
                  {this.state.errors.receiveNews[0] &&
                  this.state.dirty.receiveNews
                    ? this.state.errors["receiveNews"]
                    : ""}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="text-end">{this.state.message}</div>
              <div className="text-end">
                <button
                  className="btn btn-success m-2"
                  onClick={this.onRegisterClick}
                >
                  Register
                </button>
              </div>

              <ul className="text-danger">
                {Object.keys(this.state.errors).map((control) => {
                  if (this.state.dirty[control]) {
                    return this.state.errors[control].map((error) => {
                      return <li key={error}>{error}</li>;
                    });
                  } else {
                    return "";
                  }
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  validate = () => {
    let errors = {};

    const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})/;

    this.state.controls.forEach((control) => {
      errors[control] = [];

      switch (control) {
        case "email":
          if (!this.state[control]) {
            errors[control].push("Email cannot be blank!");
          }

          if (this.state.email) {
            if (!validEmailRegex.test(this.state[control])) {
              errors[control].push("Email is invalid!");
            }
          }
          break;

        case "password":
          if (!this.state[control]) {
            errors[control].push("Password cannot be blank!");
          }

          if (this.state.password) {
            if (!validPasswordRegex.test(this.state[control])) {
              errors[control].push(
                "Password should be 8 to 20 characters long with at least one uppercase, one lowercase, and one digit!"
              );
            }
          }
          break;

        case "fullName":
          if (!this.state[control]) {
            errors[control].push("Name cannot be blank!");
          }
          break;

        case "dob":
          if (!this.state[control]) {
            errors[control].push("Date of birth cannot be blank!");
          }

          if (this.state[control]) {
            let dob = new Date(this.state[control]).getTime();
            let today = new Date().getTime();

            if (today - 18 * 365.25 * 24 * 60 * 60 * 1000 < dob) {
              errors[control].push("You must be at least 18 years old!");
            }
          }
          break;

        case "gender":
          if (!this.state[control]) {
            errors[control].push("Gender cannot be blank!");
          }
          break;

        case "country":
          if (!this.state[control]) {
            errors[control].push("Country cannot be blank!");
          }
          break;

        default:
          break;
      }
    });

    this.setState({ errors });
  };

  isValid = () => {
    let valid = true;

    for (let control in this.state.errors) {
      if (this.state.errors[control].length > 0) {
        valid = false;
      }
    }

    return valid;
  };

  onRegisterClick = async () => {
    let dirty = this.state.dirty;

    Object.keys(dirty).forEach((control) => {
      dirty[control] = true;
    });

    this.setState({ dirty: dirty });

    this.validate();

    if (this.isValid()) {
      let user = {
        email: this.state.email,
        password: this.state.password,
        fullName: this.state.fullName,
        dob: this.state.dob,
        gender: this.state.gender,
        country: this.state.country,
        receiveNews: this.state.receiveNews,
      };

      let response = await fetch("http://localhost:5000/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json",
        },
      });

      let body = await response.json();

      if (response.ok) {
        this.setState({
          message: (
            <span className="text-success">Successfully Registered!</span>
          ),
        });
      } else {
        this.setState({
          message: <span className="text-danger">Registration Failed!</span>,
        });
      }
    } else {
      this.setState({ message: "Invalid" });
    }
  };
}
