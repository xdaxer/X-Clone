import React from "react";
import style from "./style.module.scss";
import Tabs from "../../../components/Tabs";
import { Link } from "react-router-dom";

const NotificationData = [
  {
    content: `Abdullah Yirik seni takip etti`,
    profilePicture:
      "https://pbs.twimg.com/profile_images/1939569594148048896/BFQBdfpF_400x400.jpg",
    username: "xdaxerr",
    id: 1,
  },
  {
    content: `Rana Erkoç seni takip etti`,
    profilePicture: `https://randomuser.me/api/portraits/women/${Math.floor(
      Math.random() * 75
    )}.jpg`,
    username: "ranaerkoc",
    id: 2,
  },
  {
    content: `Taylan Duru gönderini beğendi`,
    profilePicture: `https://randomuser.me/api/portraits/men/${Math.floor(
      Math.random() * 75
    )}.jpg`,
    username: "taylanduru",
    id: 3,
  },
  {
    content: `Abdullah Yirik CANLI yayında: "Kodlama Maratonu Başlıyor"`,
    profilePicture:
      "https://pbs.twimg.com/profile_images/1939569594148048896/BFQBdfpF_400x400.jpg",
    username: "xdaxerr",
    id: 4,
  },
  {
    content: `Baran Güloğlu bir gönderini alıntıladı`,
    profilePicture: `https://randomuser.me/api/portraits/men/${Math.floor(
      Math.random() * 75
    )}.jpg`,
    username: "baranguloglu",
    id: 5,
  },
  {
    content: `Duru Yekta yorum yaptı: "Çok güzel düşünülmüş!"`,
    profilePicture: `https://randomuser.me/api/portraits/women/${Math.floor(
      Math.random() * 75
    )}.jpg`,
    username: "duru.yekta",
    id: 6,
  },
  {
    content: `Özgür Özel CANLI yayında: "Silivri'de Cumhurbaşkanı Adayımız Ekrem İmamoğlu'nu ziyaretimizin ardından açıklama yapıyorum"`,
    profilePicture:
      "https://pbs.twimg.com/profile_images/1875130919620612096/265R66N9_400x400.jpg",
    username: "eczozgurozel",
    id: 7,
  },
  {
    content: `Kerem Bildiş seni takip etti`,
    profilePicture: `https://randomuser.me/api/portraits/men/${Math.floor(
      Math.random() * 75
    )}.jpg`,
    username: "kerembildis",
    id: 8,
  },
  {
    content: `Sude Narin gönderine tepki verdi`,
    profilePicture: `https://randomuser.me/api/portraits/women/${Math.floor(
      Math.random() * 75
    )}.jpg`,
    username: "sudenarin",
    id: 9,
  },
  {
    content: `Yiğit Ercan CANLI yayında: "Yeni Proje Tanıtımı"`,
    profilePicture: `https://randomuser.me/api/portraits/men/${Math.floor(
      Math.random() * 75
    )}.jpg`,
    username: "yigitercan",
    id: 10,
  },
  {
    content: `Beril Saylan gönderini paylaştı`,
    profilePicture: `https://randomuser.me/api/portraits/women/${Math.floor(
      Math.random() * 75
    )}.jpg`,
    username: "berilsaylan",
    id: 11,
  },
  {
    content: `Oğuzhan Erçetin seni etiketledi`,
    profilePicture: `https://randomuser.me/api/portraits/men/${Math.floor(
      Math.random() * 75
    )}.jpg`,
    username: "oguzhanercetin",
    id: 12,
  },
];

function NotificationsList() {
  const tabs = ["Tümü", "Onaylanmış", "Bahsedenler"];
  return (
    <div className={style.notificationsList}>
      <div className={style.topBar}>
        <h2>Bildirimler</h2>
        <Tabs tabs={tabs} defaultSelectedTab="Tümü" />
      </div>
      {NotificationData.map((notification) => (
        <Link
          to={`/${notification.username}`}
          className={style.notification}
          key={notification.id}
        >
          <div>
            <img
              src={notification.profilePicture}
              alt={notification.username}
            />
            <p>@{notification.username}</p>
          </div>
          <span>{notification.content}</span>
        </Link>
      ))}
    </div>
  );
}

export default NotificationsList;
