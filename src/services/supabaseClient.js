import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qdwipjdlvukfgbqdocoy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkd2lwamRsdnVrZmdicWRvY295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2OTYzNjgsImV4cCI6MjA1NDI3MjM2OH0.Qd0cFZIZq0QKAyjQyrp-gdaEH0Mv6ROzxTg4oxXZaUI";


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
