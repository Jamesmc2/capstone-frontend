export function EventIndex(params) {
  return (
    <div>
      {params.events.map((event) => (
        <div key={event.id}>
          <h2>
            {event.away_team} at {event.home_team}
          </h2>
          <p>City: {event.city}</p>
          <p>Stadium: {event.stadium}</p>
          <p>{event.scheduled_date}</p>

          <button onClick={() => params.onFavorite(event.id)}>Favorite</button>
        </div>
      ))}
    </div>
  );
}
