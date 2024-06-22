import React from "react";
import MaterialTable from "../MaterialTable/MaterialTable";

const OrdersComp = () => {
  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "price", title: "Price" },
  ];

  const data = [
    { id: 1, name: "Product A", price: "$19.99" },
    { id: 2, name: "Product B", price: "$29.99" },
    { id: 3, name: "Product C", price: "$39.99" },
  ];

  return (
    <div>
      <h1>Product List</h1>
      <MaterialTable columns={columns} data={data} />
    </div>
  );
};

export default OrdersComp;
