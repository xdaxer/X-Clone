import React, { useEffect, useState, useContext } from "react";
import style from "./style.module.scss";
import { useParams } from "react-router-dom";
import { mainContext } from "../../Context/context";
import PageNotFound from "../../Router/Err/404";
import Loading from "../../components/Loading";
import ProfileInfo from "./profileInfo";
import RightSidebar from "../../components/RightSidebar";

function ProfilePage() {
  const { username } = useParams();
  const { userInfo } = useContext(mainContext);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    username: "",
    userID: null,
    email: "",
    name: "",
    profilePicture: "",
    bannerImage: "",
  });
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(
          `http://localhost:3000/profile/${username}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        const userData = await userResponse.json();

        if (userResponse.ok) {
          setUser({
            username: userData.username,
            userID: userData.userID,
            email: userData.email,
            name: userData.name,
            profilePicture: userData.profilePicture,
            bannerImage: userData.bannerImage,
            isAdmin: userData.isAdmin
          });
          console.log("Kullanıcı:", userData);
        }

        const postResponse = await fetch(
          `http://localhost:3000/post/users/${username}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        const postData = await postResponse.json();

        if (postResponse.ok) {
          setPosts(postData.Posts);
          console.log(postData.Posts);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username, userInfo.token]);

  if (!isLoading) {
    if (user.userID) {
      return (
        <div className={style.container}>
          <ProfileInfo user={user} posts={posts} />
          <RightSidebar />
        </div>
      );
    } else {
      return <PageNotFound />;
    }
  } else {
    return <Loading />;
  }
}

export default ProfilePage;
