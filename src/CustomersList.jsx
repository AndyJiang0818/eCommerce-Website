import React, { Component } from "react";

export default class CustomersList extends Component {
  state = {
    pageTitle: "Customers",
    customersCount: 5,
    customers: [
      {
        id: 1,
        name: "Tom",
        phone: "123-456-789",
        address: { city: "NYC" },
        photo: "https://picsum.photos/id/1/100",
      },
      {
        id: 2,
        name: "Jim",
        phone: "123-456-788",
        address: { city: "Chicago" },
        photo: "https://picsum.photos/id/2/100",
      },
      {
        id: 3,
        name: "Kayla",
        phone: null,
        address: { city: "LA" },
        photo: "https://picsum.photos/id/3/100",
      },
    ],
  };

  render() {
    return (
      <div>
        <h4 className="m-1 p-1">
          {this.state.pageTitle}

          <span className="badge bg-secondary m-2">
            {this.state.customersCount}
          </span>

          <button className="btn btn-info" onClick={this.onRefreshClick}>
            Refresh
          </button>
        </h4>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Phone Numbers</th>
              <th>City</th>
              <th>Photo</th>
            </tr>
          </thead>

          <tbody>{this.getCustomerRow()}</tbody>
        </table>
      </div>
    );
  }

  onRefreshClick = () => {
    this.setState({ customersCount: 7 });
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
        </tr>
      );
    });
  };

  onChangePictureClick = (customer, index) => {
    let customerArray = this.state.customers;
    customerArray[index].photo = "https://picsum.photos/id/4/100";

    this.setState({ customers: customerArray });
  };
}
