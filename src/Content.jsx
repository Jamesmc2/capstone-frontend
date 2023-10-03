import { useEffect, useState } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { EventIndex } from "./EventsIndex";
import { Modal } from "./Modal";
import { FavoriteEvents } from "./FavoriteEvents";
import axios from "axios";

export function Content() {
  const [events, setEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getEvents = () => {
    axios.get("http://localhost:3000/events.json").then((response) => setEvents(response.data));
  };

  const handleFavorite = (id) => {
    console.log("handling favorite", id);
    axios.post(`http://localhost:3000/favorites/${id}.json`).then((response) => console.log(response.data));
  };

  const handleShowFavorites = () => {
    axios.get("http://localhost:3000/favorites.json").then((response) => {
      setFavorites(response.data);
    });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const deleteFavorite = (id) => {
    axios.delete(`http://localhost:3000/favorites/${id}.json`).then((response) => {
      console.log(response.data);
      setFavorites(favorites.filter((f) => f.id !== id));
      handleClose();
    });
  };

  useEffect(getEvents, []);

  return (
    <div>
      <Login />
      <Signup />
      <Modal show={showModal} onClose={handleClose}>
        <FavoriteEvents favoriteEvents={favorites} deleteFavorite={deleteFavorite} />
      </Modal>
      <EventIndex
        events={events}
        onFavorite={handleFavorite}
        favorites={favorites}
        showFavorites={handleShowFavorites}
      />
    </div>
  );
}
