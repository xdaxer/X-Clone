import React from "react";
import TopMenu from "./TopMenu";
import style from "./style.module.scss";
import TrendList from "./TrendList";

function Search() {
  return (
    <section className={style.Search}>
      <TopMenu />
      <TrendList/>
    </section>
  );
}

export default Search;
