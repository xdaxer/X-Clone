import React from "react";
import style from "./style.module.scss";
import { useState } from "react";

function Tabs({tabs,defaultSelectedTab}) {
  const [activeTab, setActiveTab] = useState(defaultSelectedTab);

 
  return (
    <div className={style.tabs}>
      {tabs.map((tab) => (
        <span
          key={tab}
          className={activeTab === tab ? style.activeTab : ""}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </span>
      ))}
    </div>
  );
}

export default Tabs;
