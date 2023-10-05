import { useState } from "react";

export function EventIndex(props) {
  const [searchFilter, setSearchFilter] = useState("");
  let teamNames = [
    "Arizona Cardinals",
    "Atlanta Falcons",
    "Baltimore Ravens",
    "Buffalo Bills",
    "Carolina Panthers",
    "Chicago Bears",
    "Cincinnati Bengals",
    "Cleveland Browns",
    "Dallas Cowboys",
    "Denver Broncos",
    "Detroit Lions",
    "Green Bay Packers",
    "Houston Texans",
    "Indianapolis Colts",
    "Jacksonville Jaguars",
    "Kansas City Chiefs",
    "Las Vegas Raiders",
    "Los Angeles Chargers",
    "Los Angeles Rams",
    "Miami Dolphins",
    "Minnesota Vikings",
    "New England Patriots",
    "New Orleans Saints",
    "New York Giants",
    "New York Jets",
    "Philadelphia Eagles",
    "Pittsburgh Steelers",
    "San Francisco 49ers",
    "Seattle Seahawks",
    "Tampa Bay Buccaneers",
    "Tennessee Titans",
    "Washington Commanders",
  ];

  return (
    <div>
      <h1>2023 NFL schedule</h1>

      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Week {props.events[0] && props.events[0].week}
        </button>
        <ul className="dropdown-menu">
          <li>
            <button className="dropdown-item" onClick={() => props.setWeek(1)}>
              Week 1
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => props.setWeek(2)}>
              Week 2
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => props.setWeek(3)}>
              Week 3
            </button>
          </li>
        </ul>
      </div>
      <p>
        Search by team:{" "}
        <input
          type="text"
          value={searchFilter}
          onChange={(event) => setSearchFilter(event.target.value)}
          list="teamNames"
        />
      </p>

      <datalist id="teamNames">
        {teamNames.map((name) => (
          <option key={name}>{name}</option>
        ))}
      </datalist>
      <button onClick={() => props.showFavorites()}>View favorited games</button>
      {props.events
        .filter(
          (event) =>
            event.home_team.toLowerCase().includes(searchFilter.toLowerCase()) ||
            event.away_team.toLowerCase().includes(searchFilter.toLowerCase())
        )
        .map((event) => (
          <div key={event.id}>
            <h2>
              {event.away_team} at {event.home_team}
            </h2>
            <p>City: {event.city}</p>
            <p>Stadium: {event.stadium}</p>
            <p>{event.scheduled_date}</p>
            <p>Favorite count: {event.favorite_count}</p>

            <button onClick={() => props.onFavorite(event)}>Favorite</button>
            <button onClick={() => props.showReviews(event)}>See reviews</button>
            {event.status === "closed" && <button onClick={() => props.onResults(event)}>Show results</button>}
            <hr></hr>
          </div>
        ))}
    </div>
  );
}
