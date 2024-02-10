import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTransferFilter } from "../redux/ticketsSlice";
import style from "./css/Transfer.module.css";
const Transfer = () => {
  const dispatch = useDispatch();
  const initialSelectedButtons = JSON.parse(localStorage.getItem("selectedButtons")) || ["Без пересадок"];
  const [selectedButtons, setSelectedButtons] = useState(initialSelectedButtons);
  useEffect(() => {
    localStorage.setItem("selectedButtons", JSON.stringify(selectedButtons));
    dispatch(setTransferFilter(selectedButtons.map((button) => getTransferCountFromButtonName(button))));
  }, [selectedButtons, dispatch]);
  const handleClick = (buttonName) => {
    const index = selectedButtons.indexOf(buttonName);
    if (index === -1) {
      setSelectedButtons([...selectedButtons, buttonName]);
    } else {
      if (selectedButtons.length === 1) {
        return;
      }
      setSelectedButtons(selectedButtons.filter((btn) => btn !== buttonName));
    }
  };
  function getTransferCountFromButtonName(buttonName) {
    switch (buttonName) {
      case "Без пересадок":
        return 0;
      case "1 пересадка":
        return 1;
      case "2 пересадки":
        return 2;
      case "3 пересадки":
        return 3;
      default:
        return 0;
    }
  }
  return (
    <div className={style.container}>
      <div className={style.title}>Количество пересадок</div>
      <div className={style.company}>
        <button className={selectedButtons.includes("Без пересадок") ? `${style.radio} ${style.active}` : style.radio} onClick={() => handleClick("Без пересадок")} />
        <div className={style.text}>Без пересадок</div>
      </div>
      <div className={style.company}>
        <button className={selectedButtons.includes("1 пересадка") ? `${style.radio} ${style.active}` : style.radio} onClick={() => handleClick("1 пересадка")} />
        <div className={style.text}>1 пересадка</div>
      </div>
      <div className={style.company}>
        <button className={selectedButtons.includes("2 пересадки") ? `${style.radio} ${style.active}` : style.radio} onClick={() => handleClick("2 пересадки")} />
        <div className={style.text}>2 пересадки</div>
      </div>
      <div className={style.company}>
        <button className={selectedButtons.includes("3 пересадки") ? `${style.radio} ${style.active}` : style.radio} onClick={() => handleClick("3 пересадки")} />
        <div className={style.text}>3 пересадки</div>
      </div>
    </div>
  );
};
export default Transfer;
