import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './client.js';

const Login = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        navigate('/mainapp');
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message || 'Google login failed.');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const email = e.target[0].value;

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setResetSent(true);
    } catch (err) {
      setError(err.message || 'Error sending reset email.');
    } finally {
      setLoading(false);
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
          Welcome Back to Ticketier
        </h1>
        <p className="text-[#2D3436] mb-8">
          Log in to access your tickets and events
        </p>

        {error && (
          <div className="mb-4 text-[#FF6B6B]">{error}</div>
        )}

        {resetSent ? (
          <div className="mb-4 text-[#00FF7F]">
            Password reset email sent! Check your inbox.
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <form onSubmit={handleSubmit}>
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
                  placeholder="Enter your password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#1E90FF]"
                  required
                  disabled={loading}
                />
              </div>
              <div className="mb-6 text-sm text-left">
                <Link to="#" onClick={() => setResetSent(false)} className="text-[#1E90FF] hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full bg-[#1E90FF] text-white font-bold py-3 rounded-md hover:bg-[#1C86EE] transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Logging In...' : 'Log In'}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative mb-4">
                <span className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300"></span>
                </span>
                <span className="relative bg-white px-2 text-gray-500">
                  Or log in with
                </span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleGoogleLogin}
                  className="flex-1 border border-gray-300 text-[#2D3436] py-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
                  disabled={loading}
                >
                  Google
                </button>
                <Link to="/signup" className="flex-1">
                  <button className="w-full border border-gray-300 text-[#2D3436] py-2 rounded-md hover:bg-gray-100">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {resetSent || (
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-4">
            <form onSubmit={handlePasswordReset}>
              <h2 className="text-xl font-semibold mb-4 text-[#2D3436]">
                Reset Password
              </h2>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#1E90FF]"
                  required
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1E90FF] text-white font-bold py-3 rounded-md hover:bg-[#1C86EE] transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Email'}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Login;