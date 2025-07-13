import { Link } from "react-router-dom";
import { useState } from "react";
import RegisterPopup from "./popup/register";
import LoginPopup from "./popup/login";
import style from "./style.module.scss";
import Logo from "../../assets/icons/Logo.svg";
import appleLogo from "../../assets/icons/apple.svg";
import googleLogo from "../../assets/icons/google.svg";

function RegisterPage() {
  const [showRegisterPopup, setshowRegisterPopup] = useState(false);
  const [showLoginPopup, setshowLoginPopup] = useState(false);

  return (
    <>
      <div className={style.container}>
        {showRegisterPopup && (
          <RegisterPopup
            setshowRegisterPopup={setshowRegisterPopup}
            setshowLoginPopup={setshowLoginPopup}
          />
        )}
        {showLoginPopup && (
          <LoginPopup
            setshowRegisterPopup={setshowRegisterPopup}
            setshowLoginPopup={setshowLoginPopup}
          />
        )}
        <div className={style.logo}>
          <img src={Logo} alt="Logo" />
        </div>

        <div className={style.rightMenu}>
          <h2>Şu anda olup bitenler</h2>
          <b>Hemen katıl.</b>

          <div className={style.buttons}>
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

            <button
              className={style.registerButton}
              onClick={() => {
                setshowRegisterPopup(true);
              }}
            >
              Hesap Oluştur
            </button>

            <span className={style.policies}>
              By signing up, you agree to the{" "}
              <Link target="_blank" to="https://x.com/en/tos">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link target="_blank" to="https://x.com/en/privacy">
                Privacy Policy
              </Link>
              , including{" "}
              <Link
                target="_blank"
                to="https://help.x.com/tr/rules-and-policies/x-cookies"
              >
                Cookie Use
              </Link>
              .
            </span>

            <div className={style.loginButton}>
              <span>Zaten bir hesabın var mı?</span>
              <button
                onClick={() => {
                  setshowLoginPopup(true);
                }}
              >
                Giriş Yap
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
