import { useState, useEffect } from 'react';
import { supabase } from '/Users/ayaanjha/Hack-Cupertino-2025/src/backend/SupabaseClient.jsx';

import "./Login.css"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

const signInWithGoogle = async () => {
  const { user, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.error('Login failed:', error.message);
  } else {
    console.log('User logged in:', user);
  }
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  window.location.reload();
  if (error) {
    console.error('Sign-out error:', error.message);
  } else {
    console.log('User signed out');
  }
};

function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Session fetch error:", error.message);
        return;
      }
      setUser(session?.user ?? null);
    };
  
    getUser();
  }, []);
  

  return (
    <div>
      {user ? (
        <div>
          <button className='LoginButtonTrue' onClick={signOut}>
          {user.user_metadata.full_name.split(" ")[0].substring(0, 1) + user.user_metadata.full_name.split(" ")[1].substring(0, 1)}
          </button>
        </div>
      ) : (
        <button className='LoginButtonFalse' onClick={signInWithGoogle}>
          Sign In
        </button>
      )}
    </div>
  );
}

export default Login;
