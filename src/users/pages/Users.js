import React from "react";
import UserList from "../components/UserList";

const USERS = [
  {
    id: "u1",
    name: "Doraemon",
    image: "https://easydrawingguides.com/wp-content/uploads/2021/05/Doraemon-Step-10.png",
    places: 4,
  },
  {
    id: "u2",
    name: "Nobita",
    image: "https://e0.pxfuel.com/wallpapers/757/209/desktop-wallpaper-nobita-art-sleeve-doraemon-thumbnail.jpg",
    places: 2,
  },
];

function Users() {
  return <UserList items={USERS} />;
}

export default Users;
