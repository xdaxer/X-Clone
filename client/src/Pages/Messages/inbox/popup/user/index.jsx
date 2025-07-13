import React from "react";
import style from "./style.module.scss";
import { useContext } from "react";
import { mainContext } from "../../../../../Context/context";

function User({ user, setShowPopup }) {
  const { userInfo, setReceivers, receivers } = useContext(mainContext);

  if (user.id !== userInfo.userID) {
    
    return (
      <div
        className={style.user}
        onClick={() => {
          console.log(user.id);
              if (!receivers.some((r) => r.id === user.userID)) {
              setReceivers((prev) => [
          ...prev,
          {
                    id: user.id,
                    username: user.username,
                    profilePicture: user.profilePicture,
                    name: user.name,
                    premiumStatus: user.premiumStatus,
                    isAdmin: false,
                  },
        ]);
            setShowPopup(false);
          }else{
            setShowPopup(false)
          }
        }}
      >
        <img src={user.profilePicture} />
        <div className={style.name}>
          <b>{user.name}</b>
          <span>@{user.username}</span>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default User;
