import React from "react";
import style from "./style.module.scss";
import Ellipsis from "../../../assets/icons/Ellipsis.svg";

const TrendData = [
  {
    title: "#altın",
    postCount: Math.floor(Math.random() * 40000),
    category: "İş ve Finans",
    id: 1
  },
  {
    title: "Kabine Toplantısı",
    postCount: Math.floor(Math.random() * 40000),
    category: "Siyaset",
    id: 2
  },
  {
    title: "Sedat Peker",
    postCount: Math.floor(Math.random() * 40000),
    category: "Türkiye Tarihi",
    id: 3
  },
];
function Trends() {

  return (
    <div className={style.trends}>
      <b>Neler oluyor?</b>

      {TrendData.map((trend) => (
        <div className={style.trend} key={trend.id}>
          <div className={style.text}>
            <p>{trend.category} Gündeminde</p>
            <span>{trend.title}</span>
            <p>{trend.postCount} Gönderi</p>
          </div>

          <button>
            <img src={Ellipsis} />
          </button>
        </div>
      ))}

      <span className={style.more}>Daha Fazla Göster</span>
    </div>
  );
}

export default Trends;
