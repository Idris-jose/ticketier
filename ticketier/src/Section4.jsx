import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Section4() {
    const faqRef = useRef(null);
    const formRef = useRef(null);
    const faqInView = useInView(faqRef, { once: false, margin: '0px 0px -100px 0px' });
    const formInView = useInView(formRef, { once: false, margin: '0px 0px -100px 0px' });

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
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

    return (
        <motion.section
            className="bg-gradient-to-r from-[#2D3436] to-[#1E272E] flex flex-col md:flex-row justify-center items-center text-white min-h-screen p-6"
        >
            <motion.div className="max-w-3xl mx-auto p-4">
                <motion.h1
                    className="text-5xl font-bold text-[#00FF7F] mb-8"
                    initial="hidden"
                    animate={faqInView ? 'visible' : 'hidden'}
                    variants={variants}
                >
                    Support
                </motion.h1>

                <motion.div
                    ref={faqRef}
                    className="mb-12"
                    initial="hidden"
                    animate={faqInView ? 'visible' : 'hidden'}
                    variants={containerVariants}
                >
                    <motion.h2 className="text-2xl mb-4" variants={variants}>
                        Frequently Asked Questions
                    </motion.h2>
                    <motion.div className="space-y-4" variants={containerVariants}>
                        {[
                            {
                                question: 'How do I get a refund?',
                                answer: 'Refunds are subject to the event organizer’s policy. Check the event details or contact us for assistance.',
                            },
                            {
                                question: 'Can I change my ticket type?',
                                answer: 'Ticket changes depend on availability and event policies. Visit your dashboard to check options.',
                            },
                            {
                                question: 'What if I don’t receive my ticket?',
                                answer: 'Check your spam folder for the confirmation email. If not found, contact us with your booking details.',
                            },
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                className="border-b pb-4"
                                variants={variants}
                                whileHover={{ scale: 1.05, boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <h3 className="text-lg font-semibold">{faq.question}</h3>
                                <p>{faq.answer}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    ref={formRef}
                    className="bg-white p-6 rounded-lg shadow-md text-gray-800"
                    initial="hidden"
                    animate={formInView ? 'visible' : 'hidden'}
                    variants={variants}
                >
                    <motion.h2 className="text-2xl mb-4" variants={variants}>
                        Contact Us
                    </motion.h2>
                    <motion.form
                        onSubmit={(e) => {
                            e.preventDefault();
                            alert('Form submitted successfully!');
                            e.target.reset();
                        }}
                        variants={containerVariants}
                    >
                        <motion.div className="mb-4" variants={variants}>
                            <label htmlFor="name" className="block font-semibold mb-2">
                                Name
                            </label>
                            <motion.input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full p-2 border rounded focus:outline-none focus:border-[#1E90FF] focus:ring-2 focus:ring-[#1E90FF]"
                                required
                                whileFocus={{ x: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            />
                        </motion.div>
                        <motion.div className="mb-4" variants={variants}>
                            <label htmlFor="email" className="block font-semibold mb-2">
                                Email
                            </label>
                            <motion.input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full p-2 border rounded focus:outline-none focus:border-[#1E90FF] focus:ring-2 focus:ring-[#1E90FF]"
                                required
                                whileFocus={{ x: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            />
                        </motion.div>
                        <motion.div className="mb-4" variants={variants}>
                            <label htmlFor="message" className="block font-semibold mb-2">
                                Message
                            </label>
                            <motion.textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="w-full p-2 border rounded focus:outline-none focus:border-[#1E90FF] focus:ring-2 focus:ring-[#1E90FF]"
                                required
                                whileFocus={{ x: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            ></motion.textarea>
                        </motion.div>
                        <motion.button
                            type="submit"
                            className="bg-[#1E90FF] text-white px-4 py-2 rounded"
                            variants={variants}
                            whileHover={{ scale: 1.05, boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            Submit
                        </motion.button>
                    </motion.form>
                </motion.div>
            </motion.div>
        </motion.section>
    );
}