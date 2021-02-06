import { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { CreateOrJoinGameProps } from '../helperFunctions/Props';
import './CreateOrJoinGame.css';
import GameType, { friendInfo, strangerInfo } from '../helperFunctions/GameInfo';
import {
  joinGame, loadingTableRow, serverErrorTableRow,
  noAvailableGamesTableRow, availableGamesTableRow,
} from '../ui/CreateOrJoinGameUI';
import { friendSocket, strangerSocket } from '../helperFunctions/SocketIO';

const FRIEND_LINK = '/play-with-friend';
let friendLink = '';
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

  const isPlayingInfoEqualFriendInfo = useRef((): boolean => true);
  // eslint-disable-next-line no-unused-vars
  const connectSocket = useRef((socket: any) => { });

  const strangerSocketRef = useRef(() => { });
  const friendSocketRef = useRef(() => { });

  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [availableGames, setAvailableGames] = useState(0);
  const [redirect, setRedirect] = useState(false);

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

    if (type != null) {
      gameCode = nameNoSpace;
      friendLink = `${FRIEND_LINK}/${gameCode}`;
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
      friendLink = `${FRIEND_LINK}/${gameCode}-f-`;
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
    } else {
      nameInput.current!!.parentElement!!.classList.remove('disabled');
      buttonB.current!!.classList.remove('disabled');
      errorParagraph.current!!.textContent = 'Server Error! Try again';
    }
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
  };

  useEffect(() => {
    // effect
    (selectDiv!!.current!!.childNodes[1] as HTMLSelectElement).disabled = true;
    friendSocketRef.current();
    strangerSocketRef.current();
    return () => {
      // cleanup
      disconnectSocket(playingInfoRef.current);
      isComponentMounted = false;
    };
  }, [selectDiv]);

  return (
    <>
      {/* redirect to playing zone */}
      {redirect ? <Redirect push to={friendLink} /> : ''}
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
        {!isPlayingInfoEqualFriendInfo.current() && joinGame}
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
              && availableGames <= 0
              && noAvailableGamesTableRow
            }
            {
              !isPlayingInfoEqualFriendInfo.current()
              && !isLoading
              && !serverError
              && availableGames > 0
              && availableGamesTableRow
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CreateOrJoinGame;
