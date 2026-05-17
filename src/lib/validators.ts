import { z } from "zod";

export const productInputSchema = z.object({
  name: z.string().min(2),
  brandId: z.string().optional(),
  brand: z.string().min(2),
  price: z.coerce.number().positive(),
  oldPrice: z.coerce.number().positive().optional(),
  description: z.string().min(10),
  batteryHealth: z.string().min(2),
  storage: z.string().min(2),
  ram: z.string().min(1),
  condition: z.enum(["NEW", "EXCELLENT", "VERY_GOOD", "GOOD"]),
  color: z.string().min(2),
  availability: z.enum(["IN_STOCK", "OUT_OF_STOCK", "RESERVED", "SOLD"]),
  featured: z.coerce.boolean().default(false),
  images: z.array(z.string().url()).default([]),
  specifications: z.record(z.string(), z.string()).default({}),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  message: z.string().min(10),
});
