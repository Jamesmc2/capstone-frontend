export function FavoriteEvents(props) {
  return (
    <div>
      {props.favoriteEvents.map((favorite) => (
        <div key={favorite.id}>
          <h2>
            {favorite.event.away_team} at {favorite.event.home_team}
          </h2>
          <p>City: {favorite.event.city}</p>
          <p>Stadium: {favorite.event.stadium}</p>
          <p>{favorite.time_edit}</p>
          <button onClick={() => props.deleteFavorite(favorite.id)}>Delete favorite</button>
        </div>
      ))}
    </div>
  );
}
