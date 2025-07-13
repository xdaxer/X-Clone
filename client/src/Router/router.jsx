import { Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import HomePage from "../Pages/Home";
import RegisterPage from "../Pages/Register";
import ExplorePage from "../Pages/Explore";
import Loading from "../components/Loading";
import { useIsToken } from "../Hooks/useIsToken";
import PageNotFound from "./Err/404";
import APIError from "./Err/API";
import Notifications from "../Pages/Notifications";
import socket from "../socket/socket";
import Messages from "../Pages/Messages";
import { registerSocket } from "../socket/socket";
import { useEffect } from "react";
import { mainContext } from "../Context/context";
import { useContext } from "react";
import CommunitiesPage from "../Pages/Communities";
import ProfilePage from "../Pages/Profile";

function Router() {
  const { isToken, isLoading, error, token } = useIsToken();
  const { setMessages, messages, receivers, setReceivers } =
    useContext(mainContext);

  useEffect(() => {
    registerSocket(token);

    socket.emit("GET_CHAT_HISTORY", (response) => {
      response.map((msg) =>
        setMessages((prev) => {
          if (!prev.some((m) => m.messageID === msg.ID)) {
            return [
              ...prev,
              {
                users: [msg.SenderID, msg.ReceiverID],
                senderID: msg.SenderID,
                content: msg.Message,
                messageID: msg.ID,
              },
            ];
          }
          return prev;
        })
      );
    });

    socket.on("PRIVATE_MESSAGE", ({ from, message }) => {
      console.log(message);
    });

    socket.on("NEW_MESSAGE", (messageList) => {
      messageList.map((msg) => {
        setMessages((prev) => {
          if (!prev.some((m) => m.messageID === msg.ID)) {
            return [
              ...prev,
              {
                users: [msg.SenderID, msg.ReceiverID],
                senderID: msg.SenderID,
                content: msg.Message,
                messageID: msg.ID,
              },
            ];
          }
          return prev;
        });
      });
    });

    return () => {
      socket.off("PRIVATE_MESSAGE");
      socket.off("NEW_MESSAGE");
    };
  }, [token]);

  if (isToken) {
    registerSocket(token);

    if (isLoading) {
      return <Loading />;
    }
    if (error) {
      return <APIError error={error} />;
    }

    return (
      <>


      <h1 className="deviceErr"> Cihazın Bu Sayfayı Desteklemiyor </h1>

      
        <section className="container">
          <div> </div>
          <div> </div>

          <Sidebar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/communities" element={<CommunitiesPage />} />
            <Route path="/:username" element={<ProfilePage />} />
          </Routes>
        </section>
      </>
    );
  } else {
    return (
      <>
        <Routes>
          <Route path="/*" element={<RegisterPage />} />
        </Routes>
      </>
    );
  }
}

export default Router;
