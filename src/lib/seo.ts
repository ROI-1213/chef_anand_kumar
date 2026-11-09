import { Metadata } from "next";

const SITE_URL = "https://www.chefanandkumar.com";

interface MetadataProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

export function constructMetadata({
  title = "Executive Chef Anand Kumar | Culinary Visionary & Hospitality Leader",
  description = "Official website of Executive Chef Anand Kumar — International Culinary Leader, Luxury Hospitality Consultant, and Founder of ForkTheory.",
  path = "",
  image = "/images/original/chef/about2.jpg",
}: MetadataProps = {}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title: {
      default: title,
      template: "%s | Chef Anand Kumar",
    },
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Chef Anand Kumar",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Executive Chef Anand Kumar",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@chefanandkumar",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Anand Kumar",
    jobTitle: "Executive Chef & Luxury Hospitality Consultant",
    url: SITE_URL,
    image: `${SITE_URL}/images/original/chef/about2.jpg`,
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Institute of Hotel Management, Catering Technology & Applied Nutrition, Kolkata",
    },
    knowsAbout: [
      "Culinary Arts",
      "Haute Cuisine",
      "Luxury Hospitality",
      "Menu Engineering",
      "Kitchen Architectural Design",
      "Restaurant Strategy & ForkTheory",
      "Five-Star Hotel Operations",
    ],
    worksFor: {
      "@type": "Organization",
      name: "The George Hotel, Lagos",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Prime Legend, Flat-814, Block-B, Kondapur, Masjid Banda",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500084",
      addressCountry: "IN",
    },
    telephone: "+91 9703712340",
    email: "anand_hotel@yahoo.com",
    sameAs: [
      `${SITE_URL}/blog`,
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Chef Anand Kumar",
    url: SITE_URL,
    description: "Official portfolio, culinary philosophy, career timeline, and consulting services of Executive Chef Anand Kumar.",
    publisher: {
      "@type": "Person",
      name: "Anand Kumar",
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
