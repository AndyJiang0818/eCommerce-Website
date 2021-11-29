import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CustomersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: "Customers",
      customersCount: 5,
      customers: [],
    };
  }

  render() {
    return (
      <div>
        <h4 className="m-1 p-1">
          {this.state.pageTitle}

          <span className="badge bg-secondary m-2">
            {this.state.customersCount}
          </span>

          <Link to="/new-customer" className="btn btn-primary">
            New Customer
          </Link>
        </h4>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Phone Numbers</th>
              <th>City</th>
              <th>Photo</th>
              <th>Options</th>
            </tr>
          </thead>

          <tbody>{this.getCustomerRow()}</tbody>
        </table>
      </div>
    );
  }

  componentDidMount = async () => {
    document.title = "Customer - eCommerce";

    let response = await fetch("http://localhost:5000/customers", {
      method: "GET",
    });

    if (response.ok) {
      let body = await response.json();

      this.setState({ customers: body, customersCount: body.length });
    } else {
      console.log("Error" + response.status);
    }
  };

  getPhoneToRender = (phone) => {
    if (phone) {
      return phone;
    } else {
      return <div className="bg-warning p-2 text-center">No Phone Number</div>;
    }
  };

  getCustomerRow = () => {
    return this.state.customers.map((customer, index) => {
      return (
        <tr key="customer.id">
          <td>{customer.id}</td>
          <td>{customer.name}</td>
          <td>{this.getPhoneToRender(customer.phone)}</td>
          <td>{customer.address.city}</td>

          <td>
            <img src={customer.photo} alt="Customer" />
            <div>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  this.onChangePictureClick(customer, index);
                }}
              >
                Change Picture
              </button>
            </div>
          </td>

          <td>
            <Link
              to={`/edit-customer/${customer.id}`}
              className="btn btn-info m-2"
            >
              Edit
            </Link>
            <button
              className="btn btn-danger m-2"
              onClick={() => {
                this.onDeleteClick(customer.id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  onChangePictureClick = (customer, index) => {
    let customerArray = this.state.customers;
    customerArray[index].photo = "https://picsum.photos/id/4/100";

    this.setState({ customers: customerArray });
  };

  onDeleteClick = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      let response = await fetch(`http://localhost:5000/customers/${id}`, {
        method: "DELETE",
      });

      let body = await response.json();

      if (response.ok) {
        let allCustomers = [...this.state.customers];

        allCustomers = allCustomers.filter((customer) => {
          return customer.id != id;
        });

        this.setState({ customers: allCustomers });
      }
    }
  };
}
