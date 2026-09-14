import { Link } from "@tanstack/react-router";
import { FACILITY_NOTE } from "@/data/products";

export function SiteFooter() {
  return (
    <footer className="bg-[#3A5A40] font-display text-[#eadcc9]">
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 items-start gap-y-3 px-8 py-3 sm:px-10 md:grid-cols-3">
        <div className="flex min-w-0 flex-col leading-none">
          <p className="text-[2rem] tracking-[0.22em]">TUMBLENUT</p>
          <p className="mt-3 text-[1.25rem] tracking-[0.32em] uppercase">Small batch nut butters</p>
          <p className="mt-3 text-[calc(0.875rem+2pt)] tracking-[0.04em] text-[#eadcc9]/85 sm:whitespace-nowrap">
            Made from pure ingredients, with flavors for everyone.
          </p>
        </div>
        <nav className="flex flex-col gap-1 text-sm leading-none tracking-[0.08em] md:justify-self-center">
          <Link to="/shop" className="hover:text-white">
            The jars
          </Link>
          <Link to="/story" className="hover:text-white">
            The story
          </Link>
          <Link to="/cart" className="hover:text-white">
            The crate
          </Link>
        </nav>
        <p className="text-xs leading-snug tracking-[0.04em] text-[#eadcc9]/70 md:justify-self-end md:text-right">
          {FACILITY_NOTE}
        </p>
      </div>
    </footer>
  );
}
