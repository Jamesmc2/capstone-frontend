export function Reviews(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onSubmitReview(params, () => event.target.reset());
  };
  return (
    <div>
      <h1>Leave a review</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Review: <input name="text" type="text" />
        </div>
        <div>
          <input name="event_id" type="hidden" value={props.event.id} />
        </div>
        <button type="submit">Submit review</button>
      </form>
      <h1>All reviews</h1>
      {props.reviews.map((review) => (
        <div key={review.id}>
          <h3>{review.user.name}</h3>
          <p>{review.text}</p>
        </div>
      ))}
    </div>
  );
}
