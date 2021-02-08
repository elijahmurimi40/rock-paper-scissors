import { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { CreateOrJoinGameProps } from '../helperFunctions/Props';
import './CreateOrJoinGame.css';
import GameType, { friendInfo, strangerInfo } from '../helperFunctions/GameInfo';
import {
  joinGame, loadingTableRow, serverErrorTableRow,
  noAvailableGamesTableRow,
} from '../ui/CreateOrJoinGameUI';
import { friendSocket, strangerSocket } from '../helperFunctions/SocketIO';

const FRIEND_LINK = '/play-with-friend';
const STRANGER_LINK = '/play-with-stranger';
let friendStrangerLink = '';
let gameCode = '';
let isComponentMounted = false;

function CreateOrJoinGame(props: CreateOrJoinGameProps) {
  const { children } = props;
  const { playingInfo, selectDiv } = children;
  const playingInfoRef = useRef<GameType>({ code: -1, info: '' });
  playingInfoRef.current = playingInfo;

  const gameNameI = useRef<HTMLInputElement>(null);
  const createGameB = useRef<HTMLButtonElement>(null);
  const errorMessageP = useRef<HTMLParagraphElement>(null);
  const gameCodeI = useRef<HTMLInputElement>(null);
  const enterGameB = useRef<HTMLButtonElement>(null);
  const errorMessageCodeP = useRef<HTMLParagraphElement>(null);
  const selectMaxScore = useRef<HTMLSelectElement>(null);
  const selectFilter = useRef<HTMLSelectElement>(null);
  const filterValue = useRef('');
  const filteredItemsNumber = useRef(0);

  const isPlayingInfoEqualFriendInfo = useRef((): boolean => true);
  // eslint-disable-next-line no-unused-vars
  const connectSocket = useRef((socket: any) => { });

  const strangerSocketRef = useRef(() => { });
  const friendSocketRef = useRef(() => { });

  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [availableGames, setAvailableGames] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [roomsArr, setRoomsArr] = useState([]);

  const availableGamesRef = useRef(0);
  availableGamesRef.current = availableGames;

  const roomsArrRef = useRef([]);
  roomsArrRef.current = roomsArr;

  isPlayingInfoEqualFriendInfo.current = () => playingInfo === friendInfo;

  const createJoinGame = (arrRef: any[], type: string | null = null) => {
    /**
     * ref order
     * input -> button -> error paragraph
     *
     * type is if button is for creating new game or joining a game
     *
     */
    const nameInput = arrRef[0];
    const buttonB = arrRef[1];
    const errorParagraph = arrRef[2];

    nameInput.current!!.parentElement!!.classList.add('disabled');
    buttonB.current!!.classList.add('disabled');
    errorParagraph.current!!.textContent = 'Loading .....';
    const name = nameInput.current!!.value;
    const nameNoSpace = name.replace(/\s/g, '');

    const maxScore = selectMaxScore.current!!.value;
    if (nameNoSpace.length < 3 || nameNoSpace.length > 40) {
      nameInput.current!!.parentElement!!.classList.remove('disabled');
      buttonB.current!!.classList.remove('disabled');
      errorParagraph.current!!.textContent = 'Error! Name/ Code must be between 3 and 40 characters';
      return;
    }

    if (type != null && nameNoSpace.substr(nameNoSpace.length - 3) === '-s-') {
      friendStrangerLink = `${STRANGER_LINK}/${nameNoSpace}`;
      setRedirect(true);
      return;
    }

    if (type != null) {
      gameCode = nameNoSpace;
      friendStrangerLink = `${FRIEND_LINK}/${gameCode}`;
      setRedirect(true);
      return;
    }

    if (isPlayingInfoEqualFriendInfo.current()) {
      nameInput.current!!.parentElement!!.classList.remove('disabled');
      buttonB.current!!.classList.remove('disabled');
      errorParagraph.current!!.textContent = '';
      gameCode = btoa(nameNoSpace);
      if (gameCode.length > 5) {
        gameCode = gameCode.slice(gameCode.length - 5, gameCode.length);
      }

      friendSocket.emit('create friend room', `${maxScore}-max-score-${name}-rps-${gameCode}-f-`);
      friendStrangerLink = `${FRIEND_LINK}/${gameCode}-f-`;
      friendSocket.on('room already exists', () => {
        errorParagraph.current!!.textContent = 'err. Name already taken :-(';
      });
      friendSocket.on('creating room', () => {
        setRedirect(true);
      });
      return;
    }

    if (!isPlayingInfoEqualFriendInfo.current()) {
      nameInput.current!!.parentElement!!.classList.remove('disabled');
      buttonB.current!!.classList.remove('disabled');
      errorParagraph.current!!.textContent = '';

      gameCode = btoa(nameNoSpace);
      if (gameCode.length > 5) {
        gameCode = gameCode.slice(gameCode.length - 5, gameCode.length);
      }

      strangerSocket.emit('create stranger room', `${maxScore}-max-score-${name}-rps-${gameCode}-s-`);
      friendStrangerLink = `${STRANGER_LINK}/${gameCode}-s-`;
      strangerSocket.on('room already exists st', () => {
        errorParagraph.current!!.textContent = 'err. Name already taken :-(';
      });
      strangerSocket.on('creating stranger room', () => {
        strangerSocket.emit('get rooms');
        setRedirect(true);
      });
    } else {
      nameInput.current!!.parentElement!!.classList.remove('disabled');
      buttonB.current!!.classList.remove('disabled');
      errorParagraph.current!!.textContent = 'Server Error! Try again';
    }
  };

  const joinGameOnClick = (code: string) => {
    friendStrangerLink = `${STRANGER_LINK}/${code}`;
    setRedirect(true);
  };

  const enterGameCode = (
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

  const availableGamesTableRow = (
    <>
      {
        roomsArrRef.current.map((room: any, idx: number) => {
          const code = room[0];
          const maxScore = room[1].split('-max-score-')[0];
          const name = room[1].split('-max-score-')[1];
          if (filterValue.current !== 'all' && maxScore !== filterValue.current) {
            if (filteredItemsNumber.current === 0) availableGamesRef.current = 0;
            return;
          }
          filteredItemsNumber.current = 1;
          // eslint-disable-next-line consistent-return
          return (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={idx}>
              <td>{name}</td>
              <td>{`MAX SCORE: ${maxScore}`}</td>
              <td>
                <button
                  type="button"
                  className="ui mini orange button"
                  onClick={() => joinGameOnClick(code)}
                >
                  Join Game
                </button>
              </td>
            </tr>
          );
        })
      }
    </>
  );

  connectSocket.current = (socket: any) => {
    isComponentMounted = true;
    socket.on('connect', () => {
      if (!isComponentMounted) return;
      setServerError(false);
      if (!isPlayingInfoEqualFriendInfo.current()) setAvailableGames(0);
      setIsLoading(false);
    });

    socket.on('disconnect', () => {
      if (!isComponentMounted) return;
      setServerError(true);
      setIsLoading(false);
    });

    socket.io.on('error', () => {
      if (!isComponentMounted) return;
      setServerError(true);
      setIsLoading(false);
    });

    if (socket.connected) {
      setServerError(false);
      setIsLoading(false);
    }
  };

  const disconnectSocket = (info: GameType) => {
    switch (info) {
      case friendInfo:
        friendSocket.off('connect');
        friendSocket.off('disconnect');
        friendSocket.io.off('error');
        friendSocket.off();
        break;
      case strangerInfo:
        strangerSocket.off('connect');
        strangerSocket.off('disconnect');
        strangerSocket.io.off('error');
        strangerSocket.off();
        break;
      default:
    }
  };

  friendSocketRef.current = () => {
    if (!isPlayingInfoEqualFriendInfo.current()) return;
    connectSocket.current(friendSocket);
  };

  strangerSocketRef.current = () => {
    if (isPlayingInfoEqualFriendInfo.current()) return;
    connectSocket.current(strangerSocket);
    strangerSocket.emit('get rooms');
    strangerSocket.on('rooms map', (rooms: any) => {
      filteredItemsNumber.current = 0;
      setRoomsArr(rooms);
      setAvailableGames(rooms.length);
    });
  };

  useEffect(() => {
    // effect
    (selectDiv!!.current!!.childNodes[1] as HTMLSelectElement).disabled = true;
    friendSocketRef.current();
    strangerSocketRef.current();
    filterValue.current = selectFilter.current!!.value;
    selectFilter.current!!.addEventListener('change', (e) => {
      filterValue.current = (e.target as HTMLSelectElement).value;
      const newRoomArr = [...roomsArrRef.current];
      filteredItemsNumber.current = 0;
      setRoomsArr(newRoomArr);
    });
    return () => {
      // cleanup
      disconnectSocket(playingInfoRef.current);
      isComponentMounted = false;
    };
  }, [selectDiv]);

  return (
    <>
      {/* redirect to playing zone */}
      {redirect ? <Redirect push to={friendStrangerLink} /> : ''}
      {/* create or join game input */}
      <div className="ui center aligned basic segment join-game background">
        <p>Create A Game</p>
        <div style={{ paddingBottom: '15px' }}>
          <select
            ref={selectMaxScore}
            style={{ padding: '5px 5px' }}
            name="select_max_score"
            className="ui selection dropdown select-max-score"
            defaultValue="3"
          >
            <option key="3" value="3">3</option>
            <option key="5" value="5">5</option>
          </select>
          <span style={{ paddingLeft: '15px' }}>Select Max Score</span>
        </div>
        <div className="ui input small">
          <input
            ref={gameNameI}
            type="text"
            placeholder="Enter Game Name ....."
            maxLength={40}
            minLength={3}
          />
        </div>

        <button
          ref={createGameB}
          type="button"
          className="small ui orange button"
          onClick={() => createJoinGame([gameNameI, createGameB, errorMessageP])}
        >
          Create Game
        </button>
        <p ref={errorMessageP} />

        <div className="ui horizontal divider">
          Or
        </div>

        {isPlayingInfoEqualFriendInfo.current() && enterGameCode}
        {!isPlayingInfoEqualFriendInfo.current() && joinGame(selectFilter)}
      </div>

      {/* game info */}
      <div className="games">
        <table className="table table-bordered">
          <tbody>
            {/* check if page is loading and show loading words */}
            {isLoading && loadingTableRow}

            {/* check for server error and show error if unable to connect to server */}
            {serverError && serverErrorTableRow}

            {/* only if playing info is strangerInfo */}
            {
              !isPlayingInfoEqualFriendInfo.current()
              && !isLoading
              && !serverError
              && availableGamesRef.current <= 0
              && noAvailableGamesTableRow
            }
            {
              !isPlayingInfoEqualFriendInfo.current()
              && !isLoading
              && !serverError
              && availableGamesRef.current > 0
              && availableGamesTableRow
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CreateOrJoinGame;
