import React, { useState, useEffect } from "react";
import style from "./css/ButtonMore.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoreTickets, sortByPrice, sortByDuration, sortByOptimal } from "../redux/ticketsSlice";

export const ButtonMore = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [allTicketsLoaded, setAllTicketsLoaded] = useState(false);
  const sortOption = useSelector((state) => state.tickets.sort);

  const handleLoadMoreClick = () => {
    setLoading(true);
    dispatch(fetchMoreTickets()).then((action) => {
      if (fetchMoreTickets.fulfilled.match(action)) {
        if (action.payload.length < 3) {
          setAllTicketsLoaded(true);
        }
        switch (sortOption) {
          case "price":
            dispatch(sortByPrice());
            break;
          case "duration":
            dispatch(sortByDuration());
            break;
          case "connections":
            dispatch(sortByOptimal());
            break;
          default:
            break;
        }
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    switch (sortOption) {
      case "price":
        dispatch(sortByPrice());
        break;
      case "duration":
        dispatch(sortByDuration());
        break;
      case "connections":
        dispatch(sortByOptimal());
        break;
      default:
        break;
    }
  }, [sortOption, dispatch]);

  return (
    <div className={style.container}>
      {loading ? (
        <div className={style.text}>Загрузка...</div>
      ) : (
        <button className={style.button} onClick={handleLoadMoreClick} disabled={loading || allTicketsLoaded}>
          {allTicketsLoaded ? <div className={style.text}>Билетов больше нет...</div> : <div className={style.text}>Загрузить еще билеты</div>}
        </button>
      )}
    </div>
  );
};
export default ButtonMore;
