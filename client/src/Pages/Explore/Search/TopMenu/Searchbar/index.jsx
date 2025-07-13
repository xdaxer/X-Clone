import React from "react";
import style from "./style.module.scss";
import SearcgLogo from "../../../../../assets/icons/Search.svg";
function Searchbar({setSearchTerm}) {
  return (
    <div className={style.Searchbar}>
      <img src={SearcgLogo} />
      <input type="text" placeholder="Ara" onChange={(e) => {setSearchTerm(e.target.value)}}/>
    </div>
  );
}

export default Searchbar;
