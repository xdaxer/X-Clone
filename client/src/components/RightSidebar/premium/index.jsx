import React from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

function Premium() {
  return (
    <div className={style.premium}>
      <b>Premium'a abone ol</b>
      <span>
        Yeni özellikleri açmak için abone ol ve uygun olman durumunda içerik
        üreticisi gelir payı kazan.
      </span>
      <Link to={"/premium"}>
        <button>Abone Ol</button>
      </Link>
    </div>
  );
}

export default Premium;
