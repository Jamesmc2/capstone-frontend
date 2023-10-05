import { useEffect, useState } from "react";
import { ResultsShow } from "./ResultsShow";
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
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showEvent, setShowEvent] = useState({});
  const [results, setResults] = useState({});
  const [currentWeek, setCurrentWeek] = useState(1);

  const getEvents = (week) => {
    if (week) {
      axios.get(`http://localhost:3000/events/${week}.json`).then((response) => {
        console.log(response.data);
        setEvents(response.data);
      });
    } else {
      axios.get(`http://localhost:3000/events/1.json`).then((response) => {
        console.log(response.data);
        setEvents(response.data);
      });
    }
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
    setShowResultsModal(false);
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

  const getResults = (event) => {
    axios.get(`http://localhost:3000/events/${event.id}/results.json`).then((response) => {
      console.log(response.data);
      setResults(response.data);
      setShowEvent(event);
      setShowResultsModal(true);
    });
  };

  useEffect(getEvents, []);

  return (
    <div className="container">
      <Modal show={showFavoriteModal} onClose={handleClose}>
        <FavoriteEvents favoriteEvents={favorites} deleteFavorite={deleteFavorite} />
      </Modal>
      <Modal show={showReviewsModal} onClose={handleClose}>
        <Reviews reviews={reviews} onSubmitReview={createReview} event={showEvent} />
      </Modal>
      <Modal show={showResultsModal} onClose={handleClose}>
        <ResultsShow results={results} event={showEvent} />
      </Modal>
      <EventIndex
        events={events}
        onFavorite={handleFavorite}
        favorites={favorites}
        showFavorites={handleShowFavorites}
        showReviews={getReviews}
        onResults={getResults}
        setWeek={getEvents}
      />
    </div>
  );
}
