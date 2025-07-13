import React from "react";
import style from "./style.module.scss";
import { useContext, useEffect, useState, useRef } from "react";
import { mainContext } from "../../../Context/context";
import socket from "../../../socket/socket";
import infoIcon from "../../../assets/icons/info.svg";
import mediaIcon from "../../../assets/icons/media.svg";
import gifIcon from "../../../assets/icons/gif.svg";
import emojiIcon from "../../../assets/icons/emoji.svg";
import sendIcon from "../../../assets/icons/send.svg";
function Message({ activeUser, setShowPopup, showPopup }) {
  const { messages, userInfo } = useContext(mainContext);
  const [activeButton, setActiveButton] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const messageBoxRef = useRef(null);

  const sendMessage = () => {
    socket.emit("PRIVATE_MESSAGE", {
      toUserID: activeUser.id,
      message: inputMessage,
    });
    setInputMessage("");
  };

  useEffect(() => {
    if (inputMessage.length > 0) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  }, [inputMessage]);

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages, activeUser]);

  if (!activeUser) {
    return (
      <div className={style.messages}>
        <div>
          <h2>Mesaj Seç</h2>
          <span>
            Mevcut sohbetlerin arasından seçim yap, yeni bir <br />
            sohbet başlat veya sörfe devam et.
          </span>
          <button onClick={() => setShowPopup(true)}>Yeni Mesaj</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={style.message}>
        <div className={style.topBar}>
          <div className={style.userInfo}>
            <img src={activeUser.profilePicture} alt="profil" />
            <b>{activeUser.name}</b>
          </div>

          <img src={infoIcon} alt="bilgi ikonu" />
        </div>

        <div className={style.messageBox} ref={messageBoxRef}>
          {messages.map((message, index) => {
            if (
              message.users.includes(userInfo.userID) &&
              message.users.includes(activeUser.id)
            ) {
              if (message.senderID === userInfo.userID) {
                return (
                  <div className={style.me} key={index}>
                    <div className={style.messageContent}>
                      {message.content}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className={style.you} key={index}>
                    <div className={style.messageContent}>
                      {message.content}
                    </div>
                  </div>
                );
              }
            }
            return null;
          })}
        </div>

        <div className={style.inputBox}>
          <button className={style.iconButton}>
            <img src={mediaIcon} alt="medya" />
          </button>
          <button className={style.iconButton}>
            <img src={gifIcon} alt="gif" />
          </button>
          <button className={style.iconButton}>
            <img src={emojiIcon} alt="emoji" />
          </button>
          <input
            type="text"
            placeholder="Yeni bir mesaja başla"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />

          <button
            disabled={!activeButton}
            className={style.sendButton}
            onClick={sendMessage}
          >
            <img src={sendIcon} alt="gönder" />
          </button>
        </div>
      </div>
    );
  }
}

export default Message;
