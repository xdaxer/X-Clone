import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserInfo from "./UserInfo";

import Logo from "../../assets/icons/Logo.svg";
import HomeIcon from "../../assets/icons/Home.svg";
import HomeIconActive from "../../assets/icons/HomeActive.svg";
import SearchIcon from "../../assets/icons/Search.svg";
import SearchIconActive from "../../assets/icons/SearchActive.svg";
import NotificationIcon from "../../assets/icons/Notifications.svg";
import NotificationIconActive from "../../assets/icons/NotificationsActive.svg";
import MessagesIcon from "../../assets/icons/MessagesBar.svg";
import MessagesIconActive from "../../assets/icons/MessagesActive.svg";
import GrokIcon from "../../assets/icons/grok.svg";
import CommunityIcon from "../../assets/icons/community.svg";
import CommunityIconActive from "../../assets/icons/CommunityActive.svg";
import OrganizationIcon from "../../assets/icons/Organizations.svg";
import ProfileIcon from "../../assets/icons/Profile.svg";
import ProfileIconActive from "../../assets/icons/ProfileActive.svg";
import MoreIcon from "../../assets/icons/More.svg";

import { mainContext } from "../../Context/context";
import style from "./style.module.scss";

function Sidebar() {
  const location = useLocation();
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

  return (
    <section className={style.sidebar}>
      <div className={style.top}>
        <div className={style.logo}>
          <img src={Logo} alt="Logo" />
        </div>

        <div className={style.buttons}>
          <Link to="/">
            <div className={style.button}>
              <img
                src={location.pathname === "/" ? HomeIconActive : HomeIcon}
                alt="HomeIcon"
              />
              <span>Ana Sayfa</span>
            </div>
          </Link>

          <Link to="/explore">
            <div className={style.button}>
              <img
                src={
                  location.pathname === "/explore"
                    ? SearchIconActive
                    : SearchIcon
                }
                alt="SearchIcon"
              />
              <span>Keşfet</span>
            </div>
          </Link>

          <Link to="/notifications">
            <div className={style.button}>
              <img
                src={
                  location.pathname === "/notifications"
                    ? NotificationIconActive
                    : NotificationIcon
                }
                alt="NotificationIcon"
              />
              <span>Bildirimler</span>
            </div>
          </Link>

          <Link to="/messages">
            <div className={style.button}>
              <img
                src={
                  location.pathname === "/messages"
                    ? MessagesIconActive
                    : MessagesIcon
                }
                alt="MessagesIcon"
              />
              <span>Mesajlar</span>
            </div>
          </Link>

          <Link
            target="_blank"
            to="https://grok.com/"
            rel="noopener noreferrer"
          >
            <div className={style.button}>
              <img src={GrokIcon} alt="GrokIcon" />
              <span>Grok</span>
            </div>
          </Link>

          <Link to="/communities">
            <div className={style.button}>
              <img
                src={
                  location.pathname === "/communities"
                    ? CommunityIconActive
                    : CommunityIcon
                }
                alt="CommunityIcon"
              />
              <span>Topluluklar</span>
            </div>
          </Link>

        

          <Link to={`/${userInfo.username}`}>
            <div className={style.button}>
              <img
                src={
                  location.pathname === "/profile"
                    ? ProfileIconActive
                    : ProfileIcon
                }
                alt="ProfileIcon"
              />
              <span>Profil</span>
            </div>
          </Link>

          {showMenu && (
            <section className={style.moreButtons} ref={moreRef}>
              <ul>
                <li>
                   <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M3 4.5C3 3.12 4.12 2 5.5 2h13C19.88 2 21 3.12 21 4.5v15c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 22 3 20.88 3 19.5v-15zM5.5 4c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-13zM16 10H8V8h8v2zm-8 2h8v2H8v-2z"></path>
                    </g>
                  </svg>
                  Listeler
                </li>
                <li>
                   <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M23 3v14h-2V5H5V3h18zM10 17c1.1 0 2-1.34 2-3s-.9-3-2-3-2 1.34-2 3 .9 3 2 3zM1 7h18v14H1V7zm16 10c-1.1 0-2 .9-2 2h2v-2zm-2-8c0 1.1.9 2 2 2V9h-2zM3 11c1.1 0 2-.9 2-2H3v2zm0 4c2.21 0 4 1.79 4 4h6c0-2.21 1.79-4 4-4v-2c-2.21 0-4-1.79-4-4H7c0 2.21-1.79 4-4 4v2zm0 4h2c0-1.1-.9-2-2-2v2z"></path>
                    </g>
                  </svg>
                  Para Kazanma
                </li>
                <li>
                   <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M1.996 5.5c0-1.38 1.119-2.5 2.5-2.5h15c1.38 0 2.5 1.12 2.5 2.5v13c0 1.38-1.12 2.5-2.5 2.5h-15c-1.381 0-2.5-1.12-2.5-2.5v-13zm2.5-.5c-.277 0-.5.22-.5.5v13c0 .28.223.5.5.5h15c.276 0 .5-.22.5-.5v-13c0-.28-.224-.5-.5-.5h-15zm8.085 5H8.996V8h7v7h-2v-3.59l-5.293 5.3-1.415-1.42L12.581 10z"></path>
                    </g>
                  </svg>
                  Reklamlar
                </li>
                <li>
                   <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.67 1.5-1.5s-.68-1.5-1.5-1.5zM8.5 12c0-1.93 1.56-3.5 3.5-3.5 1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5c-1.94 0-3.5-1.57-3.5-3.5z"></path>
                    </g>
                  </svg>
                  Ayarlar ve Gizlilik
                </li>
              </ul>
            </section>
          )}

          <div
            className={style.button}
            ref={moreButtonRef}
            onClick={() => {
              setShowMenu(true);
            }}
          >
            <img src={MoreIcon} alt="MoreIcon" />
            <span>Daha Fazla</span>
          </div>

          <button className={style.shareButton}>
            <pre>Gönderi Yayınla</pre>
          </button>
        </div>
      </div>

      <UserInfo />
    </section>
  );
}

export default Sidebar;
