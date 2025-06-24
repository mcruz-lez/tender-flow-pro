// Test script for Supabase Edge Function (CommonJS)
const fetch = require('node-fetch');

const SUPABASE_URL = process.env.SUPABASE_URL;
const EDGE_FUNCTION_PATH = '/functions/v1/hello-world';

async function testEdgeFunction() {
  if (!SUPABASE_URL) {
    console.error('SUPABASE_URL env variable is not set.');
    process.exit(1);
  }
  const url = SUPABASE_URL.replace(/\/$/, '') + EDGE_FUNCTION_PATH;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    if (data.message === 'Hello from Supabase Edge Function!') {
      console.log('✅ Edge Function responded correctly:', data);
      process.exit(0);
    } else {
      console.error('❌ Unexpected response:', data);
      process.exit(1);
    }
  } catch (err) {
    console.error('❌ Error invoking Edge Function:', err);
    process.exit(1);
  }
}

testEdgeFunction();
