"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import MagneticButton from "../motion/MagneticButton";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number with country code"),
  enquiryType: z.string().min(1, "Please choose an enquiry category"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      enquiryType: "Restaurant & Hospitality Consulting",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitError(null);

    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await resp.json();

      if (resp.ok && resData.success) {
        setSubmitSuccess(resData.message || "Your message has been received.");
        reset();
      } else {
        setSubmitError(resData.message || "Failed to submit message. Please try again.");
      }
    } catch (err: any) {
      setSubmitError("Network connection error. Please contact directly via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-obsidian-100 border border-white/10 p-6 sm:p-10 rounded-2xl shadow-2xl relative">
      <h3 className="font-serif text-2xl sm:text-3xl text-ivory-light font-light mb-6">
        Send an <span className="italic text-gold">Enquiry</span>
      </h3>

      {submitSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-gold/10 border border-gold/40 flex items-start gap-3 text-gold">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm font-sans">
            <p className="font-semibold">Message Sent Successfully</p>
            <p className="text-ivory/80 mt-1">{submitSuccess}</p>
          </div>
        </div>
      )}

      {submitError && (
        <div className="mb-6 p-4 rounded-xl bg-red-900/20 border border-red-500/40 flex items-start gap-3 text-red-300">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm font-sans">
            <p className="font-semibold">Submission Notice</p>
            <p className="mt-1">{submitError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-ivory/70 font-sans mb-2">
            Your Name *
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="e.g. Julian Montgomery"
            className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors font-sans text-sm"
          />
          {errors.name && (
            <p className="text-xs text-red-400 mt-1 font-sans">{errors.name.message}</p>
          )}
        </div>

        {/* Two Columns: Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-ivory/70 font-sans mb-2">
              Your E-mail *
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="e.g. julian@hospitality.com"
              className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors font-sans text-sm"
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1 font-sans">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-ivory/70 font-sans mb-2">
              Mobile No. *
            </label>
            <input
              type="tel"
              {...register("phone")}
              placeholder="e.g. +91 97037 12340"
              className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors font-sans text-sm"
            />
            {errors.phone && (
              <p className="text-xs text-red-400 mt-1 font-sans">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Enquiry Category */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-ivory/70 font-sans mb-2">
            Subject / Enquiry Type *
          </label>
          <select
            {...register("enquiryType")}
            className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-ivory focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors font-sans text-sm"
          >
            <option value="Restaurant & Hospitality Consulting">Restaurant & Hospitality Consulting (ForkTheory)</option>
            <option value="Culinary Collaborations & Pop-ups">Culinary Collaborations & Guest Pop-ups</option>
            <option value="Kitchen & Menu Design">Kitchen Architecture & Menu Engineering</option>
            <option value="Team Training & Brigade Hiring">Team Training & Brigade Hiring</option>
            <option value="General Enquiries">General Enquiries</option>
          </select>
          {errors.enquiryType && (
            <p className="text-xs text-red-400 mt-1 font-sans">{errors.enquiryType.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs uppercase tracking-widest text-ivory/70 font-sans mb-2">
            Your Message *
          </label>
          <textarea
            rows={5}
            {...register("message")}
            placeholder="Tell Chef Anand Kumar about your vision, restaurant project, or consultation needs..."
            className="w-full px-4 py-3 bg-obsidian border border-white/10 rounded-xl text-ivory placeholder-ivory/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors font-sans text-sm resize-none"
          />
          {errors.message && (
            <p className="text-xs text-red-400 mt-1 font-sans">{errors.message.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gold text-obsidian rounded-xl font-sans text-xs uppercase tracking-widest font-semibold hover:bg-gold-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold/10 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Inquiry...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-[11px] text-ivory/40 text-center font-sans">
          Responses typically provided within 72 business hours.
        </p>
      </form>
    </div>
  );
}
