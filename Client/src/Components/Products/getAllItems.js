const getAllItems = (orders) => {
  const itemsArray = [];

  if (orders && Array.isArray(orders)) {
    orders.forEach((order) => {
      const { customer, orderDate } = order;
      order.items.forEach((item) => {
        const { productId, title, quantity } = item;
        itemsArray.push({
          customer,
          orderDate,
          productId,
          title,
          quantity,
        });
      });
    });
  }

  return itemsArray;
};

export default getAllItems;
