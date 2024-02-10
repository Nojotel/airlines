import React from "react";
import style from "./css/TicketCard.module.css";
import pobeda from "../img/pobeda.png";
import redwings from "../img/redwings.png";
import s7airlines from "../img/s7airlines.png";
interface Ticket {
  price: number;
  currency: string;
  from: string;
  to: string;
  time: {
    startTime: string;
    endTime: string;
  };
  duration: number;
  connectionAmount: number | null;
  company: string;
}
function formatDuration(duration: number): string {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}ч ${minutes}мин`;
}
const TicketCard: React.FC<{ ticket: Ticket }> = ({ ticket }) => {
  let logo;
  switch (ticket.company) {
    case "Pobeda":
      logo = pobeda;
      break;
    case "Red Wings":
      logo = redwings;
      break;
    case "S7 Airlines":
      logo = s7airlines;
      break;
    default:
      logo = pobeda;
  }
  const formattedPrice = ticket.price.toLocaleString("ru-RU") + " Р";
  return (
    <div className={style.container}>
      <div className={style.price}>{formattedPrice}</div>
      <img className={style.logo} src={logo} alt={ticket.company} />
      <div className={style.text1}>
        {ticket.from} - {ticket.to}
      </div>
      <div className={style.text2}>В пути</div>
      <div className={style.text3}>Пересадки</div>
      <div className={style.textBold1}>
        {ticket.time.startTime} - {ticket.time.endTime}
      </div>
      <div className={style.textBold2}>{formatDuration(ticket.duration)}</div>
      <div className={style.textBold3}>{ticket.connectionAmount === null ? "Без пересадок" : ticket.connectionAmount === 0 ? "Без пересадок" : ticket.connectionAmount === 1 ? "1 пересадка" : ticket.connectionAmount === 2 ? "2 пересадки" : ticket.connectionAmount === 3 ? "3 пересадки" : `${ticket.connectionAmount} пересадки`}</div>
    </div>
  );
};
export default TicketCard;
