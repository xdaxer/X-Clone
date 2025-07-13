import React from "react";
import style from "./style.module.scss";
import CommunitiesTopMenu from "./topMenu";
import Tabs from "../../../components/Tabs";
import Post from "../../../components/post";
import useGetPosts from "../../../Hooks/useGetPosts";

function CommunitiesPost() {
  const tabs = ["Anasayfa", "Keşfet"];
  const { posts, statusMessage } = useGetPosts();

   const shuffledPosts = [...posts].sort(() => Math.random() - 0.5);

  return (
    <div className={style.CommunitiesTopMenu}>
      <CommunitiesTopMenu />
      <Tabs tabs={tabs} defaultSelectedTab="Anasayfa" />
      {shuffledPosts.map((post) => (
        <Post key={post.PostID} post={post} />
      ))}
    </div>
  );
}

export default CommunitiesPost;
