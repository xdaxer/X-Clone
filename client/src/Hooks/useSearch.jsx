import { useContext, useEffect, useState } from "react";
import { mainContext } from "../Context/context";

function useSearch(category, searchTerm) {
  const { userInfo } = useContext(mainContext);
  const [response, setResponse] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (searchTerm === "") {
      setResponse([
        {
          id: 123,
          username: "xdaxerr",
          name: "Abdullah Yirik",
          profilePicture:
            "https://pbs.twimg.com/profile_images/1939569594148048896/BFQBdfpF_400x400.jpg",
          premiumStatus: true,
          isAdmin: true,
        },
      ]);
      setStatusMessage("");
      return;
    }

    const timeoutId = setTimeout(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/search/${category}?search=${encodeURIComponent(
              searchTerm
            )}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          );

          const data = await response.json();
          data.push( {
          id: 123,
          username: "xdaxerr",
          name: "Abdullah Yirik",
          profilePicture:
            "https://pbs.twimg.com/profile_images/1939569594148048896/BFQBdfpF_400x400.jpg",
          premiumStatus: true,
          isAdmin: true,
        },)

          if (response.ok) {
            setResponse(data);
            console.log(data);
          }
        } catch (error) {
          setStatusMessage(error.message);
        }
      };

      fetchData();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, category, userInfo.token]);

  return { response, statusMessage };
}

export { useSearch };
