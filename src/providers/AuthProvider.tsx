import type { User, AuthSession } from "@supabase/supabase-js";
import { ReactNode, createContext, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

type SessionAndUser = { session: AuthSession | null; user: User | null };
type AuthContextProps = {
  session: AuthSession | null;
  user: User | null;
  signIn: ({ session, user }: SessionAndUser) => void;
  signOut: () => void;
};
export const AuthContext = createContext<AuthContextProps>({
  session: null,
  user: null,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const signIn =
    async () =>
    ({ session, user }: SessionAndUser) => {
      console.log(`/// in sign in. session: ${session}`);
      console.log(`/// in sign in. user: ${user}`);
      setSession(session);
      setUser(user);
    };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
    }

    setSession(null);
    setUser(null);
  };

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error(error);
      signOut();
    } else {
      setSession(data.session);
    }
  };

  const getUser = async () => {
    if (session) {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error(error);
        signOut();
      } else {
        setUser(data.user);
      }
    }
  };

  useEffect(() => {
    if (!session) getSession();
    if (session && !user) getUser();
  }, [session, user]);

  return (
    <AuthContext.Provider value={{ session, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
