import style from "./style.module.scss";
import { Link } from "react-router-dom";
function FollowList() {
  const userList = [
    {
      name: "Özlem Gürses",
      username: "ozlemgurses",
      id: 1,
      profilePicture:
        "https://pbs.twimg.com/profile_images/1835617776095956992/LyBBMfdi_400x400.jpg",
    },
    {
      name: "Özgür Demirtaş",
      username: "profdemirtas",
      id: 2,
      profilePicture:
        "https://pbs.twimg.com/profile_images/1374615485573165057/-AzXW69D_400x400.jpg",
    },
    {
      name: "Abdullah Yirik",
      username: "xdaxerr",
      id: 3,
      profilePicture:
        "https://pbs.twimg.com/profile_images/1939569594148048896/BFQBdfpF_400x400.jpg",
    },
  ];

  const follow = (username) => {
    console.log(`${username} Takip Edildi`);
  };

  return (
    <div className={style.FollowList}>
      <b className={style.title}>Kimi Takip Etmeli</b>
      {userList.map((user) => (
        <div key={user.id} className={style.user}>
          <Link to={`/${user.username}`}>
            <div className={style.userInfo}>
              <img src={user.profilePicture} />
              <div className={style.name}>
                <b>{user.name}</b>
                <span>@{user.username}</span>
              </div>
            </div>
          </Link>
          <button
            onClick={() => {
              follow(user.username);
            }}
          >
            Takip Et
          </button>
        </div>
      ))}

      <span className={style.more}>Daha Fazla Göster</span>
    </div>
  );
}

export default FollowList;
