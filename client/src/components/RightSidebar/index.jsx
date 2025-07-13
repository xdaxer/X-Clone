import React from "react";
import style from "./style.module.scss";
import SearchBar from "./searchBar";
import Premium from "./premium";
import Trends from "./Trends";
import FollowList from "./followList";

function RightSidebar() {
  return (
    <section className={style.rightSidebar}>
      <SearchBar />
      <Premium />
      <div className={style.bottom}>
        <Trends />
        <FollowList />
      </div>
    </section>
  );
}

export default RightSidebar;
