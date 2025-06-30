import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import assetManifest from '../../tendprocure-assets/manifest.json';
import tenderIcon from '../assets/icons/tender.svg';
import vendorIcon from '../assets/icons/vendor.svg';
import contractIcon from '../assets/icons/contract.svg';
import aiIcon from '../assets/icons/ai.svg';
import adminAvatar from '../../public/images/avatar-admin.svg';
import vendorAvatar from '../../public/images/avatar-vendor.svg';
import pmAvatar from '../../public/images/avatar-pm.svg';
import dashboardMockup from '../../public/images/dashboard-mockup.svg';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Asset {
  file: string;
  section: string;
}

export function getAssetsBySection(section: string): Asset[] {
  return assetManifest.assets.filter((a: Asset) => a.section === section);
}

export const IconAssets = {
  tender: tenderIcon,
  vendor: vendorIcon,
  contract: contractIcon,
  ai: aiIcon,
};

export const AvatarAssets = {
  admin: adminAvatar,
  vendor: vendorAvatar,
  pm: pmAvatar,
};

export const DashboardMockup = dashboardMockup;
