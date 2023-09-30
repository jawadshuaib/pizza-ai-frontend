/* eslint-env node */
import { createClient } from '@supabase/supabase-js';

const { SUPABASE_URL, SUPABASE_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('SUPABASE_URL and SUPABASE_KEY must be provided');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function handler() {
  console.log(supabase);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Test function executed successfully!' }),
  };
}
