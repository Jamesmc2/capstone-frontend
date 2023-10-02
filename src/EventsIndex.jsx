export function EventIndex(props) {
  return (
    <div>
      <hr></hr>
      <button onClick={() => props.showFavorites()}>View favorited games</button>
      {props.events.map((event) => (
        <div key={event.id}>
          <h2>
            {event.away_team} at {event.home_team}
          </h2>
          <p>City: {event.city}</p>
          <p>Stadium: {event.stadium}</p>
          <p>{event.scheduled_date}</p>

          <button onClick={() => props.onFavorite(event.id)}>Favorite</button>
        </div>
      ))}
    </div>
  );
}
