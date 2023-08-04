import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserPlaces = () => {
  const { sendRequest, errorModalHandler, isLoading, error } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const userId = useParams().userId;

  const placeDeleteHandler = (deletedPlaceId) => {
    const places = loadedPlaces.filter((place) => place.id !== deletedPlaceId);
    if (!places) {
      setLoadedPlaces([]);
    } else {
      setLoadedPlaces(places);
    }
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={errorModalHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDelete={placeDeleteHandler} />
      )}
    </Fragment>
  );
};

export default UserPlaces;
