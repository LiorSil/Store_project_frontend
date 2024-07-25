// src/hooks/useCustomers.js

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAndProductsData } from "../../../redux/reducers/user"; // Adjust the path according to your project structure

const useCustomers = () => {
  const dispatch = useDispatch();
  const { customers, products } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsersAndProductsData());
  }, [dispatch]);

  const formatCustomerData = useMemo(() => {
    return customers.map((customer) => ({
      fullName: `${customer.firstName} ${customer.lastName}`,
      joinedAt: new Date(customer.customerRegisterDate).toLocaleDateString(),
      productsBought: customer.productsBought.map((item) => ({
        product:
          products.find((product) => product._id === item.productId)?.title ||
          "Product not found",
        quantity: item.quantity,
        orderDate: new Date(item.orderDate).toLocaleDateString(),
      })),
    }));
  }, [customers, products]);

  return {
    columns: [
      { key: "fullName", title: "Full Name" },
      { key: "joinedAt", title: "Joined At" },
      {
        key: "productsBought",
        title: "Products Bought",
        subColumns: [
          { key: "product", title: "Product" },
          { key: "quantity", title: "Quantity" },
          { key: "orderDate", title: "Order Date" },
        ],
      },
    ],
    data: formatCustomerData,
  };
};

export default useCustomers;
