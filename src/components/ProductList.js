import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filteredProducts, grid_view } = useFilterContext();
  if (filteredProducts.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search...
      </h5>
    );
  }
  if (grid_view) {
    return <GridView products={filteredProducts}></GridView>;
  }
  return <ListView products={filteredProducts}></ListView>;
};

export default ProductList;
