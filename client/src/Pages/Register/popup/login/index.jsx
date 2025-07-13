import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { mainContext } from "../../../../Context/context";
import style from "./style.module.scss";
import googleLogo from "../../../../assets/icons/google.svg";
import appleLogo from "../../../../assets/icons/apple.svg";
import closeIcon from "../../../../assets/icons/popupClose.svg";
import Logo from "../../../../assets/icons/Logo.svg";

function LoginPopup({ setshowRegisterPopup, setshowLoginPopup }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [next, setNext] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const username = form.username;
    const password = form.password;
    if (username.trim() !== "" && password.length >= 8) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [form]);

  const { setUserInfo } = useContext(mainContext);
  return (
    <div className={style.popupBackDrop}>
      <div className={style.popup}>
        <button
          className={style.closePopup}
          onClick={() => setshowLoginPopup(false)}
        >
          <img src={closeIcon} />
        </button>

        <div className={style.logo}>
          <img src={Logo} alt="Logo" />
        </div>

        <h2>X'e Giriş Yap</h2>

        <div className={style.top}>
          <Link target="_blank" to={"https://google.com"}>
            <button>
              <img src={googleLogo} />
              Google ile Kayıt Ol
            </button>
          </Link>
          <Link target="_blank" to={"https://apple.com"}>
            <button>
              <img src={appleLogo} />
              Apple ile Kayıt Ol
            </button>
          </Link>
        </div>

        <div className={style.divider}>
          <span>VEYA</span>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const { username, password } = form;

            if (next) {
              try {
                const response = await fetch("http://localhost:3000/login", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ username, password }),
                });

                const data = await response.json();

                if (response.ok) {
                  setUserInfo({
                    username: data.user.username,
                    userID: data.user.ID,
                    name: data.user.name,
                    profilePicture: data.user.profilePicture,
                    email: data.user.email,
                    token: data.user.token,
                    premiumStatus: data.user.premiumStatus,
                  });
                }

                window.location.href = "/";
                setStatusMessage(data.message);
              } catch (error) {
                setStatusMessage(error.message);
              }
            }
          }}
        >
          <input
            type="text"
            placeholder="Takma İsim"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Şifre (En az 8 karakter)"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit" disabled={!next}>
            İleri
          </button>
        </form>

        {statusMessage && <p className={style.error}>{statusMessage}</p>}
      </div>
    </div>
  );
}

export default LoginPopup;
