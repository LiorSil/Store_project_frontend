const getAllItems = (orders) => {
  const ordersData = [];

  if (orders && Array.isArray(orders)) {
    orders.forEach((order) => {
      const { customer, orderDate } = order;
      order.items.forEach((item) => {
        const { productId, title, quantity } = item;
        ordersData.push({
          customer,
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
