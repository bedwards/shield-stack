import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!supabaseUrl) {
  throw new Error(
    "Missing environment variable NEXT_PUBLIC_SUPABASE_URL. " +
      "Please set it in your .env.local file."
  );
}

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseAnonKey) {
  throw new Error(
    "Missing environment variable NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
      "Please set it in your .env.local file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
