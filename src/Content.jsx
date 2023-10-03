import { useEffect, useState } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { EventIndex } from "./EventsIndex";
import { Modal } from "./Modal";
import { FavoriteEvents } from "./FavoriteEvents";
import { Reviews } from "./Reviews";
import axios from "axios";

export function Content() {
  const [events, setEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showEvent, setShowEvent] = useState({});

  const getEvents = () => {
    axios.get("http://localhost:3000/events.json").then((response) => setEvents(response.data));
  };

  const handleFavorite = (event) => {
    console.log("handling favorite", event.id);
    axios.post(`http://localhost:3000/favorites/${event.id}.json`).then((response) => {
      console.log(response.data);
    });
  };

  const handleShowFavorites = () => {
    axios.get("http://localhost:3000/favorites.json").then((response) => {
      setFavorites(response.data);
      console.log(response.data);
    });
    setShowFavoriteModal(true);
  };

  const handleClose = () => {
    setShowFavoriteModal(false);
    setShowReviewsModal(false);
  };

  const deleteFavorite = (id) => {
    axios.delete(`http://localhost:3000/favorites/${id}.json`).then((response) => {
      console.log(response.data);
      setFavorites(favorites.filter((f) => f.id !== id));
      handleClose();
    });
  };

  const getReviews = (event) => {
    axios.get(`http://localhost:3000/reviews/${event.id}.json`).then((response) => {
      setReviews(response.data);
      setShowEvent(event);
      setShowReviewsModal(true);
    });
  };
  const createReview = (params, successCallback) => {
    axios.post(`http://localhost:3000/reviews.json`, params).then((response) => {
      setReviews([...reviews, response.data]);
      successCallback();
    });
  };

  useEffect(getEvents, []);

  return (
    <div>
      <Login />
      <Signup />
      <Modal show={showFavoriteModal} onClose={handleClose}>
        <FavoriteEvents favoriteEvents={favorites} deleteFavorite={deleteFavorite} />
      </Modal>
      <Modal show={showReviewsModal} onClose={handleClose}>
        <Reviews reviews={reviews} onSubmitReview={createReview} event={showEvent} />
      </Modal>
      <EventIndex
        events={events}
        onFavorite={handleFavorite}
        favorites={favorites}
        showFavorites={handleShowFavorites}
        showReviews={getReviews}
      />
    </div>
  );
}
