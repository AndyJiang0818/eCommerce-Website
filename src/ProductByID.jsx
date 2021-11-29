import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ProductByID extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <div className="card m-2">
            <div className="card-body">
              <div className="text-muted">
                Product # {this.state.product.id}
                {/* delete button starts */}
                <span
                  className="pull-right hand-icon"
                  onClick={() => {
                    this.props.onDelete(this.state.product);
                  }}
                >
                  <i className="fa fa-times"></i>
                </span>
                {/* delete button ends */}
              </div>

              <h5 className="pt-2 border-top">
                {this.state.product.productName}
              </h5>

              <div>$ {this.state.product.price}</div>
            </div>
            {/* card body ends here */}

            <div className="card-footer">
              <div className="float-start">
                <span className="badge text-dark">
                  {this.state.product.quantity}
                </span>

                <div className="btn-group">
                  <button
                    className="btn btn-outline-success"
                    onClick={() => {
                      this.props.onIncrement(this.state.product, 10);
                    }}
                  >
                    +
                  </button>

                  <button
                    className="btn btn-outline-success"
                    onClick={() => {
                      this.props.onDecrement(this.state.product, 0);
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
              {/* float-left ends here */}

              <div className="float-end">
                <Link to="/cart" className="btn btn-secondary">
                  Go Back
                </Link>
                {this.props.children}
              </div>
            </div>
            {/* card-footer ends here */}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount = async () => {
    if (this.props.match && this.props.match.id) {
      document.title = `${this.state.product.productName} - eCommerce`;

      let id = this.props.match.params.id;

      let response = await fetch(`http://localhost:5000/products/${id}`, {
        method: "GET",
      });

      let body = await response.json();

      if (body) {
        this.setState({ product: body });
      }
    }
  };
}
