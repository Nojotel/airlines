import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTickets } from "./redux/ticketsSlice";
import "./App.css";
import Header from "./components/Header";
import Company from "./components/Company";
import Transfer from "./components/Transfer";
import Selected from "./components/Selected";
import TicketsList from "./components/TicketsList";
import ButtonMore from "./components/ButtonMore";

import { AppDispatch } from "./redux/store";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  return (
    <div className="container">
      {windowWidth < 1060 ? (
        <div className="container">
          <Header />
          <Selected />
          <div className="column-container mobile">
            <Transfer />
            <Company />
          </div>
          <TicketsList />
          <ButtonMore />
        </div>
      ) : (
        <div className="container">
          <Header />
          <div className="row-container">
            <div className="column-container mobile">
              <Transfer />
              <Company />
            </div>
            <div className="column-container">
              <Selected />
              <TicketsList />
              <ButtonMore />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
