import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ifwvjlgpaekxoavabdjt.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlmd3ZqbGdwYWVreG9hdmFiZGp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjcyMDY1MjcsImV4cCI6MTk4Mjc4MjUyN30.0XaRN5_vUMdf5gNVQWm2UXCBzi-ip5_2aZ0RW_yNQGE";


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
