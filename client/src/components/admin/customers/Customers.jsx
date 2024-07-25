import React from "react";
import MaterialTableComp from "../../../utils/shared/MaterialTable";
import useCustomers from "../../../hooks/admin/customers/useCustomer"; // Adjust the path according to your project structure

const Customers = () => {
  const { columns, data } = useCustomers();

  return (
    <div>
      <MaterialTableComp columns={columns} data={data} />
    </div>
  );
};

export default Customers;
