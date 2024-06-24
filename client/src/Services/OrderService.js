const transformOrdersToProducts = (orders) => {
  let products = [];

  orders.forEach((order) => {
    order.items.forEach((item) => {
      
      let product = {
        key: item.productId,
        title: item.title,
        imageUrl: item.imageUrl,
        quantity: item.quantity,
        total: item.quantity * item.price,
        date: order.orderDate,
      };
      products.push(product);
    });
  });

  return products;
};

export { transformOrdersToProducts };
