"use client";

import { getSession } from "@/actions/auth";
import { Session } from "@/actions/session";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<
  [Session | null, (session: Session) => void, () => void]
>([null, () => {}, () => {}]);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session) {
        setSession(session);
      }
    };

    fetchSession();
  }, []);

  const logoutSession = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider value={[session, setSession, logoutSession]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
