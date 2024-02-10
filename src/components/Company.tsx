import { setCompanyFilter } from "../redux/ticketsSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import style from "./css/Company.module.css";

const Company = () => {
  const dispatch = useDispatch();
  const [showImage1, setShowImage1] = useState(localStorage.getItem("showImage1") === "false" ? false : true);
  const [showImage2, setShowImage2] = useState(localStorage.getItem("showImage2") === "false" ? false : true);
  const [showImage3, setShowImage3] = useState(localStorage.getItem("showImage3") === "false" ? false : true);

  useEffect(() => {
    if (localStorage.getItem("showImage1") === null) {
      setShowImage1(true);
      localStorage.setItem("showImage1", "true");
    }
    if (localStorage.getItem("showImage2") === null) {
      setShowImage2(true);
      localStorage.setItem("showImage2", "true");
    }
    if (localStorage.getItem("showImage3") === null) {
      setShowImage3(true);
      localStorage.setItem("showImage3", "true");
    }
  }, []);

  useEffect(() => {
    dispatch(setCompanyFilter([showImage1 ? "Pobeda" : "", showImage2 ? "Red Wings" : "", showImage3 ? "S7 Airlines" : ""].filter(Boolean)));
  }, [showImage1, showImage2, showImage3, dispatch]);

  const handleClick1 = () => {
    const newValue = !showImage1;
    if (!newValue && !showImage2 && !showImage3) {
      return;
    }
    setShowImage1(newValue);
    localStorage.setItem("showImage1", newValue.toString());
  };

  const handleClick2 = () => {
    const newValue = !showImage2;
    if (!newValue && !showImage1 && !showImage3) {
      return;
    }
    setShowImage2(newValue);
    localStorage.setItem("showImage2", newValue.toString());
  };

  const handleClick3 = () => {
    const newValue = !showImage3;
    if (!newValue && !showImage1 && !showImage2) {
      return;
    }
    setShowImage3(newValue);
    localStorage.setItem("showImage3", newValue.toString());
  };

  return (
    <div className={style.container}>
      <div className={style.title}>Компании</div>
      <div className={style.company}>
        <button className={showImage1 ? `${style.radio} ${style.active}` : style.radio} onClick={handleClick1} />
        <div className={style.text}>Победа</div>
      </div>
      <div className={style.company}>
        <button className={showImage2 ? `${style.radio} ${style.active}` : style.radio} onClick={handleClick2} />
        <div className={style.text}>Red Wings</div>
      </div>
      <div className={style.company}>
        <button className={showImage3 ? `${style.radio} ${style.active}` : style.radio} onClick={handleClick3} />
        <div className={style.text}>S7 Airlines</div>
      </div>
    </div>
  );
};

export default Company;
