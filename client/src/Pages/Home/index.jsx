import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import style from "./style.module.scss";
import RightSidebar from "../../components/RightSidebar";
import Posts from "./posts";
import { useContext } from "react";
import { mainContext } from "../../Context/context";

function HomePage() {
  const { userInfo } = useContext(mainContext);

  return (
    <div className={style.container}>

      <Posts />
       <RightSidebar />
    </div>
  );
}

export default HomePage;
