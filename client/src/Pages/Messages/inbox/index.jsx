import React, { useState, useContext, useEffect } from "react";
import style from "./style.module.scss";
import NewMessagePopup from "./popup";
import SettingsIcon from "../../../assets/icons/settings.svg";
import NewChatIcon from "../../../assets/icons/NewChat.svg";
import { mainContext } from "../../../Context/context";

function Inbox({ activeUser, setActiveUser, receivers,showPopup,setShowPopup}) {

  const renderTopBar = () => (
    <div className={style.top}>
      <h2>Messages</h2>
      <div className={style.buttons}>
        <img src={SettingsIcon} />
        <img src={NewChatIcon} onClick={() => setShowPopup(true)} />
      </div>
    </div>
  );

  return (
    <>
      {showPopup && <NewMessagePopup setShowPopup={setShowPopup} />}
      <div className={style.inbox}>
        {renderTopBar()}
        {receivers.length === 0 ? (
          <div className={style.messages}>
            <h1>Gelen kutuna hoş geldin!</h1>
            <span>
              Özel sohbetler sayesinde X platformundaki diğer kişilere
              düşüncelerini yaz, gönderi ve daha fazla içerik paylaş.
            </span>
            <button onClick={() => setShowPopup(true)}>Mesaj Yaz</button>
          </div>
        ) : (
          <div className={style.users}>
            {receivers.map((user) => (
              <div
                key={user.id}
                className={`${style.user} ${
                  user.id === activeUser?.id ? style.active : ""
                }`}
                onClick={() => setActiveUser(user)}
              >
                <img src={user.profilePicture} />
                <div className={style.name}>
                  <b>{user.name}</b>
                  <span>@{user.username}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Inbox;
