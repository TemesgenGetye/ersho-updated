import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Export a single `supabase` constant. If env vars are present, create a real
// client; otherwise export a small stub to avoid crashes during build/prerender.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase: any =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        from: () => ({ select: async () => [] }),
        storage: {
          from: () => ({
            upload: async () => ({ error: null, data: null }),
            getPublicUrl: () => ({ data: { publicUrl: "" } }),
          }),
        },
      };
