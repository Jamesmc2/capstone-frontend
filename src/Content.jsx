import { useEffect, useState } from "react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { EventIndex } from "./EventsIndex";
import axios from "axios";

export function Content() {
  const [events, setEvents] = useState([]);

  const getEvents = () => {
    axios.get("http://localhost:3000/events.json").then((response) => setEvents(response.data));
  };

  useEffect(getEvents, []);
  return (
    <div>
      <Login />
      <Signup />
      <EventIndex events={events} />
    </div>
  );
}
