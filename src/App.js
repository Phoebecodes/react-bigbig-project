import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  AboutPage,
  AuthWrapper,
  CartPage,
  CheckoutPage,
  ErrorPage,
  HomePage,
  PrivateRoute,
  ProductsPage,
  SingleProductPage,
  SharedLayout,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productID" element={<SingleProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/checkout"
            element={<PrivateRoute>{<CheckoutPage />}</PrivateRoute>}
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
