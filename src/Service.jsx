export const Service = {
  getPreviousOrders: (orders) => {
    return orders.filter((orders) => orders.isPaymentCompleted === true);
  },

  getCart: (orders) => {
    return orders.filter((orders) => orders.isPaymentCompleted === false);
  },
};

export const ProductsService = {
  getProductByProductID: (products, productID) => {
    return products.find((products) => products.id === productID);
  },

  fetchProducts: () => {
    return fetch("http://localhost:5000/products", {
      method: "GET",
    });
  },
};

export const BrandsService = {
  fetchBrands: () => {
    return fetch("http://localhost:5000/brands", {
      method: "GET",
    });
  },

  getBrandByBrandID: (brands, brandID) => {
    return brands.find((brands) => brands.id === brandID);
  },
};

export const CategoriesService = {
  fetchCategories: () => {
    return fetch("http://localhost:5000/categories", {
      method: "GET",
    });
  },

  getCategoryByCategoryID: (categories, categoryID) => {
    return categories.find((categories) => categories.id === categoryID);
  },
};

export const SortService = {
  getSortedArray: (element, sortBy, sortOrder) => {
    if (!element) {
      return element;
    }

    let array = [...element];

    array.sort((a, b) => {
      if (a[sortBy] && b[sortBy]) {
        return (
          a[sortBy].toString().toLowerCase() -
          b[sortBy].toString().toLowerCase()
        );
      } else {
        return 0;
      }
    });

    if (sortOrder === "DESC") {
      array.reverse();

      return array;
    }
  },
};
