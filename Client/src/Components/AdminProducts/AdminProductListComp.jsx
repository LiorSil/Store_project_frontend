import React from "react";
import AdminProductItem from "./AdminProductItem.jsx";

const AdminProductsListComp = ({ filter }) => {
  const products = []; // Fetch or pass the products data

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {filteredProducts.map((product) => (
        <AdminProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default AdminProductsListComp;
