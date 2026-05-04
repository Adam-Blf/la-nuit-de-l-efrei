"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import { PromBlason } from "@/components/primitives/Logos";
import { AssosBar } from "@/components/AssosBar";
import { EVENT, NAV_ITEMS, EASE } from "@/lib/tokens";

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const isActive = (id: string) =>
    id === "/" ? pathname === "/" : pathname.startsWith(id);

  return (
    <>
      <header className="sticky top-0 z-50">
        <AssosBar />
      <nav className="flex items-center justify-between border-b border-brass-400/20 bg-navy-900/80 px-6 py-4 backdrop-blur-md md:px-12 lg:px-20 xl:px-[120px]">
        <Link href="/" className="flex items-center gap-3 group">
          <PromBlason size={36} />
          <span className="flex flex-col leading-tight">
            <span className="fraunces-display text-base font-medium tracking-tight text-cream md:text-lg">
              {EVENT.name}
            </span>
            <span className="font-mono text-[9px] font-medium uppercase tracking-[0.32em] text-brass-200">
              2016 → 2026
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.id}
              className={`relative pb-1 text-xs font-medium tracking-[0.04em] transition-colors ${
                isActive(item.id)
                  ? "text-cream"
                  : "text-cream/60 hover:text-cream"
              }`}
            >
              {item.label}
              {isActive(item.id) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-px left-0 right-0 h-px bg-brass-400"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/billetterie"
            className="hidden bg-brass-400 px-5 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-navy-900 transition-transform hover:-translate-y-px md:inline-block"
          >
            Réserver
          </Link>
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center text-cream lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 top-[68px] z-40 flex flex-col bg-navy-900/96 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-1 flex-col gap-2 px-8 py-12">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.05 + i * 0.06,
                    ease: EASE,
                  }}
                >
                  <Link
                    href={item.id}
                    onClick={closeMenu}
                    className={`block py-4 fraunces-display text-3xl font-medium tracking-tight ${
                      isActive(item.id) ? "text-cream" : "text-cream/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.4, ease: EASE }}
                className="mt-8"
              >
                <Link
                  href="/billetterie"
                  onClick={closeMenu}
                  className="inline-block bg-brass-400 px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.22em] text-navy-900"
                >
                  Réserver →
                </Link>
              </motion.div>
            </div>
            <div className="border-t border-brass-400/15 px-8 py-6 font-mono text-[10px] uppercase tracking-[0.28em] text-cream/45">
              {EVENT.date} · {EVENT.doors} → {EVENT.end}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
