import React from "react";
import style from "./style.module.scss";
import backIcon from "../../../../assets/icons/back.svg";
import searchIcon from "../../../../assets/icons/search.svg";
import createCommunitiesIcon from "../../../../assets/icons/createCommunities.svg";
import Tabs from "../../../../components/Tabs";
function CommunitiesTopMenu() {


  const backHandle= () => {
    window.location.href = "/  "
  }
  return (

    
    <>
      <div className={style.topMenu}>
        <div className={style.left}>
          <button
            className={style.backButton}
            onClick={() => {
              backHandle();
            }}
          >
            <img src={backIcon} />
          </button>

          <h2>Topluluklar</h2>
        </div>
        <div className={style.iconButtons}>
          <button>
            <img src={searchIcon} />
          </button>

          <button>
            <img src={createCommunitiesIcon} />
          </button>
        </div>
      </div>
    </>
  );
}

export default CommunitiesTopMenu;
