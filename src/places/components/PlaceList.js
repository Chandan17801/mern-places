import React from "react";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceList.css";

function PlaceList(props) {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No place found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((item) => (
        <PlaceItem
          id={item.id}
          key={item.id}
          name={item.name}
          image={item.image}
          title={item.title}
          address={item.address}
          description={item.description}
          createrId={item.createrId}
          coordinates={item.location}
        />
      ))}
    </ul>
  );
}

export default PlaceList;
