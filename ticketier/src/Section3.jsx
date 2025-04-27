import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './client.js';

export default function Section3() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const steps = [
    {
      number: 1,
      title: '🎉 Find Your Event',
      description:
        'Explore our Events page or use the search bar to uncover events that spark your interest. Dive into event details like date, location, and ticket prices with just a click.',
      color: 'text-blue-500',
    },
    {
      number: 2,
      title: '🎟️ Select Your Tickets',
      description:
        'Choose your ticket type—General Admission, VIP, or more—and select the quantity. For seated events, pick your perfect spot using our interactive seating chart.',
      color: 'text-lime-500',
    },
    {
      number: 3,
      title: '🛒 Review and Checkout',
      description:
        'Double-check your event details and ticket choices in the summary. Enter your payment details securely and proceed to checkout with confidence.',
      color: 'text-coral-500',
    },
    {
      number: 4,
      title: '✅ Confirm Your Booking',
      description:
        'Complete your purchase and receive an instant email confirmation with your ticket details. Download your ticket and get ready for an amazing experience!',
      color: 'text-blue-400',
    },
  ];

  return (
    <motion.section
      className="flex min-h-screen items-center justify-center bg-gray-50 p-6"
      aria-label="How to Book a Ticket on Ticketier"
    >
      <motion.div
        ref={ref}
        className="mx-auto max-w-7xl p-3 rounded-lg shadow-lg text-center"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <motion.h1
          className="mb-6 text-3xl font-bold md:text-5xl text-gray-800"
          variants={itemVariants}
        >
          How to Book a Ticket on <span className="text-[#00FF7F]">Ticketier</span>
        </motion.h1>
        <motion.p
          className="mb-8 min-w-2xs text-gray-600 text-sm md:text-base"
          variants={itemVariants}
        >
          Booking your event tickets has never been this fun and effortless! Follow these steps and get ready for an unforgettable experience:
        </motion.p>
        <motion.div
          className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row"
          variants={containerVariants}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              className="relative flex-1 rounded-lg bg-white p-6 shadow-md"
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#00FF7F] text-lg font-bold text-white shadow-md">
                {step.number}
              </div>
              <h2 className={`mb-2 text-xl font-semibold md:text-2xl ${step.color}`}>
                {step.title}
              </h2>
              <p className="text-gray-700">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.button
          className="bg-blue-500 m-6 text-white px-6 py-3 rounded-lg shadow-lg disabled:opacity-50"
          variants={itemVariants}
          whileHover={{ scale: 1.05, boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={handleButtonClick}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Explore Events Now'}
        </motion.button>
      </motion.div>
    </motion.section>
  );
}