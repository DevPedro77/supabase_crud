import { createClient } from "@supabase/supabase-js";

const apiUrl = 'https://amxsokukwcrcqdqsvaij.supabase.co';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFteHNva3Vrd2NyY3FkcXN2YWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MjkwNjgsImV4cCI6MjA1OTIwNTA2OH0.JHb6KkZKgv4C_kxcSopsTa6nIZ3LF4RwaIlInVo5m-k'


export const supabase = createClient(apiUrl, apiKey)