
     import { createContext, useContext, useState, useEffect } from "react";
     import { supabase } from "./client.js";

     const AuthContext = createContext();

     export function AuthProvider({ children }) {
       const [user, setUser] = useState(null);

       useEffect(() => {
         const getSession = async () => {
           try {
             const { data: { session }, error } = await supabase.auth.getSession();
             if (error) throw error;
             setUser(session?.user ?? null);
           } catch (error) {
             console.error("Error fetching session:", error);
           }
         };
         getSession();

         const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
           setUser(session?.user ?? null);
         });

         return () => authListener.subscription.unsubscribe();
       }, []);

       const signOut = async () => {
         try {
           const { error } = await supabase.auth.signOut();
           if (error) throw error;
           setUser(null);
         } catch (error) {
           console.error("Error signing out:", error);
         }
       };

       return (
         <AuthContext.Provider value={{ user, signOut }}>
           {children}
         </AuthContext.Provider>
       );
     }

     export function useAuth() {
       return useContext(AuthContext);
     }
    