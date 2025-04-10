import { atom } from "jotai";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js";

// Lazy accessor — client will be memoized inside `getSupabaseBrowserClient`
function getSupabase() {
    return getSupabaseBrowserClient();
}

// Auth state atoms
export const userAtom = atom<User | null>(null);
export const sessionAtom = atom<Session | null>(null);
export const authLoadingAtom = atom<boolean>(true);

/**
 * Initializes auth state by getting the current session and subscribing to changes.
 */
export const initAuth = async (
    setUser: (user: User | null) => void,
    setSession: (session: Session | null) => void,
    setLoading: (loading: boolean) => void
) => {
    const supabase = getSupabase();

    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    setUser(session?.user || null);
    setSession(session);

    const {
        data: { subscription },
    } = supabase.auth.onAuthStateChange(
        (_event: AuthChangeEvent, session: Session | null) => {
            setUser(session?.user || null);
            setSession(session);
        }
    );

    // Small delay for smooth transitions then set loading to false
    setTimeout(() => {
        setLoading(false);
    }, 100);

    return () => subscription?.unsubscribe();
};

// Auth methods
export const signInWithEmail = (email: string, password: string) => {
    const supabase = getSupabase();
    return supabase.auth.signInWithPassword({ email, password });
};

export const signUpWithEmail = (email: string, password: string) => {
    const supabase = getSupabase();
    return supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
    });
};

export const signInWithGoogle = () => {
    const supabase = getSupabase();
    return supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${window.location.origin}/auth/callback`,
        },
    });
};

export const signOut = () => {
    const supabase = getSupabase();
    console.log('supabase', supabase.auth.getSession())
    return supabase.auth.signOut();
};
