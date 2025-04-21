import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ticket from './assets/pngwing.com (3).png';

export default function Section2() {
    const textRef = useRef(null);
    const imageRef = useRef(null);
    const textInView = useInView(textRef, { once: false, margin: '0px 0px -100px 0px' });
    const imageInView = useInView(imageRef, { once: false, margin: '0px 0px -100px 0px' });

    const variants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    const imageVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <motion.section
            className="bg-gradient-to-r from-[#2D3436] to-[#1E272E] flex flex-col md:flex-row justify-center items-center text-white min-h-screen p-6"
        >
            <motion.div
                ref={textRef}
                className="max-w-lg space-y-4 text-center md:text-left"
                initial="hidden"
                animate={textInView ? 'visible' : 'hidden'}
                variants={variants}
            >
                <motion.h1
                    className="text-4xl font-bold"
                    variants={variants}
                >
                    About Us
                </motion.h1>
                <motion.p
                    className="text-lg leading-relaxed"
                    variants={variants}
                    transition={{ delay: 0.1 }}
                >
                    At <span className="text-[#00FF7F]">Ticketier</span>, we’re passionate about connecting people to unforgettable experiences. Our mission is to make event ticketing seamless, secure, and accessible for everyone. Whether you’re chasing the thrill of front-row seats or searching for budget-friendly options, our platform is your gateway to a world of events.
                </motion.p>
                <motion.p
                    className="text-lg leading-relaxed"
                    variants={variants}
                    transition={{ delay: 0.2 }}
                >
                    Our vision? To be the ultimate destination for event enthusiasts, delivering excitement, reliability, and memories that last a lifetime. Join us on this journey and redefine how you experience events!
                </motion.p>
                <motion.div
                    className="flex justify-center md:justify-start space-x-4"
                    variants={variants}
                    transition={{ delay: 0.3 }}
                >
                    <motion.button
                        className="bg-[#1E90FF] text-black px-4 py-2 rounded"
                        whileHover={{ x: 10, boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        Learn More
                    </motion.button>
                    <motion.button
                        className="border border-[#1E90FF] text-[#1E90FF] px-4 py-2 rounded"
                        whileHover={{ x: 10, backgroundColor: '#1E90FF', color: '#000', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        Contact Us
                    </motion.button>
                </motion.div>
            </motion.div>
            <motion.img
                ref={imageRef}
                src={ticket}
                alt="Ticket"
                className="hidden md:block w-1/2 h-auto object-cover rounded-lg shadow-lg mt-6 md:mt-0 md:ml-6"
                initial="hidden"
                animate={imageInView ? 'visible' : 'hidden'}
                variants={imageVariants}
            />
        </motion.section>
    );
}