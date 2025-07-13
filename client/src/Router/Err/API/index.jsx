import React from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";

function APIError({error}) {
  return (
    <div className={style.APIError}>
      <h1> Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.</h1>
      
      {error}
    </div>
  );
}

export default APIError;
