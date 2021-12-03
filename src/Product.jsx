import React, { useState } from "react";

function Product(props) {
  let [products] = useState(props.products);

  return (
    <div className="col-lg-6">
      <div className="card m-1">
        <div className="card-body">
          <h5>
            <i className="fa fa-arrow-right"></i> {props.products.productName}
          </h5>

          <div>${products.price.toFixed(2)}</div>
          <div className="mt-2 text-muted">
            #{products.brands.brandName} #{products.categories.categoryName}
          </div>

          <div>
            {[...Array(products.rating).keys()].map((n) => {
              return <i className="fa fa-star text-warning" key={n}></i>;
            })}

            {[...Array(5 - products.rating).keys()].map((n) => {
              return <i className="fa fa-star-o text-warning" key={n}></i>;
            })}
          </div>

          <div className="float-end">
            {products.isOrdered ? (
              <span className="text-primary">Added to Cart!</span>
            ) : (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  props.onAddClick(products);
                }}
              >
                <i className="fa fa-shopping-cart"></i> Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
