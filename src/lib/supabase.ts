import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://oxhbllnsoiwckjyypnrq.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94aGJsbG5zb2l3Y2tqeXlwbnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MjA0NDksImV4cCI6MjA5NTE5NjQ0OX0.8QqU2hgnQlK3BwxdPlWU6GT8zioNESi68jtHXSc8fZo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
