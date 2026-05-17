import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { productInputSchema } from "@/lib/validators";
import { slugify } from "@/lib/utils";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const payload = productInputSchema.partial().parse(await request.json());
  const { brand, brandId, images, ...fields } = payload;
  const product = await prisma.product.update({
    where: { id },
    data: {
      ...fields,
      ...(brandId ? { brand: { connect: { id: brandId } } } : {}),
      ...(brand && !brandId
        ? {
            brand: {
              connectOrCreate: {
                where: { name: brand },
                create: { name: brand, slug: slugify(brand) },
              },
            },
          }
        : {}),
      ...(images?.length
        ? {
            images: {
              deleteMany: {},
              create: images.map((url, index) => ({ url, alt: payload.name, position: index })),
            },
          }
        : {}),
    },
  });
  return NextResponse.json({ product });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
