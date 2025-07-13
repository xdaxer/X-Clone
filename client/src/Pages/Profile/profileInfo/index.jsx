import React from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "./style.module.scss";
import backIcon from "../../../assets/icons/back.svg";
import searchIcon from "../../../assets/icons/search.svg";
import EllipsisIcon from "../../../assets/icons/Ellipsis.svg";
import MessagesIcon from "../../../assets/icons/MessagesBar.svg";
import loacationIcon from "../../../assets/icons/loacation.svg";
import urlIcon from "../../../assets/icons/url.svg";
import Post from "../../../components/post";
import { useContext } from "react";
import { mainContext } from "../../../Context/context";
function ProfileInfo({ user, posts }) {
  const navigate = useNavigate();

  const { receivers, setReceivers } = useContext(mainContext);
console.log("ddddddddddddd",user)
  return (
    <div className={style.profileInfo}>
      <div className={style.topMenu}>
        <div className={style.left}>
          <button className={style.backButton} onClick={() => navigate(-1)}>
            <img src={backIcon} />
          </button>

          <div className={style.info}>
            <b>{user.username}</b>
            <span>{Object.keys(posts).length} Gönderi</span>
          </div>
        </div>

        <button className={style.searchIcon}>
          <img src={searchIcon} />
        </button>
      </div>

      <div className={style.banner}>
        <img className={style.bannerImage} src={user.bannerImage} />
        <img className={style.profilePicture} src={user.profilePicture} />
      </div>

      <div className={style.buttons}>
        <div className={style.iconButtons}>
          <button>
            <img src={EllipsisIcon} />
          </button>

          <button
            onClick={() => {
              if (!receivers.some((r) => r.id === user.userID)) {
                setReceivers((prev) => [
                  {
                    id: user.userID,
                    username: user.username,
                    profilePicture: user.profilePicture,
                    name: user.name,
                    premiumStatus: user.premiumStatus,
                    isAdmin: false,
                  },
                  ...prev,
                ]);
              }

              window.open("/messages");
            }}
          >
            <img src={MessagesIcon} />
          </button>
        </div>

        <button className={style.followButton}>Takip Et</button>
      </div>

      <div className={style.infos}>
        <div className={style.username}>
          <b>{user.name}</b>
          <span>@{user.username}</span>
        </div>

        <p className={style.biography}>
          {!user.isAdmin ? <>Biyografi yok, sadece sessizlik.</> : <>Admin</>}
        </p>

        <div className={style.tags}>
          <div>
            <img src={loacationIcon} />
            <span>Türkiye</span>
          </div>

          <div>
            <img src={urlIcon} />
            <span>
              <Link to="https://github.com/xdaxer" target="_blank">
                github.com
              </Link>
            </span>
          </div>
        </div>

        <div className={style.followers}>
          <span>
            <label>0</label> Takip edilen
          </span>
          <span>
            <label>0</label> Takipçi
          </span>
        </div>
      </div>

      {posts.map((post) => (
        <Post key={post.PostID} post={post} />
      ))}
    </div>
  );
}

export default ProfileInfo;
