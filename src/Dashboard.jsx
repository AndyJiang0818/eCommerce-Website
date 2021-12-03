import React, { useEffect, useContext, useState, useCallback } from "react";
import { UserContext } from "./UserContext";
import Order from "./Order";
import { Service, ProductsService } from "./Service";

function Dashboard(props) {
  let [orders, setOrders] = useState([]);

  let [showBuyAlert, setShowBuyAlert] = useState(false);

  let [showDeleteAlert, setShowDeleteAlert] = useState(false);

  let userContext = useContext(UserContext);

  let loadData = useCallback(async () => {
    let response = await fetch(
      `http://localhost:5000/orders?userID=${userContext.user.currentUserID}`,
      { method: "GET" }
    );

    if (response.ok) {
      let responseBody = await response.json();

      let productsResponse = await ProductsService.fetchProducts();

      if (productsResponse.ok) {
        let productsResponseBody = await productsResponse.json();

        responseBody.forEach((orders) => {
          orders.products = ProductsService.getProductByProductID(
            productsResponseBody,
            orders.productID
          );
        });

        setOrders(responseBody);
      }
    }
  }, [userContext.user.currentUserID]);

  useEffect(() => {
    document.title = "Dashboard-eCommerce";

    loadData();
  }, [userContext.user.currentUserID, loadData]);

  let onBuyClick = useCallback(
    async (orderID, userID, productID, quantity) => {
      if (window.confirm("Do you want to buy this item?")) {
        let updateOrder = {
          id: orderID,
          userID: userID,
          productID: productID,
          quantity: quantity,
          isPaymentCompleted: true,
        };

        let orderResponse = await fetch(
          `http://localhost:5000/orders/${orderID}`,
          {
            method: "PUT",
            body: JSON.stringify(updateOrder),
            headers: { "Content-type": "application/json" },
          }
        );

        let orderResponseBody = await orderResponse.json();

        if (orderResponse.ok) {
          console.log(orderResponseBody);

          loadData();

          setShowBuyAlert(true);
        }
      }
    },
    [loadData]
  );

  let onDeleteClick = useCallback(
    async (orderID) => {
      if (window.confirm("Are you sure to delete this item?")) {
        let orderResponse = await fetch(
          `http://localhost:5000/orders/${orderID}`,
          {
            method: "DELETE",
          }
        );

        if (orderResponse.ok) {
          let orderResponseBody = await orderResponse.json();

          console.log(orderResponseBody);

          setShowDeleteAlert(true);

          loadData();
        }
      }
    },
    [loadData]
  );

  return (
    <div className="row">
      <div className="col-12 py-3 header">
        <h4>
          <i className="fa fa-dashboard"></i> Dashboard{" "}
          <button className="btn btn-sm btn-info" onClick={loadData}>
            <i className="fa fa-refresh"></i> Refresh
          </button>
        </h4>
      </div>

      <div className="col-12">
        <div className="row">
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-primary border-bottom border-primary">
              <i className="fa fa-shopping-cart"></i> Shopping Cart{" "}
              <span className="badge bg-primary">
                {Service.getCart(orders).length}
              </span>
            </h4>

            {showBuyAlert ? (
              <div className="col-12">
                <div
                  className="alert alert-success alert-dismissible fade show mt-1"
                  role="alert"
                >
                  Your order has been placed.
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
            ) : (
              ""
            )}

            {showDeleteAlert ? (
              <div className="col-12">
                <div
                  className="alert alert-danger alert-dismissible fade show mt-1"
                  role="alert"
                >
                  The item has been deleted from your shopping cart.
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
            ) : (
              ""
            )}

            {Service.getCart(orders).length === 0 ? (
              <div className="text-danger">
                There's no items in your shopping cart.
              </div>
            ) : (
              ""
            )}

            {Service.getCart(orders).map((orders) => {
              return (
                <Order
                  key={orders.id}
                  orderID={orders.id}
                  productID={orders.productID}
                  userID={orders.userID}
                  isPaymentCompleted={orders.isPaymentCompleted}
                  quantity={orders.quantity}
                  productName={orders.products.productName}
                  price={orders.products.price}
                  onBuyClick={onBuyClick}
                  onDeleteClick={onDeleteClick}
                />
              );
            })}
          </div>

          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-info border-bottom border-info">
              <i className="fa fa-history"></i> Order History{" "}
              <span className="badge bg-info">
                {Service.getPreviousOrders(orders).length}
              </span>
            </h4>

            {Service.getPreviousOrders(orders).length === 0 ? (
              <div className="text-danger">
                You have not ordered anything yet.
              </div>
            ) : (
              ""
            )}

            {Service.getPreviousOrders(orders).map((orders) => {
              return (
                <Order
                  key={orders.id}
                  orderID={orders.id}
                  productID={orders.productID}
                  userID={orders.userID}
                  isPaymentCompleted={orders.isPaymentCompleted}
                  quantity={orders.quantity}
                  productName={orders.products.productName}
                  price={orders.products.price}
                  onBuyClick={onBuyClick}
                  onDeleteClick={onDeleteClick}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
