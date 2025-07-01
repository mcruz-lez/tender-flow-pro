
// Mock edge function - this would be implemented as a proper Supabase Edge Function
// when deployed to production

export const notifyVendor = async (vendorId: string, message: string) => {
  console.log("Mock vendor notification:", { vendorId, message });
  return { success: true };
};
