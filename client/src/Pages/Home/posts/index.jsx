  import React, { useEffect, useState } from "react";
  import SharePost from "./sharePost";
  import style from "./style.module.scss";
  import Category from "./category";
  import Tabs from "../../../components/Tabs";
  import Post from "../../../components/post";
  import useGetPosts from "../../../Hooks/useGetPosts";

  function Posts() {
    const { posts, statusMessage } = useGetPosts();
 
    const tabs = ["Sana Özel", "Takip"];

    



    return (
      <div className={style.posts}>
        <Tabs tabs={tabs} defaultSelectedTab="Sana Özel" />
        <SharePost />
        {posts.map((post) => (
          <Post key={post.PostID} post={post} />
        ))}
      </div>
    );
  }

  export default Posts;
