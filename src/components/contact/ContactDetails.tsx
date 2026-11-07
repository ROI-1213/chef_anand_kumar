import { Phone, Mail, MapPin, Clock, ShieldCheck, Compass } from "lucide-react";
import { siteContent } from "@/lib/content";

export default function ContactDetails() {
  const { contact } = siteContent;

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs uppercase tracking-widest mb-4">
          <Compass className="w-3.5 h-3.5" />
          <span>Direct Contact Information</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-ivory-light font-light uppercase tracking-tight">
          Executive <span className="italic text-gold font-normal">Liaison</span>
        </h2>
        <p className="font-sans text-sm sm:text-base text-ivory/70 leading-relaxed font-light mt-3">
          For global hotel consultancy, restaurant pre-openings, signature guest dinners, and culinary media engagements.
        </p>
      </div>

      <div className="space-y-6">
        {/* Telephone */}
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 transition-colors">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <span className="font-sans text-[11px] uppercase tracking-widest text-gold block font-semibold">
              Telephone
            </span>
            <a
              href={`tel:${contact.phone.replace(/\s+/g, "")}`}
              className="font-serif text-xl sm:text-2xl text-ivory-light hover:text-gold transition-colors block mt-0.5"
            >
              {contact.phone}
            </a>
            <span className="text-xs text-ivory/50 font-sans block mt-1">
              Note: {contact.phoneNote}
            </span>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 transition-colors">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="font-sans text-[11px] uppercase tracking-widest text-gold block font-semibold">
              Email Correspondence
            </span>
            <a
              href={`mailto:${contact.email}`}
              className="font-serif text-xl sm:text-2xl text-ivory-light hover:text-gold transition-colors block mt-0.5 break-all"
            >
              {contact.email}
            </a>
            <span className="text-xs text-ivory/50 font-sans block mt-1">
              Response SLA: {contact.emailNote}
            </span>
          </div>
        </div>

        {/* Physical Address */}
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 transition-colors">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="text-sm font-sans space-y-1">
            <span className="font-sans text-[11px] uppercase tracking-widest text-gold block font-semibold">
              Office & Studio
            </span>
            <p className="font-medium text-ivory-light text-base">{contact.name}</p>
            <p className="text-ivory/70">{contact.address.building}</p>
            <p className="text-ivory/70">{contact.address.street}</p>
            <p className="text-ivory/70">
              {contact.address.city}, {contact.address.state} {contact.address.postalCode}, {contact.address.country}
            </p>
          </div>
        </div>
      </div>

      {/* Advisory Pillars Badge */}
      <div className="p-6 rounded-2xl bg-gold/5 border border-gold/20 space-y-2">
        <div className="flex items-center gap-2 text-gold">
          <ShieldCheck className="w-4 h-4" />
          <span className="font-sans text-xs uppercase tracking-widest font-semibold">
            Confidentiality & Standards
          </span>
        </div>
        <p className="text-xs font-sans text-ivory/70 leading-relaxed">
          All discussions regarding new restaurant launches, proprietary recipes, menu audits, and luxury resort agreements are treated with strict confidentiality.
        </p>
      </div>
    </div>
  );
}
