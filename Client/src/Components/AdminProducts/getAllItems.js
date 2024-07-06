const getAllItems = (orders) => {
  const ordersData = [];

  if (orders && Array.isArray(orders)) {
    orders.forEach((order) => {
      const { customer, orderDate, customerName } = order;
      order.items.forEach((item) => {
        const { productId, title, quantity } = item;
        ordersData.push({
          customer,
          customerName,
          orderDate,
          productId,
          title,
          quantity,
        });
      });
    });
  }

  return ordersData;
};

export default getAllItems;
