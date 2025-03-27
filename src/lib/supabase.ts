
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tdjwumlbnptsbvffutgk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkand1bWxibnB0c2J2ZmZ1dGdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzNjU3NTIsImV4cCI6MjA1Nzk0MTc1Mn0.f4MWYWnqQ6yzuylu2tNqa4Q2vq2glQl32vmFVt8Pmpk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'tpt_auth_token',
    storage: localStorage,
    detectSessionInUrl: true
  }
});
