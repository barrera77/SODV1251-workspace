export const menuItem = {
  id: 0,
  name: "Cheese Burger",
  description: "A delicious burger with lettuce, tomato, and cheese.",
  price: 8.99,
  ingredients: ["Beef Patty", "Lettuce", "Tomato", "Cheese", "Bun"],
  img_url: "./images/img",
  calculate_totalcost: function (taxRate, discount) {
    const taxAmount = this.price * taxRate;
    const discountAmount = this.price * discount;

    const totalCost = this.price + taxAmount - discountAmount;

    return totalCost.toFixed(2);
  },
};
