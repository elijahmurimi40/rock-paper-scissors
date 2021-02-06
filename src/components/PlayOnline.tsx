import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { ContainerProps } from '../helperFunctions/Props';
import { loadingTableRow, serverErrorTableRow } from '../ui/CreateOrJoinGameUI';
import { friendSocket, strangerSocket } from '../helperFunctions/SocketIO';
import Game from './Game';
import GameType, { friendInfo, strangerInfo } from '../helperFunctions/GameInfo';

/**
 * code will have -f- for friend and -s- for stranger
 */

interface ParamsTypes {
  code: string
}

const errorTableRow = (
  <tr>
    <td colSpan={2}>
      <h5>Invalid Game Code/or Room is Full. 2 players only</h5>
    </td>
  </tr>
);

let playingInfo: GameType = { code: -1, info: '' };

function PlayOnline(props: ContainerProps) {
  const { code } = useParams<ParamsTypes>();
  // const { code } = useParams<Record<string, string | undefined>>();
  const codeRef = useRef<string>('');
  codeRef.current = code;

  const { children } = props;
  const { container, margin, selectDiv } = children;

  const refInput = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [showCopyToClipboard, setShowCopyToClipboard] = useState(false);
  const [showYourOpponentLeft, setShowYourOpponentLeft] = useState(false);

  const checkCodeAndConnectToSocket = useRef(() => { });
  // eslint-disable-next-line no-unused-vars
  const connectSocket = useRef((socket: any) => { });

  const updateState = (
    isLoading_: boolean,
    error_: boolean,
    serverError_: boolean,
    startGame_: boolean,
    showCopyToClipboard_: boolean,
    showYourOpponentLeft_: boolean,
  ) => {
    setIsLoading(isLoading_);
    setError(error_);
    setServerError(serverError_);
    setStartGame(startGame_);
    setShowCopyToClipboard(showCopyToClipboard_);
    setShowYourOpponentLeft(showYourOpponentLeft_);
  };

  const doesRoomExists = (socket: any) => {
    socket.emit('does room exists', code);
  };

  connectSocket.current = (socket: any) => {
    let isDisconnectedOrError = false;

    socket.on('connect', () => {
      updateState(false, false, false, false, false, false);
      if (isDisconnectedOrError) doesRoomExists(socket);
    });

    socket.on('disconnect', () => {
      isDisconnectedOrError = true;
      updateState(false, false, true, false, false, false);
    });

    socket.io.on('error', () => {
      isDisconnectedOrError = true;
      updateState(false, false, true, false, false, false);
    });

    if (socket.connected) {
      isDisconnectedOrError = false;
      updateState(false, false, false, false, false, false);
    }
  };

  const disconnectSocket = (codeString: string) => {
    switch (codeString) {
      case '-f-':
        friendSocket.off('connect');
        friendSocket.off('disconnect');
        friendSocket.io.off('error');
        friendSocket.off();
        break;
      case '-s-':
        strangerSocket.off('connect');
        strangerSocket.off('disconnect');
        strangerSocket.io.off('error');
        strangerSocket.off();
        break;
      default:
    }
  };

  const connectToAllSockets = (socket: any) => {
    connectSocket.current(socket);
    // check if a room exists
    doesRoomExists(socket);
    socket.on('room doesn\'t exist', () => {
      updateState(false, true, false, false, false, false);
    });

    // check number of playes in a room
    socket.on('room is full', () => {
      updateState(false, true, false, false, false, false);
    });

    // wait for two participants
    socket.on('wait for oppenent', () => {
      updateState(false, false, false, false, true, false);
    });

    // players are full
    socket.on('start game', (maxScore: number) => {
      updateState(false, false, false, true, false, false);
      (selectDiv!!.current!!.childNodes[1] as HTMLSelectElement).value = maxScore.toString();
      (selectDiv!!.current!!.childNodes[1] as HTMLSelectElement).disabled = false;
    });

    // an opponent left
    socket.on('player left', () => {
      updateState(false, false, false, false, false, true);
      (selectDiv!!.current!!.childNodes[1] as HTMLSelectElement).disabled = true;
    });
  };

  checkCodeAndConnectToSocket.current = () => {
    const validCode = code.substr(code.length - 3);
    if (validCode === '-f-') {
      playingInfo = friendInfo;
      connectToAllSockets(friendSocket);
    } else if (validCode === '-s-') {
      playingInfo = strangerInfo;
      connectToAllSockets(strangerSocket);
    } else {
      setIsLoading(false);
      setError(true);
    }
  };

  const copyToClipBoard = () => {
    // select the input
    refInput.current!!.select();
    refInput.current!!.setSelectionRange(0, 99999); // for mobile

    // copy the text
    document.execCommand('copy');
  };

  const waitForPlayer = (
    <tr>
      <td colSpan={2}>
        <p>
          {/* Share the code with a friend */}
          {
            playingInfo === strangerInfo
              ? 'Waiting for connection or share the code'
              : 'Share the code with a friend'
          }
        </p>
        <div className="ui action input">
          <input ref={refInput} type="text" value={code} readOnly />
          <button type="button" className="ui teal right labeled icon button" onClick={copyToClipBoard}>
            <i className="copy icon" />
            Copy
          </button>
        </div>
      </td>
    </tr>
  );

  const playerLeft = (
    <tr>
      <td colSpan={2}>
        <p>
          {/* Your oppenent Left :-(. Share code with friend */}
          {
            playingInfo === strangerInfo
              ? 'Your oppenent Left :-(. Waiting for connection or share the code'
              : 'Your oppenent Left :-(. Share code with friend'
          }
        </p>
        <div className="ui action input">
          <input ref={refInput} type="text" value={code} readOnly />
          <button type="button" className="ui teal right labeled icon button" onClick={copyToClipBoard}>
            <i className="copy icon" />
            Copy
          </button>
        </div>
      </td>
    </tr>
  );

  const playOnlineUI = (
    <Container
      style={{
        marginTop: `${margin + 10}px`,
        marginBottom: `${margin + 10}px`,
      }}
    >
      <Row>
        <Col />
        <Col
          lg={12}
          md={12}
          sm={12}
          xl={12}
          xs={12}
        >
          <div className="games">
            <table className="table table-bordered">
              <tbody>
                {showCopyToClipboard && waitForPlayer}
                {isLoading && loadingTableRow}
                {error && errorTableRow}
                {serverError && serverErrorTableRow}
                {showYourOpponentLeft && playerLeft}
              </tbody>
            </table>
          </div>
        </Col>
        <Col />
      </Row>
    </Container>
  );

  useEffect(() => {
    // effect
    checkCodeAndConnectToSocket.current();
    return () => {
      // cleanup
      disconnectSocket(codeRef.current.substr(codeRef.current.length - 3));
      friendSocket.emit('player leaving');
      strangerSocket.emit('player leaving');
    };
  }, []);

  return (
    <>
      {
        !startGame ? playOnlineUI
          : (
            <Game>
              {{
                container, margin, playingInfo, selectDiv,
              }}
            </Game>
          )
      }
    </>
  );
}

export default PlayOnline;
