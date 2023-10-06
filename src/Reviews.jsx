export function Reviews(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onSubmitReview(params, () => event.target.reset());
  };
  return (
    <div className="text-center">
      <h1>
        {props.event.away_team} at {props.event.home_team}
      </h1>
      <h2>{props.event.scheduled_date}</h2>

      <h2>Leave a review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Review: <input name="text" type="text" />
        </div>
        <div>
          <input name="event_id" type="hidden" value={props.event.id} />
        </div>
        <button type="submit">Submit review</button>
      </form>
      <h2>All reviews</h2>
      {props.reviews.map((review) => (
        <div key={review.id}>
          <h3>
            {review.user.name} | {review.created_at}
          </h3>
          <p>{review.text}</p>
        </div>
      ))}
    </div>
  );
}
