import React, { Component } from "react";
import Product from "./Product";

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  render() {
    return (
      <div>
        <h4 className="m-1 p-2">Shopping Cart</h4>

        <div className="row">
          {this.state.products.map((product) => {
            return (
              <Product
                key={product.id}
                product={product}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
                onDelete={this.handleDelete}
              >
                <button className="btn btn-primary">Buy Now</button>
              </Product>
            );
          })}
        </div>
      </div>
    );
  }

  componentDidMount = async () => {
    document.title = "Cart - eCommerce";

    let response = await fetch("http://localhost:5000/products", {
      method: "GET",
    });

    let products = await response.json();

    this.setState({ products: products });
  };

  componentDidUpdate() {}

  componentWillUnmount() {}

  componentDidCatch(error, info) {
    localStorage.lastError = `${error}\n${JSON.stringify(info)}`;
  }

  handleIncrement = (product, maxValue) => {
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);

    if (allProducts[index].quantity < maxValue) {
      allProducts[index].quantity++;

      this.setState({ products: allProducts });
    }
  };

  handleDecrement = (product, minValue) => {
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);

    if (allProducts[index].quantity > minValue) {
      allProducts[index].quantity--;

      this.setState({ products: allProducts });
    }
  };

  handleDelete = (product) => {
    let allProducts = [...this.state.products];
    let index = allProducts.indexOf(product);

    if (window.confirm("Are your sure to delete this product?")) {
      allProducts.splice(index, 1);

      this.setState({ products: allProducts });
    }
  };
}
