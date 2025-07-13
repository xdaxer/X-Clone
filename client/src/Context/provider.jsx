import { useState, useEffect } from "react";
import { mainContext } from "./context";
import { BrowserRouter } from "react-router-dom";
import Router from "../Router/router";

function Provider() {
  const [userInfo, setUserInfo] = useState({});
  const [receivers, setReceivers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeUser, setActiveUser] = useState(receivers[0]?.id);

  useEffect(() => {
    console.log(receivers);
  }, [receivers]);

  const data = {
    userInfo,
    setUserInfo,
    receivers,
    setReceivers,
    messages,
    setMessages,
    activeUser,
    setActiveUser,
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    const savedReceiver = localStorage.getItem("receiver");
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    }
    if (savedReceiver) {
      setReceivers(JSON.parse(savedReceiver));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    console.log(userInfo);
  }, [userInfo]);

  useEffect(() => {
    localStorage.setItem("receiver", JSON.stringify(receivers));
    console.log(receivers);
  }, [receivers]);

  useEffect(() => {
    console.log("aaaaaaaaaaaaaa",messages);
  }, [messages]);

  

  return (
    <mainContext.Provider value={data}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </mainContext.Provider>
  );
}

export default Provider;
