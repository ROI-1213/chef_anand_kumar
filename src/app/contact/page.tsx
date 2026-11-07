import ContactDetails from "@/components/contact/ContactDetails";
import ContactForm from "@/components/contact/ContactForm";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contact Executive Chef Anand Kumar | Inquiries & Consulting",
  description: "Get in touch with Executive Chef Anand Kumar for restaurant consultancy, culinary advisory, guest chef pop-ups, and luxury hospitality collaborations.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="pt-32 pb-24 bg-obsidian text-ivory relative min-h-screen overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gold/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-[1px] bg-gold" />
            <span className="font-sans text-xs tracking-mega text-gold uppercase font-medium">
              Start A Dialogue
            </span>
            <span className="w-8 h-[1px] bg-gold" />
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-ivory-light uppercase tracking-tight font-light">
            Let&apos;s Start A <span className="italic text-gold font-normal">Conversation</span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-ivory/70 max-w-xl mx-auto font-light leading-relaxed">
            Whether launching a concept from inception or elevating an established five-star dining destination, culinary excellence begins here.
          </p>
        </div>

        {/* Two-Column Grid: Details on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <ContactDetails />
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

      </div>
    </section>
  );
}
