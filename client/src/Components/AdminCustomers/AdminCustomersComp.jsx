import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData } from "../../Redux/Reducers/userReducer";
import MaterialTableComp from "../Utils/MaterialTableComp";

const AdminCustomersComp = () => {
  const dispatch = useDispatch();

  const { customers } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch]);

  const columns = [
    { key: "fullName", title: "Full Name" },
    { key: "joinedAt", title: "Joined At" },
    { key: "productsBought", title: "Products Bought" },
  ];

  const formatCustomerData = (customers) => {
    return customers.map((customer) => ({
      fullName: `${customer.firstName} ${customer.lastName}`,
      joinedAt: customer.customerRegisterDate,
      productsBought: "test",
    }));
  };

  const data = customers.map((customer) => ({
    fullName: `${customer.firstName} ${customer.lastName}`,
    joinedAt: customer.customerRegisterDate,
    productsBought: customer.productsBought[0].product,
  }));

  return (
    <>
      <div>{console.log("customers", customers)}</div>
      <MaterialTableComp columns={columns} data={data} />
    </>
  );
};

export default AdminCustomersComp;
