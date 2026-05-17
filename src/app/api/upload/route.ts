import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const files = formData.getAll("images").filter((file): file is File => file instanceof File);
  if (!files.length) return NextResponse.json({ error: "No images provided" }, { status: 400 });

  const uploads = await Promise.all(
    files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "karambizi-tech-store",
              resource_type: "image",
              transformation: [{ quality: "auto", fetch_format: "auto", width: 1400, crop: "limit" }],
            },
            (error, result) => (error ? reject(error) : resolve(result)),
          )
          .end(buffer);
      });
    }),
  );

  return NextResponse.json({ uploads });
}
