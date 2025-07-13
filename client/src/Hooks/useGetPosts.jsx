import { useState, useEffect, useContext } from "react";
import { mainContext } from "../Context/context";

function useGetPosts() {
  const [posts, setPosts] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const { userInfo } = useContext(mainContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
          body: JSON.stringify({}),
        });

        const data = await response.json();

        if (response.ok) {
          setPosts(data.Posts);
          console.log("data", data);
        }

        setStatusMessage(data.message || "");
      } catch (error) {
        setStatusMessage("Hata: " + error.message);
      }
    };

    if (userInfo.token) {
      fetchPosts();
    }
  }, [userInfo]);

  return { posts, statusMessage };
}

export default useGetPosts;
