import { useFetch } from "../Hooks/useFetch";

const createOrder = async (orderData, totalPrice) => {
  //map the orderData to the order object
  const order = {
    customer: "6651dfc44ca89b8180fd524b".toString(),
    customerRegisterDate: new Date(),
    items: orderData.items,
    totalAmount: totalPrice,
    orderDate: new Date(),
  };
};

export { createOrder };
