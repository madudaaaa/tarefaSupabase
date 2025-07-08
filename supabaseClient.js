
import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL="https://ogbqpyvzyzwakpsxlgtw.supabase.co"
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nYnFweXZ6eXp3YWtwc3hsZ3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3ODM1MjcsImV4cCI6MjA2NjM1OTUyN30.zO5OM2WtGOsxzq6zIMNAxeJLv01EVvQVXK8X4hRWow0"
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

