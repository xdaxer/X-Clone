import style from "./style.module.scss";
import { useState } from "react";
import { useSearch } from "../../../../Hooks/useSearch";
import closeIcon from "../../../../assets/icons/popupClose.svg";
import searchIcon from "../../../../assets/icons/search.svg";
import User from "./user";

function NewMessagePopup({ setShowPopup }) {
  const [next, setNext] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { response, statusMessage } = useSearch("user", searchTerm);

  return (
    <div className={style.popupBackDrop}>
      <div className={style.popup}>
        <div className={style.topMenu}>
          <button
            className={style.closePopup}
            onClick={() => setShowPopup(false)}
          >
            <img src={closeIcon} />
          </button>
          <h2>Yeni Mesaj</h2>
        </div>

        <div className={style.searchBar}>
          <img src={searchIcon} />
          <input
            type="text"
            placeholder="Kişi Ara"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>

        <div className={style.users}>
          {response.length > 0 && response.map((user) => <User user={user} setShowPopup={setShowPopup} />)}
        </div>
      </div>
    </div>
  );
}

export default NewMessagePopup;
