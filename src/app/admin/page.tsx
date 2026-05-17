import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AdminClient } from "@/app/admin/admin-client";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  if (process.env.SKIP_ADMIN_AUTH !== "true") {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/login");
  }

  return <AdminClient />;
}
