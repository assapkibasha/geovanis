import Link from "next/link";

export function WhatsAppButton() {
  return (
    <Link
      className="fixed bottom-5 right-5 z-50 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-black shadow-2xl hover:-translate-y-0.5"
      href="https://wa.me/250784616862?text=Hello%20Karambizi%20Tech%20Store%2C%20I%20want%20to%20buy%20a%20phone."
    >
      WhatsApp
    </Link>
  );
}
