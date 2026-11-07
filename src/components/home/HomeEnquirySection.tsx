"use client";

import ContactDetails from "@/components/contact/ContactDetails";
import ContactForm from "@/components/contact/ContactForm";

export default function HomeEnquirySection() {
  return (
    <section
      id="enquiry"
      className="relative w-full py-20 sm:py-28 bg-obsidian text-ivory overflow-hidden border-t border-white/10"
      aria-label="Enquiry Form"
    >
      {/* Subtle Ambient Gold Glow */}
      <div className="absolute top-1/3 right-1/4 w-[560px] h-[560px] bg-gold/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Heading in Exact Uppercase + Gold Underline Format */}
        <div className="mb-14 sm:mb-18 flex flex-col items-center justify-center text-center">
          <span className="font-sans text-xs sm:text-[13px] tracking-[0.24em] text-[#DCA54C] uppercase font-semibold mb-2">
            START A DIALOGUE
          </span>
          <h2 className="text-center font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold text-white uppercase tracking-[0.22em]">
            ENQUIRY FORM
          </h2>
          <div className="h-[3px] w-24 sm:w-28 bg-[#DCA54C] mt-3 rounded-full" />
        </div>

        {/* Two-Column Grid: Direct Contact Details on Left, Interactive Enquiry Form on Right */}
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
