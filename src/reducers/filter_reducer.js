import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      allProducts: [...action.payload],
      filteredProducts: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filteredProducts } = state;
    let tempProducts = [...filteredProducts];
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    return { ...state, filteredProducts: tempProducts };
  }
  if (action.type === UPDATE_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.payload_name]: action.payload_value,
      },
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { allProducts } = state;
    const { text, company, category, color, price, shipping, max_price } =
      state.filters;
    let tempProducts = [...allProducts];
    if (text) {
      tempProducts = tempProducts.filter((item) =>
        item.name.toLowerCase().startsWith(text)
      );
    }
    if (company !== "all") {
      tempProducts = tempProducts.filter((item) => item.company === company);
    }
    if (category !== "all") {
      tempProducts = tempProducts.filter((item) => item.category === category);
    }
    if (color !== "all") {
      tempProducts = tempProducts.filter((item) => item.colors.includes(color));
    }
    if (price < max_price) {
      tempProducts = tempProducts.filter((item) => item.price < price);
    }
    if (shipping) {
      tempProducts = tempProducts.filter((item) => item.shipping === shipping);
    }
    return { ...state, filteredProducts: tempProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
