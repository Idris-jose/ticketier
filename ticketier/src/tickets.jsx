import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTickets } from "./ticketcontext.jsx";

export default function Tickets() {
  const { bookedTickets } = useTickets();
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#F8FAFC] text-[#2D3436] flex flex-col items-center p-8"
    >
      <h1 className="text-4xl font-bold mb-8">Your Tickets</h1>
      {bookedTickets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full">
          {bookedTickets.map((ticket, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg flex sm:flex-row flex-col relative overflow-hidden max-w-md mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
            >
              {/* Main Ticket Section */}
              <div className="p-6 flex-1">
                <h2 className="text-xl font-bold text-[#2D3436] mb-2">{ticket.eventName}</h2>
                <p className="text-gray-600">Ticket Type: {ticket.ticketType}</p>
                <p className="text-gray-600">Quantity: {ticket.quantity}</p>
                <p className="text-gray-600 font-semibold">Total: ${ticket.totalPrice}</p>
              </div>
              {/* Ticket Stub with Barcode Placeholder */}
              <div className="sm:w-24 w-full bg-gray-100 p-4 flex items-center justify-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-[#1E90FF] to-[#00FF7F] transform rotate-45"></div>
              </div>
              {/* Perforated Edge Effect */}
              <div className="absolute top-0 bottom-0 sm:left-[calc(100%-6rem)] left-0 sm:w-0 w-full h-full border-l-2 border-dashed border-gray-300 sm:border-l-0 sm:border-t-2"></div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-2xl font-semibold">No tickets booked yet.</p>
      )}
      <motion.button
        className="mt-8 px-4 py-2 bg-[#1E90FF] text-white rounded-lg hover:bg-[#00FF7F] transition-colors"
        onClick={() => navigate("/mainapp")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Back to Events
      </motion.button>
    </motion.section>
  );
}