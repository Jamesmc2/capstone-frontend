import { useEffect, useState } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { EventIndex } from "./EventsIndex";
import axios from "axios";

export function Content() {
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  const getEvents = () => {
    axios.get("http://localhost:3000/events.json").then((response) => setEvents(response.data));
  };

  const handleFavorite = (id) => {
    console.log("handling favorite", id);
    axios.post(`http://localhost:3000/favorites/${id}.json`).then((responce) => console.log(responce.data));
  };

  const getCurrentUser = () => {
    if (localStorage.jwt) {
      axios.get("http://localhost:3000/current_user.json").then((response) => setCurrentUser(response.data));
    }
  };

  useEffect(getEvents, []);
  useEffect(getCurrentUser, []);

  return (
    <div>
      <Login />
      <Signup />
      <EventIndex events={events} onFavorite={handleFavorite} currentUser={currentUser} />
    </div>
  );
}
