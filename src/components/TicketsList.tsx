import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectTickets } from "../redux/ticketsSlice";
import { RootState } from "../redux/store";
import style from "./css/TicketsList.module.css";
import TicketCard from "./TicketCard";

export const TicketsList: React.FC = () => {
  const tickets = useSelector(selectTickets);
  const transferFilter = useSelector((state: RootState) => state.tickets.filters.transfers);
  const companyFilter = useSelector((state: RootState) => state.tickets.filters.companies);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [tickets]);

  const filteredTickets = tickets.filter((ticket) => ticket.connectionAmount !== null && transferFilter.includes(ticket.connectionAmount) && companyFilter.includes(ticket.company));

  return (
    <div id="tickets-container" className={`${style.container} ${loaded ? style.loaded : ""}`} style={{ height: "auto" }}>
      {filteredTickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketsList;
