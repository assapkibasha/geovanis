import { Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#e7e9ed] bg-white text-[#060606]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.3fr_0.8fr_0.8fr_1fr] lg:px-8">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Image
              className="h-22 w-39 object-contain object-left"
              src="/logo_transparent.png"
              alt="Karambizi"
              width={1536}
              height={1024}
            />
            <h2 className="text-2xl font-semibold">Tech Store</h2>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#5f6670]">
            Premium iPhones and Samsung phones for Rwanda buyers who care about quality, clarity, and support.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Shop</h3>
          <div className="mt-4 grid gap-3 text-sm text-[#5f6670]">
            <Link href="/phones">All phones</Link>
            <Link href="/shop/iphones">Apple iPhones Rwanda</Link>
            <Link href="/shop/samsung">Samsung Galaxy Kigali</Link>
            <Link href="/phones-kigali">Phones Kigali</Link>
            <Link href="/blog">Phone buying guides</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Contact</h3>
          <div className="mt-4 grid gap-3 text-sm text-[#5f6670]">
            <span className="flex items-center gap-2"><MapPin size={15} /> Kigali, Rwanda</span>
            <span className="flex items-center gap-2"><Phone size={15} /> +250 784 616 862</span>
            <span className="flex items-center gap-2"><Mail size={15} /> sales@karambizi.tech</span>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Newsletter</h3>
          <form className="mt-4 flex rounded-full border border-[#e7e9ed] p-1">
            <input className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none" placeholder="Email address" type="email" />
            <button className="h-10 w-10 rounded-full bg-[#050505] text-white" aria-label="Subscribe">
              <Send className="mx-auto" size={16} />
            </button>
          </form>
          <div className="mt-4 flex gap-3">
            <Link className="rounded-full border border-[#e7e9ed] p-3" href="https://wa.me/250784616862" aria-label="WhatsApp">WA</Link>
            <Link className="rounded-full border border-[#e7e9ed] p-3" href="#" aria-label="Instagram"><Instagram size={16} /></Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[#e7e9ed] px-5 py-5 text-center text-xs text-[#5f6670]">
        © {new Date().getFullYear()} Karambizi Tech Store. All rights reserved.
      </div>
    </footer>
  );
}
