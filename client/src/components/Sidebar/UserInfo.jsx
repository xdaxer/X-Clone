import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";
import { mainContext } from "../../Context/context";
import Ellipsis from "../../assets/icons/Ellipsis.svg";

function UserInfo() {
  const { userInfo } = useContext(mainContext);
  const [showMenu, setShowMenu] = useState(false);

  const moreRef = useRef(null);
  const moreButtonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        moreRef.current &&
        !moreRef.current.contains(event.target) &&
        moreButtonRef.current &&
        !moreButtonRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={style.userInfo}>
      <Link to={`/${userInfo.username}`} className={style.info}>
        <img src={userInfo.profilePicture} alt="Profile" />
        <div className={style.name}>
          <b>{userInfo.name}</b>
          <span>@{userInfo.username}</span>
        </div>
      </Link>

      {showMenu && (
        <section className={style.logoutMenu} ref={moreRef}>
         
            <span onClick={handleLogout}>Çıkış Yap</span>
         
        </section>
      )}

      <button
        ref={moreButtonRef}
        onClick={() => setShowMenu(true)}
        className={style.ellipsisButton}
      >
        <img src={Ellipsis} alt="Daha fazla" />
      </button>
    </div>
  );
}

export default UserInfo;
