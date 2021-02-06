export const joinGame = (
  <h4 className="ui header">
    Join Game
  </h4>
);

export const loadingTableRow = (
  <tr>
    <td colSpan={2}>
      <h5>Loading .....</h5>
    </td>
  </tr>
);

export const serverErrorTableRow = (
  <tr>
    <td colSpan={2}>
      <h5>500 Internal Server Error</h5>
      Oops, something went wrong. Reconnecting .....
      <p>
        The server encountered an internal error or
        misconfiguration and was unable to complete your request
      </p>
    </td>
  </tr>
);

export const noAvailableGamesTableRow = (
  <tr>
    <td colSpan={2}>
      <h6>No Games</h6>
      Create one?
    </td>
  </tr>
);

export const availableGamesTableRow = (
  <>
    <tr>
      <td>Game 1</td>
      <td>
        <button type="button" className="ui mini orange button">
          Join Game
        </button>
      </td>
    </tr>
    <tr>
      <td>Game 2</td>
      <td>
        <button type="button" className="ui mini orange button">
          Join Game
        </button>
      </td>
    </tr>
  </>
);
