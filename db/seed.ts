
import { prisma } from "./db";

export const listingsSeed= [
  {
    title: "Vintage Leather Jacket",
    description:
      "A classic brown leather jacket from the 80s. Barely worn, great condition. Size M.",
    price: 8500, 
    imageUrls: ["https://example.com/images/jacket1.jpg"],
    sellerId: "6528dc75-90c1-4c48-a78b-491c2023316b",
  },
  {
    title: 'MacBook Pro 2021 14"',
    description:
      "M1 Pro chip, 16GB RAM, 512GB SSD. Includes original charger and box. Minor scratches on the bottom.",
    price: 149900,
    imageUrls: [
      "https://example.com/images/mbp1.jpg",
      "https://example.com/images/mbp2.jpg",
    ],
    sellerId: "6528dc75-90c1-4c48-a78b-491c2023316b",
  },
  {
    title: "IKEA KALLAX Shelf Unit (White)",
    description:
      "4x4 KALLAX bookshelf in white. Some scuffs from moving but fully functional. Buyer must arrange pickup.",
    price: 4500,
    imageUrls: ["https://example.com/images/kallax1.jpg"],
    sellerId: "6528dc75-90c1-4c48-a78b-491c2023316b",
  },
  {
    title: "Sony WH-1000XM5 Headphones",
    description:
      "Industry-leading noise cancelling headphones. Purchased 6 months ago, used lightly. Comes with case and cables.",
    price: 22000,
    imageUrls: [
      "https://example.com/images/sony1.jpg",
      "https://example.com/images/sony2.jpg",
    ],
    sellerId: "6528dc75-90c1-4c48-a78b-491c2023316b",
  },
  {
    title: "Trek FX 3 Disc Hybrid Bike",
    description:
      "2022 model, matte navy, size M. ~500 miles ridden. Hydraulic disc brakes, great for commuting or light trails.",
    price: 65000,
    imageUrls: ["https://example.com/images/bike1.jpg"],
    sellerId: "6528dc75-90c1-4c48-a78b-491c2023316b",
  },
];

async function listings() {
 for (const listing of listingsSeed){
    const res= await prisma.listing.create({data: listing});
    console.log(res)
 }
}

listings()