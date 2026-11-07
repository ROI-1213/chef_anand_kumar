import siteContentData from "../../content/site-content.json";
import homeData from "../../content/pages/home.json";
import aboutData from "../../content/pages/about.json";
import portfolioPageData from "../../content/pages/portfolio.json";
import recipesData from "../../content/pages/recipes.json";
import videosPageData from "../../content/pages/videos.json";
import contactData from "../../content/pages/contact.json";
import servicesDataJson from "../../content/services.json";
import careerDataJson from "../../content/career.json";
import portfolioDataJson from "../../content/portfolio.json";
import videosDataJson from "../../content/videos.json";
import assetManifestJson from "../../content/asset-manifest.json";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface CareerMilestone {
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  type: string;
}

export interface PortfolioItem {
  id: string;
  src: string;
  originalSrc: string;
  title: string;
  category: string;
  classes?: string;
}

export interface VideoItem {
  id: string;
  embedUrl: string;
  watchUrl: string;
  thumbnail: string;
  fallbackThumbnail: string;
  order: number;
}

export const siteContent = siteContentData;
export const homeContent = homeData;
export const aboutContent = aboutData;
export const portfolioContent = portfolioPageData;
export const recipesContent = recipesData;
export const videosContent = videosPageData;
export const contactContent = contactData;
export const servicesData: ServiceItem[] = servicesDataJson;
export const careerData: CareerMilestone[] = careerDataJson;
export const portfolioData: { categories: string[]; items: PortfolioItem[] } = portfolioDataJson;
export const videosData: VideoItem[] = videosDataJson;
export const assetManifest = assetManifestJson;
