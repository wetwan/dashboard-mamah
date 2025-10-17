import { faker } from "@faker-js/faker";

const UNSPLASH_IMAGES = {
  Electronics: [
    "https://images.unsplash.com/photo-1510552776732-03e61cf4b144",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
  ],
  Clothing: [
    "https://images.unsplash.com/photo-1521335629791-ce4aec67dd47",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  ],
  Furniture: [
    "https://images.unsplash.com/photo-1582582423594-c4926e3d1f09",
    "https://images.unsplash.com/photo-1615874959474-d609969a2d1b",
    "https://images.unsplash.com/photo-1505691723518-36a6f3a9b26b",
  ],
  Shoes: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    "https://images.unsplash.com/photo-1528701800489-20be6ae7bf62",
    "https://images.unsplash.com/photo-1519741497674-611481863552",
  ],
  Accessories: [
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    "https://images.unsplash.com/photo-1585386959984-a41552231693",
    "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
  ],
};

const CATEGORIES = Object.keys(UNSPLASH_IMAGES) as (keyof typeof UNSPLASH_IMAGES)[];

export function generateFakeProducts(count = 50) {
  const products = [];

  for (let i = 0; i < count; i++) {
    const category = faker.helpers.arrayElement(CATEGORIES);
    const name = faker.commerce.productName();
    const price = parseFloat(faker.commerce.price({ min: 10, max: 500 }));
    const discount = faker.number.int({ min: 0, max: 40 });
    const finalPrice = Math.round(price * (1 - discount / 100));
    const stock = faker.number.int({ min: 0, max: 200 });

    const images = faker.helpers.arrayElements(
      UNSPLASH_IMAGES[category],
      3
    );

    products.push({
      id: faker.string.uuid(),
      name,
      category,
      description: faker.commerce.productDescription(),
      price,
      discount,
      finalPrice,
      stock,
      images,
      colors: faker.helpers.arrayElements(
        ["red", "blue", "black", "white", "green"],
        3
      ),
      sizes: faker.helpers.arrayElements(["S", "M", "L", "XL"], 2),
      averageRating: faker.number.float({
        min: 3,
        max: 5,
        multipleOf: 0.1, // ✅ updated for new faker API
      }),
      numOfReviews: faker.number.int({ min: 1, max: 300 }),
      inStock: stock > 0,
    });
  }

  return products;
}
