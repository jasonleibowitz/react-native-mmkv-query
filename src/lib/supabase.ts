import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

import { config } from "./config";
import { clientStorage } from "./mmkv";

export const supabase = createClient(
  config.supabaseUrl,
  config.supabaseAnonKey,
  {
    auth: {
      storage: clientStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
