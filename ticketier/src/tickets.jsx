import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTickets } from "./ticketcontext.jsx";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { useDarkMode } from "./toogledarkmode.jsx";

export default function Tickets() {
  const { bookedTickets } = useTickets();
  const navigate = useNavigate();
  const ticketRefs = useRef({});
  const { darkMode } = useDarkMode();

  const HandledownloadTicket = async (ticketId) => {
    const ticketElement = ticketRefs.current[ticketId];
    if (!ticketElement) {
      alert("Error: Ticket element not found!");
      return;
    }

    try {
      const canvas = await html2canvas(ticketElement, {
        scale: 2,
        useCORS: true,
      });

      const imageData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imageData;
      link.download = `ticket-${ticketId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert("Ticket Downloaded Successfully!");
    } catch (error) {
      console.error("Error downloading ticket:", error);
      alert("Failed to download ticket. Please try again.");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen flex flex-col items-center p-8 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-[#F8FAFC] text-[#2D3436]"
      }`}
    >
      <h1 className="text-4xl font-bold mb-8">Your Tickets</h1>
      {bookedTickets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full">
          {bookedTickets.map((ticket, index) => {
            const ticketId = `${ticket.eventName}-${ticket.ticketType}-${index}`;
            return (
              <motion.div
                key={index}
                ref={(el) => (ticketRefs.current[ticketId] = el)}
                className={`rounded-lg shadow-lg flex sm:flex-row flex-col relative overflow-hidden max-w-md mx-auto ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
                initial={{ y:   50 , opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="p-6 flex-1">
                  <h2 className={`text-xl font-bold mb-2 ${
                    darkMode ? "text-gray-100" : "text-[#2D3436]"
                  }`}>{ticket.eventName}</h2>
                  <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Date: {ticket.eventDate}</p>
                  <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Time: {ticket.eventTime}</p>
                  <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Ticket Type: {ticket.ticketType}</p>
                  <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Quantity: {ticket.quantity}</p>
                  <p className={`font-semibold ${darkMode ? "text-gray-200" : "text-gray-600"}`}>
                    Total: ${ticket.totalPrice}
                  </p>
                </div>
                <div className={`sm:w-24 w-full p-4 flex items-center justify-center relative ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}>
                  <div className="w-16 h-16 bg-gradient-to-r from-[#1E90FF] to-[#00FF7F] transform rotate-45"></div>
                </div>
                <div className={`absolute top-0 bottom-0 sm:left-[calc(100%-6rem)] left-0 sm:w-0 w-full h-full border-dashed ${
                  darkMode ? "border-gray-600" : "border-gray-300"
                } sm:border-l-0 sm:border-t-2 border-l-2`}></div>
                <button
                  className={`absolute top-2 right-2 rounded-full p-2 text-white transition-colors ${
                    darkMode
                      ? "bg-[#FF6347] hover:bg-[#FF4500]"
                      : "bg-[#FF6347] hover:bg-[#FF4500]"
                  }`}
                  onClick={() => HandledownloadTicket(ticketId)}
                  aria-label={`Download ticket for ${ticket.eventName}`}
                >
                  Download Ticket
                </button>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <p className="text-2xl font-semibold">No tickets booked yet.</p>
      )}
      <motion.button
        className={`mt-8 px-4 py-2 rounded-lg text-white transition-colors ${
          darkMode ? "bg-[#1E90FF] hover:bg-[#00FF7F]" : "bg-[#1E90FF] hover:bg-[#00FF7F]"
        }`}
        onClick={() => navigate("/mainapp")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Back to Events
      </motion.button>
    </motion.section>
  );
}