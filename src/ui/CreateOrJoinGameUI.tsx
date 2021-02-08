import { RefObject } from 'react';

// Enter game code to join game
export const enterGameCode = (
  gameCodeI: RefObject<HTMLInputElement> | null,
  enterGameB: RefObject<HTMLButtonElement> | null,
  // eslint-disable-next-line no-unused-vars
  createJoinGame: (arrRef: any[], type: string | null) => void,
  errorMessageCodeP: RefObject<HTMLParagraphElement> | null,
) => (
  <>
    <p>Enter Game Code To Join a Game</p>
    <div className="ui input small">
      <input
        ref={gameCodeI}
        type="text"
        placeholder="Enter Game Code ....."
        maxLength={40}
        minLength={3}
      />
    </div>

    <button
      ref={enterGameB}
      type="button"
      className="small ui orange button"
      onClick={() => createJoinGame([gameCodeI, enterGameB, errorMessageCodeP], '')}
    >
      Enter Game
    </button>
    <p ref={errorMessageCodeP} />
  </>
);

//  join game section
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
