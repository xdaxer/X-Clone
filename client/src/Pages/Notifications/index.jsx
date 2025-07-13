import React from "react";
import RightSidebar from "../../components/RightSidebar";
import NotificationsList from "./NotifiationsList";
import style from "./style.module.scss"

function Notifications() {
 

  return (
    <section className={style.notifications}>
      <NotificationsList/>
      <RightSidebar />
    </section>
  );
}

export default Notifications;
