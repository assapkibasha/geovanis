import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { products } from "../src/lib/data";
import { slugify } from "../src/lib/utils";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "admin@karambizi.tech" },
    update: {},
    create: {
      email: "admin@karambizi.tech",
      name: "Karambizi Admin",
      role: "ADMIN",
    },
  });

  await prisma.admin.upsert({
    where: { email: "admin@karambizi.tech" },
    update: {},
    create: {
      email: "admin@karambizi.tech",
      userId: user.id,
      passwordHash: await hash("Admin123!", 12),
      role: "SUPER_ADMIN",
    },
  });

  const category = await prisma.category.upsert({
    where: { slug: "smartphones" },
    update: {},
    create: { name: "Smartphones", slug: "smartphones" },
  });

  for (const phone of products) {
    const brand = await prisma.brand.upsert({
      where: { name: phone.brand },
      update: {},
      create: {
        name: phone.brand,
        slug: slugify(phone.brand),
        description: phone.brand === "Apple" ? "Premium iPhones with verified quality." : "Samsung Galaxy phones for power users.",
      },
    });

    await prisma.product.upsert({
      where: { slug: phone.slug },
      update: {},
      create: {
        name: phone.name,
        slug: phone.slug,
        description: phone.description,
        price: phone.price,
        oldPrice: phone.oldPrice,
        storage: phone.storage,
        ram: phone.ram,
        batteryHealth: phone.batteryHealth,
        condition: phone.condition === "Very Good" ? "VERY_GOOD" : phone.condition.toUpperCase().replace(" ", "_") as "NEW" | "EXCELLENT" | "VERY_GOOD" | "GOOD",
        availability: phone.availability.toUpperCase().replaceAll(" ", "_") as "IN_STOCK" | "OUT_OF_STOCK" | "RESERVED" | "SOLD",
        color: phone.color,
        support5g: phone.support5g,
        cameraQuality: phone.cameraQuality,
        warranty: phone.warranty,
        featured: phone.featured,
        specifications: phone.specs,
        brandId: brand.id,
        categoryId: category.id,
        images: {
          create: phone.images.map((url, position) => ({
            url,
            alt: phone.name,
            position,
          })),
        },
      },
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
