import { RefObject } from 'react';

export const joinGame = (selectFilter: RefObject<HTMLSelectElement> | null) => (
  <>
    <h4 className="ui header">
      Join Game
    </h4>
    <select
      ref={selectFilter}
      style={{ padding: '5px 5px' }}
      name="max_score_filter"
      className="ui selection dropdown select-max-score"
      defaultValue="all"
    >
      <option key="all" value="all">All</option>
      <option key="3" value="3">3</option>
      <option key="5" value="5">5</option>
    </select>
    <span style={{ paddingLeft: '15px' }}>Select Max Score</span>
  </>
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
