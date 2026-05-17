import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { products } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { productInputSchema } from "@/lib/validators";
import { slugify } from "@/lib/utils";

export async function GET() {
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = productInputSchema.parse(await request.json());
  const product = await prisma.product.create({
    data: {
      name: payload.name,
      slug: slugify(`${payload.name}-${payload.storage}-${payload.color}`),
      price: payload.price,
      oldPrice: payload.oldPrice,
      description: payload.description,
      batteryHealth: payload.batteryHealth,
      storage: payload.storage,
      ram: payload.ram,
      condition: payload.condition,
      color: payload.color,
      availability: payload.availability,
      featured: payload.featured,
      specifications: payload.specifications,
      brand: {
        connectOrCreate: {
          where: { name: payload.brand },
          create: { name: payload.brand, slug: slugify(payload.brand) },
        },
      },
      category: {
        connectOrCreate: {
          where: { slug: "smartphones" },
          create: { name: "Smartphones", slug: "smartphones" },
        },
      },
      images: {
        create: payload.images.map((url, index) => ({ url, alt: payload.name, position: index })),
      },
    },
  });

  return NextResponse.json({ product }, { status: 201 });
}
