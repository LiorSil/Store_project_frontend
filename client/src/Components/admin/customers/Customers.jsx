import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAndProductsData } from "../../../redux/reducers/user";
import MaterialTableComp from "../../../utils/shared/MaterialTable";

/**
 * Customers Component
 *
 * Fetches customer data from the Redux store and displays it in a table using MaterialTableComp.
 * It also formats the customer data to include nested tables for products bought by each customer.
 */
const Customers = () => {
  const dispatch = useDispatch();
  const { customers, products } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsersAndProductsData());
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
      joinedAt: new Date(customer.customerRegisterDate).toLocaleDateString(),
      productsBought: customer.productsBought.map((item) => ({
        product:
          products.find((product) => product._id === item.productId)?.title ||
          "Product not found",
        quantity: item.quantity,
        orderDate: new Date(item.orderDate).toLocaleDateString(),
      })),
    }));
  };

  // Format the customer data
  const formattedData = formatCustomerData(customers);

  // Render the table with formatted customer data
  return (
    <div>
      <MaterialTableComp columns={columns} data={formattedData} />
    </div>
  );
};

export default Customers;
