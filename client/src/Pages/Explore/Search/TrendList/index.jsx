import React from "react";
import style from "./style.module.scss";
import Ellipsis from "../../../../assets/icons/Ellipsis.svg"

  const TrendData = [
    {
      title: `Created by Abdullah "Daxer" Yirik `,
      postCount: 1000000,
      category: "İş ve Finans",
      id: 1,
    },
    {
      title: "Kabine Toplantısı",
      postCount: Math.floor(Math.random() * 40000),
      category: "Siyaset",
      id: 2,
    },
    {
      title: "Sedat Peker",
      postCount: Math.floor(Math.random() * 40000),
      category: "Türkiye Tarihi",
      id: 3,
    },
    {
      title: "Tahliye",
      postCount: Math.floor(Math.random() * 40000),
      category: "Türkiye Tarihi",
      id: 4,
    },
    {
      title: "#YanındayızEkremİmamoğlu",
      postCount: Math.floor(Math.random() * 40000),
      category: "Türkiye Tarihi",
      id: 5,
    },
    {
      title: "Adalet Sağlanmadı",
      postCount: Math.floor(Math.random() * 40000),
      category: "Türkiye Tarihi",
      id: 6,
    },
     {
      title: "#HeryerİmamoğluHeryerDireniş",
      postCount: Math.floor(Math.random() * 40000),
      category: "Türkiye Tarihi",
      id: 7
    },
    {
      title: "Arsenal",
      postCount: Math.floor(Math.random() * 40000),
      category: "Spor",
      id: 8,
    }, {
      title: "Fahrettin Altun",
      postCount: Math.floor(Math.random() * 40000),
      category: "Siyaset",
      id: 9,
    }
  ];

function TrendList() {


  return <div className={style.TrendList}>
    {TrendData.map(trend => (
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
  </div>;
}

export default TrendList;
