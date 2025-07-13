import React from "react";
import { useState, useContext, useEffect } from "react";
import { mainContext } from "../../Context/context";
import style from "./style.module.scss";
import Inbox from "./inbox";
import Message from "./Message";

function Messages() {
  const { receivers, activeUser, setActiveUser } = useContext(mainContext);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (receivers.length > 0) {
      setActiveUser(receivers[0]);
    } else {
      setActiveUser(null);
    }
  }, [receivers]);

  useEffect(() => {
    console.log(activeUser);
  }, [activeUser]);

  return (
    <>
      <div className={style.container}>
        <Inbox
          receivers={receivers}
          activeUser={activeUser}
          setActiveUser={setActiveUser}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
        <Message
          activeUser={activeUser}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      </div>
    </>
  );
}

export default Messages;
