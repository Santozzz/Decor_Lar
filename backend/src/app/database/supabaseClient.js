import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://afhqhmpnokabtlpaolze.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmaHFobXBub2thYnRscGFvbHplIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDA1MjIyMCwiZXhwIjoyMDU5NjI4MjIwfQ.xOtbY3wi6m4Q99CClrjFjx4c2845knbqi6MOO0yFDc8';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
