export function ResultsShow(props) {
  return (
    <div>
      <h1>
        {props.event.away_team} at {props.event.home_team}
      </h1>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Team</th>
            <th scope="col">1</th>
            <th scope="col">2</th>
            <th scope="col">3</th>
            <th scope="col">4</th>
            <th scope="col">T</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              {props.event.home_team} ({props.results.summary.home.record.wins}-
              {props.results.summary.home.record.losses})
            </th>
            <td>{props.results.scoring[0].home_points}</td>
            <td>{props.results.scoring[1].home_points}</td>
            <td>{props.results.scoring[2].home_points}</td>
            <td>{props.results.scoring[3].home_points}</td>
            <td className="fw-bold">{props.results.summary.home.points}</td>
          </tr>
          <tr>
            <th scope="row">
              {props.event.away_team} ({props.results.summary.away.record.wins}-
              {props.results.summary.away.record.losses})
            </th>
            <td>{props.results.scoring[0].away_points}</td>
            <td>{props.results.scoring[1].away_points}</td>
            <td>{props.results.scoring[2].away_points}</td>
            <td>{props.results.scoring[3].away_points}</td>
            <td className="fw-bold">{props.results.summary.away.points}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
