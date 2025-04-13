import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hlmfdkxzqbqneiqxsitb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsbWZka3h6cWJxbmVpcXhzaXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1Mzc4MjYsImV4cCI6MjA2MDExMzgyNn0.Wz-IbyVaEmPXqq4HtuB-2EOs6nN1KXYaryPFHpbYj4w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);