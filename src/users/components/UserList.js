import React from "react";
import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import "./UserList.css";

function UserList(props) {
  if (props.items.length === 0)
    return (
      <div className="center">
        <Card>
          <h2>No user found</h2>
        </Card>
      </div>
    );

  return (
    <ul className="users-list">
      {props.items.map((item) => (
        <UserItem
          key={item.id}
          id={item.id}
          image={item.image}
          name={item.name}
          places={item.places.length}
        />
      ))}
    </ul>
  );
}

export default UserList;
