import React, { useState } from "react";
import Searchbar from "./Searchbar";
import style from "./style.module.scss";
import Tabs from "../../../../components/Tabs";
import SettingsLogo from "../../../../assets/icons/Settings.svg";
import { useSearch } from "../../../../Hooks/useSearch";
import { Link } from "react-router-dom";

function TopMenu() {
  const tabs = ["Sana Özel", "Gündemdekiler", "Haberler", "Spor", "Eğlence"];

  const [searchTerm, setSearchTerm] = useState("");
  const { response, statusMessage } = useSearch("user", searchTerm);

  return (
    <div className={style.TopMenu}>
      <div className={style.search}>
        <Searchbar setSearchTerm={setSearchTerm} />
        {searchTerm && (
          <div className={style.searchList}>
            {
              <ul>
                {response.map((u) => (
                  <Link to={"/" + u.username}>
                    <li>
                      <img src={u.profilePicture} />
                      <div className={style.username}>
                        <p>{u.name}</p>
                        <span>@{u.username}</span>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            }
          </div>
        )}
        <img src={SettingsLogo} className={style.SettingsButton} />
      </div>
      <Tabs tabs={tabs} defaultSelectedTab="Sana Özel" />
    </div>
  );
}

export default TopMenu;
