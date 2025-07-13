import React from "react";
import Search from "./Search";
import style from "./style.module.scss";
import FollowList from "../../components/RightSidebar/followList";

function ExplorePage() {
  return (
    <>
      <div className={style.container}>
        <div> </div>

        <Search />
        <FollowList />
      </div>
    </>
  );
}

export default ExplorePage;
