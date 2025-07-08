import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL="https://bahxgptevamifwnymdyz.supabase.co"
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhaHhncHRldmFtaWZ3bnltZHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5OTI1NzQsImV4cCI6MjA2NzU2ODU3NH0.6iiMEEVdlSybnsnhJQaHn8d9yTyQOJEoAkkGEGux1tA"
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

