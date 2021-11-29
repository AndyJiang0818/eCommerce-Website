import { event } from "jquery";
import React, { Component } from "react";
import history from "./history";

export default class UpdateCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = { name: "", city: "", phone: "", photo: "" };
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <form>
            <h4 className="p-2 border-bottom">Edit Customer</h4>

            <div className="form-group form-row">
              <label className="col-lg-4">Customer Name</label>

              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.name}
                  onChange={(event) => {
                    this.setState({ name: event.target.value });
                  }}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label className="col-lg-4">City</label>

              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.city}
                  onChange={(event) => {
                    this.setState({ city: event.target.value });
                  }}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label className="col-lg-4">Phone</label>

              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.phone}
                  onChange={(event) => {
                    this.setState({ phone: event.target.value });
                  }}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label className="col-lg-4">Photo</label>

              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.photo}
                  onChange={(event) => {
                    this.setState({ photo: event.target.value });
                  }}
                />
              </div>
            </div>

            <div className="p-2 border-top">
              <button
                className="btn btn-success"
                onClick={this.state.onSaveClick}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  componentDidMount = async () => {
    if (this.props.match && this.props.match.id) {
      let id = this.props.match.params.id;

      let response = await fetch(`http://localhost:5000/customers/${id}`, {
        method: "GET",
      });

      let body = await response.json();

      this.setState({
        name: body.name,
        city: body.address.city,
        phone: body.phone,
        photo: body.photo,
      });
    }
  };

  onSaveClick = async (event) => {
    if (this.props.match && this.props.match.id) {
      let id = this.props.match.params.id;

      event.preventDefault();

      let customer = {
        name: this.state.name,
        address: { city: this.state.city },
        phone: this.state.phone,
        photo: this.state.photo,
      };

      let response = await fetch(`http://localhost:5000/customers/${id}`, {
        method: "PUT",
        body: JSON.stringify(customer),
        headers: {
          "Content-type": "application/json",
        },
      });

      let body = await response.json();

      if (body) {
        this.props.history.replace("/customers");
      }
    }
  };
}
