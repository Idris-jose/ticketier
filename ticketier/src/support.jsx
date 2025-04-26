import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTickets } from "./ticketcontext.jsx";
import { supabase } from "./client.js";
import html2canvas from "html2canvas";
import { useDarkMode } from "./toogledarkmode.jsx";

export default function Support() {
  const { darkMode } = useDarkMode();
  const { bookedTickets } = useTickets();
  const navigate = useNavigate();
  const ticketRefs = useRef({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(false);

  // FAQ data
  const faqs = [
    {
      question: "How do I book a ticket?",
      answer: "Browse events on the Events page, select an event, choose your ticket type and quantity, then click 'Book Tickets'.",
    },
    {
      question: "How do I download my ticket?",
      answer: "Go to 'My Tickets' and click 'Download Ticket' to save it as a PNG. See below for direct downloads.",
    },
    {
      question: "What if I need a refund?",
      answer: "Contact us with your ticket details. Refunds are subject to event policies.",
    },
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(false);

    if (!formData.name || !formData.email || !formData.message) {
      setFormError("Please fill out all fields.");
      return;
    }

    try {
      const { error } = await supabase.from("support_requests").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setFormSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting support request:", error);
      setFormError("Failed to submit your request. Please try again.");
    }
  };

  // Handle ticket download
  const handleDownloadTicket = async (ticketId) => {
    const ticketElement = ticketRefs.current[ticketId];
    if (!ticketElement) {
      setFormError("Error: Ticket element not found!");
      return;
    }

    try {
      const canvas = await html2canvas(ticketElement, { scale: 2, useCORS: true });
      const imageData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageData;
      link.download = `ticket-${ticketId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setFormSuccess(true);
      setFormError(null);
    } catch (error) {
      console.error("Error downloading ticket:", error);
      setFormError("Failed to download ticket. Please try again.");
    }
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, delayChildren: 0.2, staggerChildren: 0.1 } },
  };

  return (
    <motion.section
      className={`min-h-screen flex flex-col items-center p-4 md:p-8 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-[#F8FAFC] text-[#2D3436]"
      }`}
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      {/* Header */}
      <motion.div
        className="w-full max-w-7xl flex justify-between items-center mb-8"
        variants={itemVariants}
      >
        <h1 className="text-3xl md:text-4xl font-bold">
          <span className="text-[#1E90FF]">Ticketier</span> Support
        </h1>
        <motion.button
          className={`px-4 py-2 rounded-lg text-white transition-colors ${
            darkMode ? "bg-[#1E90FF] hover:bg-[#00FF7F]" : "bg-[#1E90FF] hover:bg-[#00FF7F]"
          }`}
          onClick={() => navigate("/mainapp")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to Events"
        >
          Back to Events
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="w-full max-w-7xl flex flex-col md:flex-row gap-8"
        variants={itemVariants}
      >
        {/* FAQ Section */}
        <motion.div
          className={`flex-1 rounded-lg shadow-md p-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <motion.div key={index} className="mb-4" variants={itemVariants}>
              <h3 className={`text-lg font-medium ${
                darkMode ? "text-gray-100" : "text-[#2D3436]"
              }`}>{faq.question}</h3>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>{faq.answer}</p>
            </motion.div>
          ))}
          {/* Ticket Downloads */}
          {bookedTickets.length > 0 && (
            <motion.div className="mt-6" variants={itemVariants}>
              <h3 className={`text-lg font-medium ${
                darkMode ? "text-gray-100" : "text-[#2D3436]"
              } mb-2`}>Your Tickets</h3>
              {bookedTickets.map((ticket, index) => {
                const ticketId = `${ticket.eventName}-${ticket.ticketType}-${index}`;
                return (
                  <motion.div
                    key={ticketId}
                    ref={(el) => (ticketRefs.current[ticketId] = el)}
                    className={`p-4 rounded-lg mb-2 ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                    variants={itemVariants}
                  >
                    <p className={`font-medium ${darkMode ? "text-gray-100" : "text-[#2D3436]"}`}>
                      {ticket.eventName}
                    </p>
                    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Type: {ticket.ticketType}</p>
                    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Date: {ticket.eventDate}</p>
                    <motion.button
                      className={`mt-2 px-3 py-1 text-white rounded-lg transition-colors ${
                        darkMode
                          ? "bg-[#FF6347] hover:bg-[#FF4500]"
                          : "bg-[#FF6347] hover:bg-[#FF4500]"
                      }`}
                      onClick={() => handleDownloadTicket(ticketId)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Download ticket for ${ticket.eventName}`}
                    >
                      Download Ticket
                    </motion.button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className={`flex-1 rounded-lg shadow-md p-6 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className={darkMode ? "block text-gray-400 mb-1" : "block text-gray-600 mb-1"}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF] ${
                  darkMode ? "bg-gray-700 text-gray-100 border-gray-600" : "bg-white text-[#2D3436] border-gray-300"
                }`}
                aria-required="true"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className={darkMode ? "block text-gray-400 mb-1" : "block text-gray-600 mb-1"}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF] ${
                  darkMode ? "bg-gray-700 text-gray-100 border-gray-600" : "bg-white text-[#2D3436] border-gray-300"
                }`}
                aria-required="true"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className={darkMode ? "block text-gray-400 mb-1" : "block text-gray-600 mb-1"}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E90FF] ${
                  darkMode ? "bg-gray-700 text-gray-100 border-gray-600" : "bg-white text-[#2D3436] border-gray-300"
                }`}
                rows="4"
                aria-required="true"
              ></textarea>
            </div>
            {formError && <p className="text-[#FF6B6B] mb-2">{formError}</p>}
            {formSuccess && (
              <p className="text-[#00FF7F] mb-2">Request submitted successfully!</p>
            )}
            <motion.button
              type="submit"
              className={`w-full text-white rounded-lg py-2 transition-colors ${
                darkMode ? "bg-[#1E90FF] hover:bg-[#00FF7F]" : "bg-[#1E90FF] hover:bg-[#00FF7F]"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Submit support request"
            >
              Submit
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}