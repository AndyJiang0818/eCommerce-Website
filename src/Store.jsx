import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { BrandsService, CategoriesService, ProductsService } from "./Service";
import Product from "./Product";

function Store(props) {
  let userContext = useContext(UserContext);

  let [brands, setBrands] = useState([]);
  let [categories, setCategories] = useState([]);
  let [products, setProducts] = useState([]);
  let [productsToShow, setProductsToShow] = useState([]);
  let [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      let brandsResponse = await BrandsService.fetchBrands();
      let brandsResponseBody = await brandsResponse.json();

      brandsResponseBody.forEach((brands) => {
        brands.isChecked = true;
      });

      setBrands(brandsResponseBody);

      let categoriesResponse = await CategoriesService.fetchCategories();
      let categoriesResponseBody = await categoriesResponse.json();

      categoriesResponseBody.forEach((categories) => {
        categories.isChecked = true;
      });

      setCategories(categoriesResponseBody);

      let productsResponse = await fetch(
        `http://localhost:5000/products?productName_like=${search}`,
        { method: "GET" }
      );

      let productsResponseBody = await productsResponse.json();

      if (productsResponse.ok) {
        productsResponseBody.forEach((products) => {
          products.brands = BrandsService.getBrandByBrandID(
            brandsResponseBody,
            products.brandID
          );

          products.categories = CategoriesService.getCategoryByCategoryID(
            categoriesResponseBody,
            products.categoryID
          );

          products.isOrdered = false;
        });

        setProducts(productsResponseBody);
        setProductsToShow(productsResponseBody);
        document.title = "Store - eCommerce";
      }
    })();
  }, [search]);

  let updateBrandsChecked = (id) => {
    let brandsData = brands.map((brands) => {
      if (brands.id === id) {
        brands.isChecked = !brands.isChecked;
      }

      return brands;
    });

    setBrands(brandsData);
    updateProductsToShow();
  };

  let updateCategoriesChecked = (id) => {
    let categoriesData = categories.map((categories) => {
      if (categories.id === id) {
        categories.isChecked = !categories.isChecked;
      }

      return categories;
    });

    setCategories(categoriesData);
    updateProductsToShow();
  };

  let updateProductsToShow = () => {
    setProductsToShow(
      products
        .filter((products) => {
          return (
            categories.filter(
              (categories) =>
                categories.id === products.categoryID && categories.isChecked
            ).length > 0
          );
        })
        .filter((products) => {
          return (
            brands.filter(
              (brands) => brands.id === products.brandID && brands.isChecked
            ).length > 0
          );
        })
    );
  };

  let onAddClick = (products) => {
    (async () => {
      let newOrder = {
        userID: userContext.user.currentUserID,
        productID: products.id,
        quantity: 1,
        isPaymentCompleted: false,
      };

      let orderResponse = await fetch(`http://localhost:5000/orders`, {
        method: "POST",
        body: JSON.stringify(newOrder),
        headers: { "Content-type": "application/json" },
      });

      if (orderResponse.ok) {
        let orderResponseBody = await orderResponse.json();

        let prods = products.map((products) => {
          if (products.id === products.id) {
            products.isOrdered = true;
          }
          return products;
        });

        setProducts(prods);
        updateProductsToShow();
      }
    })();
  };

  return (
    <div>
      <div className="row py-3 header">
        <div className="col-lg-3">
          <h4>
            <i className="fa fa-shopping-bag"></i> Store{" "}
            <span className="badge bg-secondary">{productsToShow.length}</span>
          </h4>
        </div>

        <div className="col-lg-9">
          <input
            type="search"
            name=""
            id=""
            value={search}
            placeholder="Search Item"
            className="form-control"
            autoFocus="autofocus"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 py-2">
          <div className="my-2">
            <h5>Brands</h5>

            <ul className="list-group list-group-flush">
              {brands.map((brands) => (
                <li className="list-group-item" key={brands.id}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value="true"
                      checked={brands.isChecked}
                      onChange={() => {
                        updateBrandsChecked(brands.id);
                      }}
                      id={`brand${brands.id}`}
                    />

                    <label
                      htmlFor={`brand${brands.id}`}
                      className="form-check-label"
                    >
                      {brands.brandName}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="my-2">
            <h5>Categories</h5>

            <ul className="list-group list-group-flush">
              {categories.map((categories) => (
                <li className="list-group-item" key={categories.id}>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value="true"
                      checked={categories.isChecked}
                      onChange={() => {
                        updateCategoriesChecked(categories.id);
                      }}
                      id={`category${categories.id}`}
                    />

                    <label
                      htmlFor={`category${categories.id}`}
                      className="form-check-label"
                    >
                      {categories.categoryName}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-lg-9 py-2">
          <div className="row">
            {productsToShow.map((products) => (
              <Product
                key={products.id}
                products={products}
                onAddClick={onAddClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
