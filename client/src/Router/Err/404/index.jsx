import React from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className={style.PageNotFound}>
      <h1>404 - Sayfa Bulunamadı</h1>
      <Link to="/">
        <button>Ana Sayafaya Dön</button>
      </Link>
    </div>
  );
}

export default PageNotFound;
