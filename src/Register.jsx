import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

let Register = (props) => {
  let [state, setState] = useState({
    email: "",
    password: "",
    fullName: "",
    dob: "",
    gender: "",
    country: "",
    receiveNews: "",
  });

  let [countries] = useState([
    { id: 1, countryName: "USA" },
    { id: 2, countryName: "UK" },
    { id: 3, countryName: "Japan" },
  ]);

  let [errors, setErrors] = useState({
    email: [],
    password: [],
    fullName: [],
    dob: [],
    gender: [],
    country: [],
    receiveNews: [],
  });

  let [dirty, setDirty] = useState({
    email: false,
    password: false,
    fullName: false,
    dob: false,
    gender: false,
    country: false,
    receiveNews: false,
  });

  let [message, setMessage] = useState("");

  let userContext = useContext(UserContext);

  let validate = () => {
    let errorsData = {};

    const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20})/;

    errorsData.email = [];

    if (!state.email) {
      errorsData.email.push("Email cannot be blank!");
    }

    if (state.email) {
      if (!validEmailRegex.test(state.email)) {
        errorsData.email.push("Email is invalid!");
      }
    }

    errorsData.password = [];

    if (!state.password) {
      errorsData.password.push("Password cannot be blank!");
    }

    if (state.password) {
      if (!validPasswordRegex.test(state.password)) {
        errorsData.password.push(
          "Password must have at least a lowercase letter, a uppercase letter, and a number."
        );
      }
    }

    errorsData.fullName = [];

    if (!state.fullName) {
      errorsData.fullName.push("Full name cannot be blank!");
    }

    errorsData.dob = [];

    if (!state.dob) {
      errorsData.dob.push("Date of birth cannot be blank!");
    }

    if (state.dob) {
      let dob = new Date(state.dob).getTime();
      let today = new Date().getTime();

      if (today - 18 * 365.25 * 24 * 60 * 60 * 1000 < dob) {
        errorsData.dob.push("You must be at least 18 years old!");
      }
    }

    errorsData.gender = [];

    if (!state.gender) {
      errorsData.gender.push("Gender cannot be blank!");
    }

    errorsData.country = [];

    if (!state.country) {
      errorsData.country.push("Country cannot be blank!");
    }

    setErrors(errorsData);
  };

  useEffect(validate, [state]);

  useEffect(() => {
    document.title = "Register-eCommerce";
  }, []);

  let onRegisterClick = async () => {
    let dirtyData = dirty;

    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });

    setDirty(dirtyData);

    validate();

    if (isValid()) {
      let response = await fetch("http://localhost:5000/users", {
        method: "POST",
        body: JSON.stringify({
          email: state.email,
          password: state.password,
          fullName: state.fullName,
          dob: state.dob,
          gender: state.gender,
          country: state.country,
          receiveNews: state.receiveNews,
          role: "user",
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        let responseBody = await response.json();

        userContext.dispatch({
          type: "login",
          payload: {
            currentUserName: responseBody.fullName,
            currentUserID: responseBody.id,
            currentUserRole: responseBody.role,
          },
        });

        setMessage(
          <span className="text-success">Successfully Registered!</span>
        );

        document.location.hash = "/dashboard";
      } else {
        setMessage(<span className="text-danger">Registration Failed!</span>);
      }
    } else {
      setMessage(<span className="text-danger">Registration Failed!</span>);
    }
  };

  let isValid = () => {
    let valid = true;

    for (let control in errors) {
      if (errors[control].length > 0) {
        valid = false;
      }
    }

    return valid;
  };

  return (
    <div className="row">
      <div className="col-lg-6 col-md-7 mx-auto">
        <div className="card border-primary shadow my-2">
          <div className="card-header border-bottom border-primary">
            <h4
              style={{ fontSize: "40px" }}
              className="text-primary text-center"
            >
              Register
            </h4>

            <ul className="text-danger">
              {Object.keys(errors).map((control) => {
                if (dirty[control]) {
                  return errors[control].map((err) => {
                    return <li key={err}>{err}</li>;
                  });
                } else {
                  return "";
                }
              })}
            </ul>
          </div>

          <div className="card-body border-bottom">
            <div className="form-group row mb-3">
              <label className="col-lg-4" htmlFor="email">
                Email:
              </label>

              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  id="email"
                  value={state.email}
                  onChange={(event) => {
                    let state2 = state;
                    state2.email = event.target.value;
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                />

                <div className="text-danger">
                  {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
                </div>
              </div>
            </div>

            <div className="form-group row mb-3">
              <label className="col-lg-4" htmlFor="password">
                Password:
              </label>

              <div className="col-lg-8">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  value={state.password}
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                />

                <div className="text-danger">
                  {dirty["password"] && errors["password"][0]
                    ? errors["password"]
                    : ""}
                </div>
              </div>
            </div>

            <div className="form-group row mb-3">
              <label className="col-lg-4" htmlFor="fullName">
                Full Name:
              </label>

              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  id="fullName"
                  value={state.fullName}
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                />

                <div className="text-danger">
                  {dirty["fullName"] && errors["fullName"][0]
                    ? errors["fullName"]
                    : ""}
                </div>
              </div>
            </div>

            <div className="form-group row mb-3">
              <label className="col-lg-4" htmlFor="dob">
                Date of birth:
              </label>

              <div className="col-lg-8">
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  id="dob"
                  value={state.dob}
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                />

                <div className="text-danger">
                  {dirty["dob"] && errors["dob"][0] ? errors["dob"] : ""}
                </div>
              </div>
            </div>

            <div className="form-group row mb-3">
              <label className="col-lg-4">Gender:</label>

              <div className="col-lg-8">
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="gender"
                    value="male"
                    id="male"
                    checked={state.gender === "male" ? true : false}
                    onChange={(event) => {
                      setState({
                        ...state,
                        [event.target.name]: event.target.value,
                      });
                    }}
                    onBlur={(event) => {
                      setDirty({ ...dirty, [event.target.name]: true });
                      validate();
                    }}
                  />

                  <label htmlFor="male" className="form-check-label">
                    Male
                  </label>
                </div>

                <div className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    id="female"
                    className="form-check-input"
                    checked={state.gender === "female" ? true : false}
                    onChange={(event) => {
                      setState({
                        ...state,
                        [event.target.name]: event.target.value,
                      });
                    }}
                    onBlur={(event) => {
                      setDirty({ ...dirty, [event.target.name]: true });
                      validate();
                    }}
                  />

                  <label htmlFor="female" className="form-check-label">
                    Female
                  </label>
                </div>

                <div className="text-danger">
                  {dirty["gender"] && errors["gender"][0]
                    ? errors["gender"]
                    : ""}
                </div>
              </div>
            </div>

            <div className="form-group row mb-3">
              <label className="col-lg-4" htmlFor="country">
                Country:
              </label>

              <div className="col-lg-8">
                <select
                  className="form-control"
                  name="country"
                  id="country"
                  value={state.country}
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                  }}
                  onBlur={(event) => {
                    setDirty({ ...dirty, [event.target.name]: true });
                    validate();
                  }}
                >
                  <option value="">Please Select</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.countryName}
                    </option>
                  ))}
                </select>

                <div className="text-danger">
                  {dirty["country"] && errors["country"][0]
                    ? errors["country"]
                    : ""}
                </div>
              </div>
            </div>

            <div className="form-group row mb-3">
              <label className="col-lg-4">Subscribe/Unsubscribe:</label>

              <div className="col-lg-8">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="receiveNews"
                    value="true"
                    id="receiveNews"
                    checked={state.receiveNews === true ? true : false}
                    onChange={(event) => {
                      setState({
                        ...state,
                        [event.target.name]: event.target.checked,
                      });
                    }}
                    onBlur={(event) => {
                      setDirty({ ...dirty, [event.target.name]: true });
                      validate();
                    }}
                  />

                  <label htmlFor="male" className="form-check-label">
                    Receive Newsletters
                  </label>
                </div>
              </div>
            </div>

            <div className="card-footer text-center">
              <div className="m-1">{message}</div>

              <div>
                <button
                  className="btn btn-primary m-2"
                  onClick={onRegisterClick}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
