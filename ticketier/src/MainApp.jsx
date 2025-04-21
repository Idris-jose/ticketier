import MainAppNav from "./MainAppNav.jsx"
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function MainApp() {

   const ref = useRef(null);
      const isInView = useInView(ref, { once: false, margin: '0px 0px -100px 0px' });
  
      
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

    return( 
      <section className="bg-gradient-to-br from-[#2D3436] to-[#1E272E]   h-screen items-center text-center space-y-6">
      <MainAppNav/>
      <motion.h1
                className="text-7xl text-white font-extrabold"
                variants={variants}
                transition={{ delay: 0.1 }}
            >
                Welcome to <span className="text-[#00FF7F]">Ticketier</span>
            </motion.h1>
        </section>
      
    )
}