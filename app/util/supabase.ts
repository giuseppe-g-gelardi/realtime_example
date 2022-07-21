import { createClient } from '@supabase/supabase-js';

// global interface for window that includes window.end
// otherwise window.env will throw a type error
declare global {
  interface Window {
    env: { DATABASE_KEY: string; DATABASE_URL: string;}
  }
}

// if code is ran on the server... process.env
// if code is ran on the client... window.env
// this is to ensure supabase subscriptions can be called 
// in a useEffect and sync server loaded data w/ state.
const isServer = typeof window === 'undefined';

const supabaseKey = isServer
  ? process.env.DATABASE_KEY!
  : window.env.DATABASE_KEY!

const supabaseUrl = isServer 
  ? process.env.DATABASE_URL!
  : window.env.DATABASE_URL!  


export default createClient(supabaseUrl, supabaseKey)
