import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ryndjrsdihpuqsomqztd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5bmRqcnNkaWhwdXFzb21xenRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxMTEyNDcsImV4cCI6MjA0NDY4NzI0N30.ASdRHKbxclnx-fmd1zRiOAxDgOAd7xZrAlU_iHi4cLs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
