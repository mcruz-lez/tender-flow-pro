const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testRealtime() {
  // Listen for changes on the 'bids' table
  const channel = supabase.channel('ci-bids').on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'bids' },
    (payload) => {
      console.log('✅ Supabase Realtime event received:', payload);
      process.exit(0);
    }
  ).subscribe((status) => {
    if (status === 'SUBSCRIBED') {
      console.log('✅ Supabase Realtime subscription successful. Waiting for events...');
      // Optionally, insert a row to trigger an event here
      setTimeout(() => {
        console.error('❌ No realtime event received in 10s.');
        process.exit(1);
      }, 10000);
    }
  });
}

testRealtime();
