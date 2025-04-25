import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import MainAppNav from "./navbar.jsx";
import events from "./eventlist.js";
import { useTickets } from "./ticketcontext.jsx";

// Map event categories to open-source image URLs
const getEventImage = (event) => {
  return event.image; // All events have valid images
};

const EventModal = ({ event: { name = '', date = '', time = '', location = '', description = '', ticketTypes = [], image = '' } = {}, onClose }) => {
  const navigate = useNavigate();
  const { addTicket } = useTickets();

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
  };

  const [selected, setSelected] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Handle ticket type dropdown change
  const handleChange = (e) => {
    setSelected(e.target.value);
    setQuantity(1); // Reset quantity when type changes
  };

  // Handle quantity input change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  // Find the selected ticket type object
  const selectedTicket = ticketTypes.find((t) => t.type === selected);

  // Handle booking tickets
  const handleBookTickets = () => {
    if (selected && quantity >= 1) {
      const ticket = {
        eventName: name,
        eventDate: date,
        eventTime: time,
        ticketType: selected,
        quantity,
        totalPrice: selectedTicket?.price * quantity || 0,
      };
      addTicket(ticket);
      onClose();
      navigate("/mainapp/tickets");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#2D3436] bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${name}`}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-[#F8FAFC] rounded-2xl p-6 max-w-lg w-full m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image}
          alt={`${name} event`}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold text-[#2D3436]">{name}</h2>
        <p className="text-gray-600 mb-2">
          {date} | {time} | {location}
        </p>
        <p className="text-gray-700">{description}</p>

        {/* Ticket Type Dropdown */}
        <p className="text-gray-600 mt-4 text-left">Choose ticket type:</p>
        <select
          value={selected}
          onChange={handleChange}
          className="w-full p-2 mt-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
          aria-label="Select ticket type"
        >
          <option value="">Select a ticket type</option>
          {ticketTypes.map((ticket) => (
            <option key={ticket.type} value={ticket.type}>
              {ticket.type} (${ticket.price})
            </option>
          ))}
        </select>

        {/* Ticket Quantity Input */}
        {selected && (
          <>
            <p className="text-gray-600 mt-4 text-left">Choose ticket amount:</p>
            <input
              type="number"
              min="1"
              max={selectedTicket?.available || 1}
              value={quantity}
              onChange={handleQuantityChange}
              className="w-full p-2 mt-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
              aria-label="Select ticket amount"
            />
          </>
        )}

        {/* Selection Feedback */}
        {selected && (
          <p className="text-[#1E90FF] font-semibold mt-2">
            Selected: {quantity} x {selected} (
            ${selectedTicket?.price * quantity || 0})
          </p>
        )}

        <div className="mt-4 flex gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#2D3436] text-white rounded-lg hover:bg-[#FF6B6B] transition-colors"
            aria-label="Close event details"
          >
            Close
          </button>
          <button
            onClick={handleBookTickets}
            disabled={!selected || quantity < 1}
            className={`px-4 py-2 rounded-lg text-white transition-colors ${
              selected && quantity >= 1
                ? "bg-[#1E90FF] hover:bg-[#00FF7F]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            aria-label={`Book tickets for ${name}`}
          >
            Book Tickets
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function MainApp() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "0px 0px -100px 0px" });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Filter events based on search term
  const filteredEvents = events.filter(
    (event) =>
      event.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.keywords?.some((keyword) =>
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Get unique categories
  const categories = Array.from(new Set(events.map((event) => event.category)));

  // Check if searchTerm is a category
  const isCategorySelected = searchTerm && categories.map(c => c.toLowerCase()).includes(searchTerm.toLowerCase());

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <MainAppNav />
      <section
        className={`${
          darkMode ? "bg-[#2D3436] text-white" : "bg-[#F8FAFC] text-[#2D3436]"
        } min-h-screen flex flex-col items-center text-center space-y-6 px-4 py-8`}
      >
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-[#1E90FF] text-white rounded-lg hover:bg-[#00FF7F] transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          Welcome to{" "}
          <span className={darkMode ? "text-[#00FF7F]" : "text-[#1E90FF]"}>
            Ticketier
          </span>
        </motion.h1>
        <motion.div
          className="relative w-full max-w-lg mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <label htmlFor="search" className="sr-only">
            Search for an event
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search for an event..."
            className={`w-full ${
              darkMode
                ? "text-white bg-[#2D3436] placeholder-gray-500"
                : "text-[#2D3436] bg-white placeholder-gray-400"
            } rounded-full p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] shadow-md`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search for an event"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M16.65 10.65a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </motion.div>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {isCategorySelected && (
            <>
              {filteredEvents.length > 0 ? (
                <p className="text-lg font-light">
                  Found {filteredEvents.length} event
                  {filteredEvents.length > 1 ? "s" : ""}
                </p>
              ) : (
                <p className="text-lg font-light">No events found.</p>
              )}
            </>
          )}

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-4 py-2 ${
                  darkMode
                    ? "bg-[#00FF7F] text-[#2D3436]"
                    : "bg-[#1E90FF] text-white"
                } rounded-full hover:bg-[#FF6B6B] transition-colors`}
                onClick={() => setSearchTerm(category.toLowerCase())}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto"
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className={`${
                  darkMode ? "bg-[#2D3436] text-white" : "bg-white text-[#2D3436]"
                } rounded-lg shadow-lg p-4`}
                variants={variants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={getEventImage(event)}
                  alt={`${event.name} ${event.category} event`}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold">{event.name}</h2>
                  <p className="text-gray-600">
                    {event.date} | {event.time}
                  </p>
                  <p className="text-gray-600">{event.location}</p>
                  <p className="font-semibold mt-2">
                    {event.ticketTypes[0]?.price
                      ? `From $${event.ticketTypes[0].price}`
                      : "Free"}
                  </p>
                  <motion.button
                    className={`mt-4 w-full ${
                      darkMode
                        ? "bg-[#00FF7F] text-[#2D3436]"
                        : "bg-[#1E90FF] text-white"
                    } rounded-full py-2 hover:bg-[#FF6B6B] transition-colors`}
                    onClick={() => setSelectedEvent(event)}
                    aria-label={`View details for ${event.name}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-2xl font-semibold">
              No events found.
            </p>
          )}
        </motion.div>

        <AnimatePresence>
          {selectedEvent && (
            <EventModal
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}