import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import { single_product_url as singleUrl } from "../utils/constants";

import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";
import { FaLessThanEqual } from "react-icons/fa";
import { useResolvedPath } from "react-router-dom";

const initialState = {
  isSidebarOpen: false,
  products: [],
  featuredProducts: [],
  productsLoading: false,
  error: false,
  singleProduct: {},
  singleProductLoading: false,
  singleProductError: false,
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSideBar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSideBar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const fetchProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios(url);
      const data = response.data;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
      console.log(error);
    }
  };

  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios(url);
      const data = response.data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ ...state, openSideBar, closeSideBar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
