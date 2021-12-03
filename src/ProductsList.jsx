import React, { useState, useEffect, useMemo } from "react";
import { BrandsService, CategoriesService, SortService } from "./Service";

function ProductsList(props) {
  let [products, setProducts] = useState([]);
  let [search, setSearch] = useState("");
  let [sortBy, setSortBy] = useState("productName");
  let [sortOrder, setSortOrder] = useState("ASC");
  let [originalProduct, setOriginalProduct] = useState([]);
  let [brands, setBrands] = useState([]);
  let [selectBrand, setSelectBrand] = useState("");

  useEffect(() => {
    (async () => {
      let brandsResponse = await BrandsService.fetchBrands();
      let brandsResponseBody = await brandsResponse.json();

      setBrands(brandsResponseBody);

      let categoriesResponse = await CategoriesService.fetchCategories();
      let categoriesResponseBody = await categoriesResponse.json();

      let productsResponse = await fetch(
        `http://localhost:5000/products?productName_like=${search}&_sort=productName&_order=ASC`,
        { method: "GET" }
      );
      let productsResponseBody = await productsResponse.json();

      productsResponseBody.forEach((products) => {
        products.brand = BrandsService.getBrandByBrandID(
          brandsResponseBody,
          products.brandID
        );

        products.category = CategoriesService.getCategoryByCategoryID(
          categoriesResponseBody,
          products.categoryID
        );
      });

      setProducts(productsResponseBody);
      setOriginalProduct(productsResponseBody);
    })();
  }, [search]);

  let filterProducts = useMemo(() => {
    return originalProduct.filter(
      (prod) => prod.brand.brandName.indexOf(selectBrand) >= 0
    );
  }, [originalProduct, selectBrand]);

  let onSortNameClick = (event, colName) => {
    event.preventDefault();
    setSortBy(colName);

    let negatedSortOrder = sortOrder === "ASC" ? "DESC" : "ASC";
    setSortOrder(negatedSortOrder);
  };

  useEffect(() => {
    setProducts(SortService.getSortedArray(filterProducts, sortBy, sortOrder));
  }, [filterProducts, sortBy, sortOrder]);

  let getColHeader = (colName, displayName) => {
    return (
      <React.Fragment>
        <a
          href="/#"
          onClick={(event) => {
            onSortNameClick(event, colName);
          }}
        >
          {displayName}
        </a>{" "}
        {sortBy === colName && sortOrder === "ASC" ? (
          <i className="fa fa-sort-up"></i>
        ) : (
          ""
        )}
        {sortBy === colName && sortOrder === "DESC" ? (
          <i className="fa fa-sort-down"></i>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="row p-3 header">
          <div className="col-lg-3">
            <h4>
              <i className="fa fa-suitcase"></i> Products{" "}
              <span className="badge bg-secondary">{products.length}</span>
            </h4>
          </div>

          <div className="col-lg-6">
            <input
              type="search"
              placeholder="Search Item"
              className="form-control"
              autoFocus="autofocus"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>

          <div className="col-lg-3">
            <select
              className="form-control"
              value={selectBrand}
              onChange={(event) => {
                setSelectBrand(event.target.value);
              }}
            >
              <option value="">All Brands</option>

              {brands.map((brand) => {
                <option value={brand.brandName} key={brand.id}>
                  {brand.brandName}
                </option>;
              })}
            </select>
          </div>
        </div>
      </div>

      <div className="col-lg-10 mx-auto mb-2">
        <div className="card my-2 shadow">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>{getColHeader("productName", "Product Name")}</th>
                  <th>{getColHeader("price", "Price")}</th>
                  <th>{getColHeader("brand", "Brand")}</th>
                  <th>{getColHeader("category", "Categories")}</th>
                  <th>{getColHeader("rating", "Rating")}</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.productName}</td>
                    <td>${product.price}</td>
                    <td>{product.brand.brandName}</td>
                    <td>{product.category.categoryName}</td>
                    <td>
                      {[...Array(product.rating).keys()].map((n) => {
                        return (
                          <i className="fa fa-star text-warning" key={n}></i>
                        );
                      })}

                      {[...Array(5 - product.rating).keys()].map((n) => {
                        return (
                          <i className="fa fa-star-o text-warning" key={n}></i>
                        );
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;
