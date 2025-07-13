import React from "react";
import style from "./style.module.scss";
import RightSidebar from "../../components/RightSidebar";
import CommunitiesPost from "./posts";

function CommunitiesPage() {
  return (
    <>
      <div className={style.container}>
        <div> </div>
        <CommunitiesPost />
        <RightSidebar/>
      </div>
    </>
  );
}

export default CommunitiesPage;
