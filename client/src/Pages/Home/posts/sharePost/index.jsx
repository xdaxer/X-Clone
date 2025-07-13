import React from "react";
import style from "./style.module.scss";
import { useContext, useState, useEffect, useRef } from "react";
import { mainContext } from "../../../../Context/context";
import mediaIcon from "../../../../assets/icons/media.svg";
import gifIcon from "../../../../assets/icons/gif.svg";
import grokIcon from "../../../../assets/icons/grok2.svg";
import surveyIcon from "../../../../assets/icons/survey.svg";
import emojiIcon from "../../../../assets/icons/emoji.svg";
import closeIcon from "../../../../assets/icons/popupClose.svg";
import planIcon from "../../../../assets/icons/plan.svg";

function SharePost() {
  const { userInfo } = useContext(mainContext);
  const [next, setNext] = useState(false);
  const [text, setText] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [imageFile, setImageFile] = useState();

  useEffect(() => {
    if (text.trim().length > 0) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [text]);

  useEffect(() => {
    console.log(imageFile);
  }, [imageFile]);

  statusMessage && console.log(statusMessage);

  const share = async () => {
    const formData = new FormData();
    formData.append("PostContent", text);

    if (imageFile) {
      const blob = new Blob([imageFile], { type: imageFile.type });
      formData.append("PostImage", blob, imageFile.name);
    }

    const response = await fetch("http://localhost:3000/post/share", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      window.location.reload();
    }
    setStatusMessage(data.message);
  };

  return (
    <div className={style.SharePost}>
      <div className={style.inputBox}>
        <img
          src={userInfo.profilePicture}
          alt={userInfo.username}
          className={style.profilePicture}
        />
        <textarea
          placeholder="Neler Oluyor?"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>

      {imageFile && (
        <div className={style.image}>
          <img
            src={URL.createObjectURL(imageFile)}
            className={style.postImage}
          />

          <button className={style.deleteImage}>
            <img src={closeIcon} />
          </button>
        </div>
      )}
      <div className={style.buttons}>
        <div className={style.iconButton}>
          <button>
            <img src={mediaIcon} />
            <input
              type="file"
              accept="image/png, image/jpeg"
              title="Bir Görsel Yükle"
              className={style.uploadImage}
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </button>
          <button>
            <img src={gifIcon} />
            <input
              type="file"
              accept="image/gif"
              title="Bir Görsel Yükle"
              className={style.uploadImage}
              onChange={(e) => setImageFile(e.target.files[0])}
            />{" "}
          </button>
          <button>
            <img src={grokIcon} />
          </button>
          <button>
            <img src={surveyIcon} />
          </button>
          <button>
            <img src={emojiIcon} />
          </button>
          <button>
            <img src={planIcon} />
          </button>
        </div>
        <button
          disabled={!next}
          className={style.shareButton}
          onClick={() => {
            share();
          }}
        >
          Gönderi Yayınla
        </button>
      </div>
    </div>
  );
}

export default SharePost;
