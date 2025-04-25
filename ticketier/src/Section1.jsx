import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Section1() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: '0px 0px -100px 0px' });

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <motion.section
            ref={ref}
            className="h-screen flex flex-col justify-center items-center text-center space-y-6"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants}
        >
            <motion.h1
                className="text-7xl font-extrabold"
                variants={variants}
                transition={{ delay: 0.1 }}
            >
                Welcome to <span className="text-[#00FF7F]">Ticketier</span>
            </motion.h1>
            <motion.h3
                className="text-xl"
                variants={variants}
                transition={{ delay: 0.2 }}
            >
                Your Gateway to Unforgettable Events!
            </motion.h3>
            <motion.p
                className="max-w-2xl text-gray-600"
                variants={variants}
                transition={{ delay: 0.3 }}
            >
                Discover a world of live experiences with <span className="font-semibold">Ticketier</span>, the easiest way to find and book tickets to concerts, festivals, theater shows, and more. From local gigs to global events, we’ve got you covered with secure booking and a seamless experience.
            </motion.p>
            <motion.button
                className="bg-[#1E90FF] text-white px-6 py-3 rounded-lg shadow-lg"
                variants={variants}
                whileHover={{ scale: 1.05, boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                Explore Events Now
            </motion.button>
        </motion.section>
    );
}