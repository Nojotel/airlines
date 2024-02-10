import React from "react";
import style from "./css/Header.module.css";
import planeImg from "../../src/img/plane.png";

export const Header = () => {
  return (
    <header className={style.header}>
      <img className={style.img} src={planeImg} alt="Plane" />
      <div className={style.text}>Поиск авиабилетов</div>
    </header>
  );
};

export default Header;
