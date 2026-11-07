import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  enquiryType: z.string().min(1, "Please select an enquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
          message: "Validation failed. Please review your input.",
        },
        { status: 400 }
      );
    }

    const { name, email, phone, enquiryType, message } = result.data;

    // Check if email provider credentials exist in environment
    const smtpConfigured = Boolean(process.env.RESEND_API_KEY || process.env.SMTP_HOST);

    // Log the contact enquiry securely on server
    console.log("[CONTACT_INQUIRY]", {
      timestamp: new Date().toISOString(),
      name,
      email,
      phone,
      enquiryType,
      messageLength: message.length,
      smtpConfigured,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out. Chef Anand Kumar's team will review your inquiry and respond within 72 hours.",
      smtpConfigured,
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected server error occurred. Please contact anand_hotel@yahoo.com directly." },
      { status: 500 }
    );
  }
}
