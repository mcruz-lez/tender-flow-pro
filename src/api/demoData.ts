
import { supabase } from "@/integrations/supabase/client";

// Demo/sample data seeding for onboarding and testing
// Updated to work with actual Supabase schema

export async function seedDemoData() {
  try {
    // Create demo organizations first
    const { data: orgData, error: orgError } = await supabase
      .from("organizations")
      .insert([
        {
          name: "Demo Property Management Co",
          type: "property_management",
          email: "contact@demoproperty.com",
          description: "A demo property management company"
        },
        {
          name: "Demo Contractor LLC",
          type: "contractor",
          email: "info@democontractor.com",
          description: "A demo contracting company"
        }
      ])
      .select();

    if (orgError) {
      console.error("Error creating demo organizations:", orgError);
      return "Error seeding demo data";
    }

    if (orgData && orgData.length > 0) {
      const orgId = orgData[0].id;

      // Create demo properties
      await supabase.from("properties").insert([
        {
          name: "Sunset Apartments",
          address: "123 Sunset Blvd, Demo City",
          property_type: "residential",
          organization_id: orgId,
          status: "active"
        }
      ]);

      // Create demo vendors
      await supabase.from("vendors").insert([
        {
          company_name: "Demo Maintenance Services",
          email: "service@demomaintenance.com",
          organization_id: orgId,
          prequalification_status: "approved"
        }
      ]);
    }

    return "Demo data seeded successfully.";
  } catch (error) {
    console.error("Error seeding demo data:", error);
    return "Error seeding demo data";
  }
}
