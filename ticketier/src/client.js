
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://toiadyxiwjypnuaedqwa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvaWFkeXhpd2p5cG51YWVkcXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyMzA0MDgsImV4cCI6MjA2MDgwNjQwOH0.T-HDNp905fOyRBjhWjjSbxQ_LwamWqF0Mzvdvcvzpis'
export const supabase = createClient(supabaseUrl, supabaseKey)