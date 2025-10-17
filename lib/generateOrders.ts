// lib/generateOrders.js
import { faker } from "@faker-js/faker";

export function generateOrder() {
  const itemsCount = faker.number.int({ min: 1, max: 4 });
  const items = Array.from({ length: itemsCount }, () => ({
    name: faker.commerce.productName(),
    qty: faker.number.int({ min: 1, max: 3 }),
    price: faker.number.int({ min: 10, max: 500 }),
    image: faker.image.urlPicsumPhotos(),
  }));

  const itemsPrice = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const shippingPrice = faker.number.int({ min: 5, max: 20 });
  const taxPrice = Math.round(itemsPrice * 0.05);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const isPaid = faker.datatype.boolean();
  const isDelivered = faker.datatype.boolean();

  return {
    _id: faker.string.uuid(),
    user: faker.string.uuid(),
    items,
    shippingAddress: {
      fullName: faker.person.fullName(),
      address1: faker.location.streetAddress(),
      state: faker.location.state(),
      country: faker.location.country(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
    },
    paymentMethod: faker.helpers.arrayElement(["card", "cash_on_delivery"]),
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    status: faker.helpers.arrayElement([
      "pending",
      "delivered",
      "cancelled",
      "processing",
    ]),
    isPaid,
    paidAt: isPaid ? faker.date.past() : null,
    isDelivered,
    deliveredAt: isDelivered ? faker.date.recent() : null,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
}

export function generateOrders(count = 50) {
  return Array.from({ length: count }, generateOrder);
}

