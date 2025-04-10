//src/lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr';

function getEnv(key: string, fallback?: string): string {
    const value = import.meta.env[key];
    if (!value || value === fallback) {
        throw new Error(`Missing or invalid environment variable: ${key}`);
    }
    return value;
}

// Single global instance
let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
    if (browserClient) return browserClient;

    const supabaseUrl = getEnv('VITE_SUPABASE_URL');
    const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

    browserClient = createBrowserClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
        }
    });

    return browserClient;
}

// 🚨 REMOVE SERVER CLIENT COMPLETELY 🚨
