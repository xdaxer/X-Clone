import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import closeIcon from "../../../../assets/icons/popupClose.svg";
import Logo from "../../../../assets/icons/Logo.svg";

function RegisterPopup({ setshowRegisterPopup, setshowLoginPopup }) {
  console.log(setshowLoginPopup);

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const [next, setNext] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const username = form.username;
    const name = form.name;
    const email = form.email;
    const password = form.password;
    if (
      username.trim() !== "" &&
      name.trim() !== "" &&
      email.trim() !== "" &&
      password.length >= 8
    ) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [form]);

  return (
    <div className={style.popupBackDrop}>
      <div className={style.popup}>
        <button
          className={style.closePopup}
          onClick={() => setshowRegisterPopup(false)}
        >
          <img src={closeIcon} />
        </button>

        <div className={style.logo}>
          <img src={Logo} alt="Logo" />
        </div>

        <h2>Hesabını oluştur</h2>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const { username, email, name, password } = form;

            if (next) {
              try {
                const response = await fetch("http://localhost:3000/register", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ username, email, name, password }),
                });

                const data = await response.json();

                if (response.ok) {
                  // navigate("/login");
                  setshowRegisterPopup(false);
                  setshowLoginPopup(true);
                }

                setStatusMessage(data.message || "Kayıt işlemi tamamlandı");
              } catch (error) {
                setStatusMessage("Bir hata oluştu: " + error.message);
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
            type="text"
            placeholder="Gerçek İsim"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="E-Posta"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
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

export default RegisterPopup;
