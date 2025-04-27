import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './client.js';

export default function Section1() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '0px 0px -100px 0px' });
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setIsLoggedIn(!!session);
      } catch (err) {
        console.error('Error checking session:', err.message);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate('/mainapp');
    } else {
      navigate('/login');
    }
  };

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.section
      ref={ref}
      className="h-screen flex flex-col justify-center items-center text-center space-y-6 bg-gray-50"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
    >
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold text-gray-800"
        variants={variants}
        transition={{ delay: 0.1 }}
      >
        Welcome to <span className="text-[#00FF7F]">Ticketier</span>
      </motion.h1>
      <motion.h3
        className="text-lg md:text-xl text-gray-600"
        variants={variants}
        transition={{ delay: 0.2 }}
      >
        Your Gateway to Unforgettable Events!
      </motion.h3>
      <motion.p
        className="max-w-2xl text-gray-600 text-sm md:text-base"
        variants={variants}
        transition={{ delay: 0.3 }}
      >
        Discover a world of live experiences with <span className="font-semibold">Ticketier</span>, the easiest way to find and book tickets to concerts, festivals, theater shows, and more. From local gigs to global events, we’ve got you covered with secure booking and a seamless experience.
      </motion.p>
      <motion.button
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg disabled:opacity-50"
        variants={variants}
        whileHover={{ scale: 1.05, boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
        onClick={handleButtonClick}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Explore Events Now'}
      </motion.button>
    </motion.section>
  );
}