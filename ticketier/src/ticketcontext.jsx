import { createContext, useContext, useState } from "react";

const TicketContext = createContext();

export function TicketProvider({ children }) {
  const [bookedTickets, setBookedTickets] = useState([]);

  const addTicket = (ticket) => {
    setBookedTickets((prev) => [...prev, ticket]);
  };

  return (
    <TicketContext.Provider value={{ bookedTickets, addTicket }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  return useContext(TicketContext);
}