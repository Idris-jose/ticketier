import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './client.js';

const SignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;

      if (data.user) {
        alert('Sign-up successful! Please check your email for verification.');
        navigate('/mainapp');
      }
    } 
    catch (err) {
      setError(err.message || 'An error occurred during sign-up.');
    } 
    finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message || 'Google sign-up failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col relative overflow-hidden rounded-3xl">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.1 }}
      >
        <filter id="grainy">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainy)" />
      </svg>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#00FF7F] mb-2">
          Start Your Ticketier Journey
        </h1>
        <p className="text-[#2D3436] mb-8">
          with the latest ticket booking technology
        </p>

        {error && (
          <div className="mb-4 text-[#FF6B6B]">{error}</div>
        )}

        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Choose a username"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#1E90FF]"
                required
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#1E90FF]"
                required
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Create a password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#1E90FF]"
                required
                disabled={loading}
              />
            </div>
            <div className="mb-6 text-sm text-left">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" required disabled={loading} />
                I agree to the{' '}
                <Link to="/terms" className="text-[#00FF7F] hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-[#00FF7F] hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#1E90FF] text-white font-bold py-3 rounded-md hover:bg-[#1C86EE] transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative mb-4">
              <span className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300"></span>
              </span>
              <span className="relative bg-white px-2 text-gray-500">
                Or sign up with
              </span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleGoogleSignUp}
                className="flex-1 border border-gray-300 text-[#2D3436] py-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
                disabled={loading}
              >
                Google
              </button>
              <Link to="/login" className="flex-1">
                <button className="w-full border border-gray-300 text-[#2D3436] py-2 rounded-md hover:bg-gray-100">
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;