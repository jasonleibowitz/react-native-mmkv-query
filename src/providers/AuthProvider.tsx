import type { User, AuthSession } from "@supabase/supabase-js";
import { ReactNode, createContext, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

type SessionAndUser = { session: AuthSession | null; user: User | null };
type AuthContextProps = {
  session: AuthSession | null;
  signIn: ({ session, user }: SessionAndUser) => void;
  signOut: () => void;
};
export const AuthContext = createContext<AuthContextProps>({
  session: null,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AuthSession | null>(null);

  const signIn =
    async () =>
    ({ session, user }: SessionAndUser) => {
      setSession(session);
    };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
    }

    setSession(null);
  };

  /**
   * Fetches the authenticated user's session & auth_user data
   */
  const getSession = async () => {
    console.log(`/// in getSession`);
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error(error);
      // signOut();
    } else {
      setSession(data.session);
    }
  };

  useEffect(() => {
    if (!session) getSession();
  }, [session]);

  return (
    <AuthContext.Provider value={{ session, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
