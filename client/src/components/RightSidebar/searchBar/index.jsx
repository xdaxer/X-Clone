import React, { useState } from "react";
import style from "./style.module.scss";
import searchIcon from "../../../assets/icons/Search.svg";
import { useSearch } from "../../../Hooks/useSearch";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const { response, statusMessage } = useSearch("user", searchTerm);

  return (
    <div className={style.searchBar}>
      <img src={searchIcon} />
      <input
        type="text"
        placeholder="Ara"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
    </div>
  );
}

export default SearchBar;
