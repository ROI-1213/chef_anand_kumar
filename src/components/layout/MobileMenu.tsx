"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import { siteContent } from "@/lib/content";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const links = siteContent.navigation;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex flex-col bg-obsidian text-ivory-light overflow-y-auto"
        >
          {/* Top Bar inside menu */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Chef Anand Kumar Official Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-lg tracking-widest text-ivory-light font-medium block">
                  ANAND KUMAR
                </span>
                <span className="font-sans text-[9px] tracking-mega text-gold uppercase block">
                  Executive Chef
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-white/20 text-ivory hover:text-gold hover:border-gold transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 px-8 py-10 flex flex-col justify-center">
            <nav className="space-y-4">
              {links.map((link, idx) => {
                const isActive = pathname === link.href;
                const isExternal = link.href.startsWith("http");

                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                  >
                    {isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="group flex items-baseline justify-between py-2 border-b border-white/5 hover:border-gold/30 transition-colors"
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="font-sans text-xs text-gold/60 tracking-widest">
                            0{idx + 1}
                          </span>
                          <span className="font-serif text-3xl sm:text-4xl tracking-wide group-hover:text-gold transition-colors">
                            {link.label}
                          </span>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-gold/50 group-hover:text-gold transition-colors" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="group flex items-baseline justify-between py-2 border-b border-white/5 hover:border-gold/30 transition-colors"
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="font-sans text-xs text-gold/60 tracking-widest">
                            0{idx + 1}
                          </span>
                          <span
                            className={`font-serif text-3xl sm:text-4xl tracking-wide transition-colors ${
                              isActive ? "text-gold italic font-semibold" : "text-ivory-light group-hover:text-gold"
                            }`}
                          >
                            {link.label}
                          </span>
                        </div>
                        {isActive && (
                          <span className="text-[10px] tracking-widest uppercase text-gold border border-gold/40 px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>
          </div>

          {/* Quick Contact Footer in Menu */}
          <div className="p-8 bg-obsidian-100 border-t border-white/10 space-y-3">
            <div className="text-xs uppercase tracking-widest text-gold font-sans">
              Direct Contact
            </div>
            <div className="flex flex-col gap-2 text-sm text-ivory/80">
              <a
                href={`tel:${siteContent.contact.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>{siteContent.contact.phone}</span>
              </a>
              <a
                href={`mailto:${siteContent.contact.email}`}
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4 text-gold" />
                <span>{siteContent.contact.email}</span>
              </a>
              <div className="flex items-start gap-2 text-xs text-ivory/60 pt-1">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{siteContent.contact.address.city}, {siteContent.contact.address.country}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
