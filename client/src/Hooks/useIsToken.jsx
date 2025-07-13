import { useContext, useState, useEffect } from "react";
import { mainContext } from "../Context/context";

function useIsToken() {
  const { userInfo } = useContext(mainContext);
  const [isToken, setIsToken] = useState(false);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const checkToken = async () => {
      if (userInfo.token) {
        try {
          const response = await fetch("http://localhost:3000/check", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: userInfo.token,
            }),
          });

          if (response.ok) {
            setIsToken(true);
          } else {
            setIsToken(false);
          }
        } catch (error) {
          console.error(error);
          setIsToken(false);
          setError(error);
        }
      } else {
        setIsToken(false);
      }

      setIsLoading(false);
    };
    setToken(userInfo.token);
    checkToken();
  }, [userInfo]);

  return { isToken, isLoading, token, error };
}

export { useIsToken };
