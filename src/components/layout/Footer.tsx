"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import { siteContent } from "@/lib/content";
import MagneticButton from "../motion/MagneticButton";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-obsidian border-t border-white/10 text-ivory relative z-10">
      {/* Decorative Top Accent */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Column 1: Brand & Philosophy (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                <Image
                  src="/images/logo-bright.png"
                  alt="Chef Anand Kumar Official Logo"
                  fill
                  unoptimized
                  className="object-contain brightness-125 contrast-125 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.45)]"
                />
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl tracking-widest text-ivory-light font-medium block">
                  ANAND KUMAR
                </span>
                <span className="font-sans text-[10px] sm:text-xs tracking-mega text-gold uppercase block mt-1">
                  Executive Chef • Culinary Visionary • Hospitality Consultant
                </span>
              </div>
            </div>
            <p className="font-sans text-sm text-ivory/70 max-w-md leading-relaxed">
              &ldquo;Food is more than nourishment. It is culture, emotion, memory, and connection.&rdquo; Over two decades of international culinary leadership across India, Maldives, Tanzania, UAE, and Nigeria.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full border border-gold/30 bg-gold/5 font-sans text-xs text-gold tracking-widest uppercase">
                Founder, ForkTheory Consultancy
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-lg text-gold tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 font-sans text-sm">
              {siteContent.navigation.map((link) => {
                const isExternal = link.href.startsWith("http");
                return (
                  <li key={link.label}>
                    {isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ivory/70 hover:text-gold transition-colors inline-flex items-center gap-1 group"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-gold/60 group-hover:text-gold" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-ivory/70 hover:text-gold transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Contact Details (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-lg text-gold tracking-wider">
              Direct Inquiries
            </h4>
            <div className="space-y-3 font-sans text-sm text-ivory/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-1" />
                <div className="text-xs sm:text-sm text-ivory/70 leading-relaxed">
                  <p className="font-medium text-ivory">{siteContent.contact.address.building}</p>
                  <p>{siteContent.contact.address.street}</p>
                  <p>{siteContent.contact.address.city}, {siteContent.contact.address.state} {siteContent.contact.address.postalCode}, {siteContent.contact.address.country}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <div>
                  <a
                    href={`tel:${siteContent.contact.phone.replace(/\s+/g, "")}`}
                    className="hover:text-gold transition-colors font-medium"
                  >
                    {siteContent.contact.phone}
                  </a>
                  <span className="text-xs text-ivory/50 block">({siteContent.contact.phoneNote})</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <div>
                  <a
                    href={`mailto:${siteContent.contact.email}`}
                    className="hover:text-gold transition-colors font-medium break-all"
                  >
                    {siteContent.contact.email}
                  </a>
                  <span className="text-xs text-ivory/50 block">({siteContent.contact.emailNote})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-ivory/50">
          <p>
            &copy; {currentYear} Chef Anand Kumar. All rights reserved. Original culinary content & photography.
          </p>

          <MagneticButton onClick={scrollToTop}>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-ivory/70 hover:text-gold transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-gold/40"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
