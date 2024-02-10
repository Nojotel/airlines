import { useDispatch } from "react-redux";
import { sortByPrice, sortByDuration, sortByOptimal } from "../redux/ticketsSlice";
import { useState } from "react";
import style from "./css/Selected.module.css";

const Selected = () => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(parseInt(localStorage.getItem("activeButton")) || 1);

  const handleClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
    localStorage.setItem("activeButton", buttonNumber);

    if (buttonNumber === 1) {
      dispatch(sortByPrice());
    } else if (buttonNumber === 2) {
      dispatch(sortByDuration());
    } else if (buttonNumber === 3) {
      dispatch(sortByOptimal());
    }
  };

  return (
    <div className={style.container}>
      <button className={`${style.button1} ${activeButton === 1 ? style.active : ""}`} onClick={() => handleClick(1)}>
        <div className={style.text}>Самый дешевый</div>
      </button>
      <button className={`${style.button2} ${activeButton === 2 ? style.active : ""}`} onClick={() => handleClick(2)}>
        <div className={style.text}>Самый быстрый</div>
      </button>
      <button className={`${style.button3} ${activeButton === 3 ? style.active : ""}`} onClick={() => handleClick(3)}>
        <div className={style.text}>Самый оптимальный</div>
      </button>
    </div>
  );
};

export default Selected;
