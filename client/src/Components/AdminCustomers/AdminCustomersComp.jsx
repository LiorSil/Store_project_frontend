import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData } from "../../Redux/Reducers/userReducer";
import MaterialTableComp from "../Utils/MaterialTableComp";

/**
 * AdminCustomersComp Component
 *
 * Fetches customer data from the Redux store and displays it in a table using MaterialTableComp.
 * It also formats the customer data to include nested tables for products bought by each customer.
 */
const AdminCustomersComp = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsersData());
  }, [dispatch]);

  // Define the columns for the main table and the nested table
  const columns = [
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
  ];

  /**
   * Formats the customer data to include nested tables for products bought
   *
   * @param {Array} customers - Array of customer objects
   * @returns {Array} - Formatted customer data with nested products bought tables
   */
  const formatCustomerData = (customers) => {
    return customers.map((customer) => ({
      fullName: `${customer.firstName} ${customer.lastName}`,
      joinedAt: customer.customerRegisterDate,
      productsBought: customer.productsBought.map((product) => ({
        product: product.product,
        quantity: product.quantity,
        orderDate: product.orderDate,
      })),
    }));
  };

  const formattedData = formatCustomerData(customers);

  return (
    <div>
      <MaterialTableComp columns={columns} data={formattedData} />
    </div>
  );
};

export default AdminCustomersComp;
