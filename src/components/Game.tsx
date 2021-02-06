import { useRef, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import {
  Container, Row, Col, Modal, Button,
} from 'react-bootstrap';
import { Message } from 'semantic-ui-react';
import { ContainerProps } from '../helperFunctions/Props';
import choices, { order, readable } from '../helperFunctions/Choices';
import { AIinfo, friendInfo } from '../helperFunctions/GameInfo';
import './Game.css';
import rock from './rock.svg';
import paper from './paper.svg';
import scissors from './scissors.svg';
import { friendSocket } from '../helperFunctions/SocketIO';

/**
 * Y -> your score
 * O -> opponent score
 *
 */

interface ParamsTypes {
  code: string
}

let isMessageShown = false;
let yourChoice: number | null = null;
let opponentChoice: number | null = null;
let requestMessage = '';
let answerMessage = '';
let typeOfRequest = '';

let maxScore = 0;
let prevMaxScore = 0;
// incoming max score
let acceptedMaxScore = 0;

function Game(props: ContainerProps) {
  const { code } = useParams<ParamsTypes>();

  const buttonY = useRef<HTMLButtonElement>(null);
  const buttonO = useRef<HTMLButtonElement>(null);
  const images = useRef<Array<HTMLImageElement>>([]);
  const messageInfo = useRef<HTMLDivElement>(null);
  const newGameBtn = useRef<HTMLButtonElement>(null);

  // eslint-disable-next-line no-unused-vars
  const checkPlayingInfo = useRef((choice: string) => { });
  const getSelectValue = useRef(() => { });
  // eslint-disable-next-line no-unused-vars
  const connectSocket = useRef((socket: any) => { });
  // eslint-disable-next-line no-unused-vars
  const disconnectSocket = useRef((socket: any) => { });

  const [lineHeight, setLineHeight] = useState(0);
  const [yourScore, setYourScore] = useState('0');
  const [opponentScore, setOpponentScore] = useState('0');
  const [showRequestMessage, setShowRequestMessage] = useState(false);
  const [showAnswerMessage, setShowAnswerMessage] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const yourScoreRef = useRef('0');
  const opponentScoreRef = useRef('0');
  yourScoreRef.current = yourScore;
  opponentScoreRef.current = opponentScore;

  const { children } = props;
  const {
    container, margin, playingInfo, selectDiv,
  } = children;

  // get child nodes of messageInfo to show who won or lost
  // eslint-disable-next-line no-undef
  let messageInfoChildNodes: NodeListOf<ChildNode>;
  // eslint-disable-next-line no-undef
  let contentChildNodes: NodeListOf<ChildNode>;
  // eslint-disable-next-line no-undef
  let header: ChildNode;
  // p for paragraph in content child nodes
  // eslint-disable-next-line no-undef
  let p: ChildNode;

  const isAI = () => playingInfo === AIinfo;
  const isFriendInfo = () => playingInfo === friendInfo;

  const initMessageParams = () => {
    if (messageInfo.current === null) return;
    messageInfoChildNodes = messageInfo.current!!.childNodes;
    contentChildNodes = messageInfoChildNodes[1].childNodes;
    // eslint-disable-next-line prefer-destructuring
    header = contentChildNodes[0];
    // eslint-disable-next-line prefer-destructuring
    p = contentChildNodes[1];
  };

  const restoreShowMessage = () => {
    if (messageInfo.current === null) return;
    if (!isMessageShown) initMessageParams();
    isMessageShown = false;
    header.textContent = 'Rock Paper Scissors';
    if (isAI()) {
      p.textContent = 'Waiting for you .....';
    } else {
      p.textContent = 'Waiting for opponent .....';
    }

    const i = document.createElement('i');
    i.className = 'circle notched loading icon';
    i.setAttribute('aria-hidden', 'true');
    messageInfoChildNodes[0].replaceWith(i);

    images.current.map((image: HTMLImageElement) => {
      image.classList.remove('tranform-img');
      return image;
    });

    yourChoice = null;
    opponentChoice = null;
  };

  const handleRejectRequest = () => {
    if (isFriendInfo()) {
      if (typeOfRequest === 'max-score') {
        friendSocket.emit('reject changing max score', code);
      } else if (typeOfRequest === 'new-game') {
        friendSocket.emit('reject new game', code);
      } else if (typeOfRequest === 'play-again') {
        friendSocket.emit('reject play again', code);
        setRedirect(true);
      }
    }
    setShowRequestMessage(false);
  };

  const handleAcceptRequest = () => {
    if (isFriendInfo()) {
      if (typeOfRequest === 'max-score') {
        friendSocket.emit('accept changing max score', code);
        maxScore = acceptedMaxScore;
        prevMaxScore = maxScore;
        (selectDiv!!.current!!.childNodes[1] as HTMLSelectElement)
          .value = maxScore.toString();
      } else if (typeOfRequest === 'new-game') {
        friendSocket.emit('accept new game', code);
      } else if (typeOfRequest === 'play-again') {
        friendSocket.emit('accept play again', code);
      }
    }
    setShowRequestMessage(false);
    newGame(false);
  };

  const handleShowAnswer = () => {
    setShowAnswerMessage(true);
    let answerTimer = 0;
    if (answerTimer) clearTimeout(answerTimer);
    answerTimer = window.setTimeout(() => {
      setShowAnswerMessage(false);
      clearTimeout(answerTimer);
    }, 2000);
  };

  const newGame = (isBtnPressed: boolean) => {
    initMessageParams();
    restoreShowMessage();
    if (!isBtnPressed) {
      setYourScore('0');
      setOpponentScore('0');
      if (newGameBtn.current === null) return;
      newGameBtn.current!!.textContent = 'New Game';
      return;
    }

    if (isAI()) {
      setYourScore('0');
      setOpponentScore('0');
      if (newGameBtn.current === null) return;
      newGameBtn.current!!.textContent = 'New Game';
    } else if (isFriendInfo()) {
      if (newGameBtn.current!!.textContent === 'New Game') {
        answerMessage = 'Requesting opponent to start a new game';
        friendSocket.emit('new game', code);
        setShowAnswerMessage(true);
      } else if (newGameBtn.current!!.textContent === 'Play Again?') {
        answerMessage = 'Requesting opponent to play again';
        friendSocket.emit('play again', code);
        setShowAnswerMessage(true);
      }
    }
  };

  const showMessage = (
    playerChoice: string,
    headerMessage: string,
    pMessage: string,
    score: number,
    winner: string,
  ) => {
    initMessageParams();
    isMessageShown = true;

    const i = document.createElement('i');
    i.setAttribute('aria-hidden', 'true');

    let messageTimer = 0;
    if (messageTimer) clearTimeout(messageTimer);

    if (score.toString() === maxScore.toString()) {
      newGameBtn.current!!.textContent = 'Play Again?';

      if (winner === 'player') {
        header.textContent = 'You Won!';
        p.textContent = `Yeeeeeeeeeeeee... ${headerMessage}`;

        i.className = 'smile outline icon';
        messageInfoChildNodes[0].replaceWith(i);
      }

      if (winner === 'opponent') {
        header.textContent = 'You Lost :-(';
        p.textContent = `oooh Noooooooo... ${headerMessage}`;

        i.className = 'frown outline icon';
        messageInfoChildNodes[0].replaceWith(i);
      }
    } else {
      header.textContent = headerMessage;
      p.textContent = pMessage;

      i.className = `icon hand ${playerChoice.toLocaleLowerCase()} outline`;
      messageInfoChildNodes[0].replaceWith(i);

      messageTimer = window.setTimeout(() => {
        restoreShowMessage();
        clearTimeout(messageTimer);
      }, 4000);
    }
  };

  const chooseWinner = (playerOneChoice: number, playerTwoChoice: number) => {
    const headerMessage = `Your opponent chose: ${readable[playerTwoChoice]}`;
    let pMessage = '';

    if (order[playerOneChoice] === order[playerTwoChoice]) {
      pMessage = 'The game is tied';
      showMessage(readable[playerTwoChoice], headerMessage, pMessage, 0, '');
    } else if (order[playerOneChoice] === order[playerTwoChoice + 1]) {
      pMessage = 'You won!';
      const newScore = parseInt(yourScoreRef.current, 10) + 1;
      showMessage(readable[playerTwoChoice], headerMessage, pMessage, newScore, 'player');
      setYourScore(newScore.toString());
    } else {
      pMessage = 'You lost :(';
      const newScore = parseInt(opponentScoreRef.current, 10) + 1;
      showMessage(readable[playerTwoChoice], headerMessage, pMessage, newScore, 'opponent');
      setOpponentScore(newScore.toString());
    }
  };

  const checkForChoices = () => {
    initMessageParams();
    if (yourChoice === null && opponentChoice !== null) {
      p.textContent = 'Waiting for you .....';
    } else if (opponentChoice === null && yourChoice !== null) {
      p.textContent = 'Waiting for opponent .....';
    } else if (yourChoice !== null && opponentChoice !== null) {
      chooseWinner(yourChoice as number, opponentChoice as number);
    }
  };

  const eventNames = [
    'opponent choice', 'change max score??', 'max score accepted',
    'max score rejected', 'new game?', 'new game accepted', 'new game rejected',
    'play again?', 'play again accepted', 'play again rejected',
  ];

  const acceptRequest = () => {
    setShowAnswerMessage(false);
    answerMessage = 'Your Opponent accepted';
    handleShowAnswer();
    newGame(false);
  };

  const rejectRequest = () => {
    setShowAnswerMessage(false);
    answerMessage = 'Your Opponent rejected';
    handleShowAnswer();
  };

  connectSocket.current = (socket: any) => {
    // o for opponent
    // choices
    socket.on(eventNames[0], (oChoice: string) => {
      opponentChoice = parseInt(oChoice, 10);
      checkForChoices();
    });

    // wants to change max score
    socket.on(eventNames[1], (oMaxScore: number) => {
      typeOfRequest = 'max-score';
      acceptedMaxScore = oMaxScore;
      requestMessage = `You opponent is requesting to change max score from ${maxScore} to ${oMaxScore}`;
      setShowRequestMessage(true);
    });

    // max score accepted
    socket.on(eventNames[2], () => {
      prevMaxScore = maxScore;
      acceptRequest();
    });

    // max score rejected
    socket.on(eventNames[3], () => {
      maxScore = prevMaxScore;
      (selectDiv!!.current!!.childNodes[1] as HTMLSelectElement).value = prevMaxScore.toString();
      rejectRequest();
    });

    // new game
    socket.on(eventNames[4], () => {
      typeOfRequest = 'new-game';
      requestMessage = 'You opponent wants to start a new game';
      setShowRequestMessage(true);
    });

    // accept new game
    socket.on(eventNames[5], () => {
      acceptRequest();
    });

    // reject new game
    socket.on(eventNames[6], () => {
      rejectRequest();
    });

    // play again
    socket.on(eventNames[7], () => {
      typeOfRequest = 'play-again';
      requestMessage = 'You opponent wants to play again';
      setShowRequestMessage(true);
    });

    // accept play again
    socket.on(eventNames[8], () => {
      acceptRequest();
    });

    // reject play again
    // socket.on(eventNames[9], () => {
    //   rejectRequest();
    // });
  };

  disconnectSocket.current = (socket: any) => {
    eventNames.map((eventName: string) => {
      socket.off(eventName);
      return '';
    });
  };

  checkPlayingInfo.current = (choice: string) => {
    if (yourChoice !== null) return;
    if (parseInt(yourScoreRef.current, 10) === maxScore) return;
    if (parseInt(opponentScoreRef.current, 10) === maxScore) return;
    const choiceNo = choice as unknown as number;
    images.current[choiceNo].classList.add('tranform-img');
    if (isAI() && !isMessageShown) {
      const CPUChoice = Math.floor(Math.random() * 3);
      chooseWinner(choiceNo, CPUChoice);
    } else if (isFriendInfo() && !isMessageShown) {
      yourChoice = parseInt(choice, 10);
      checkForChoices();
      friendSocket.emit('player choice', choice, code);
    }
  };

  // get option menu value
  getSelectValue.current = () => {
    const select = selectDiv!!.current!!.childNodes[1];
    (select as HTMLSelectElement).disabled = false;
    maxScore = 3;
    prevMaxScore = maxScore;
    select.addEventListener('change', (e) => {
      maxScore = (e.target as HTMLSelectElement).value as unknown as number;
      if (isAI()) {
        newGame(false);
      } else if (isFriendInfo()) {
        answerMessage = `Requesting opponent to change max score from ${prevMaxScore} to ${maxScore}`;
        friendSocket.emit('change max score?', maxScore, code);
        setShowAnswerMessage(true);
      }
    });
  };

  useEffect(() => {
    // effect
    const buttonYHeight = buttonY.current!!.clientHeight;
    setLineHeight(buttonYHeight);
    setYourScore('0');
    setOpponentScore('0');
    getSelectValue.current();

    // copy images.current for "react-hooks/exhaustive-deps": "warn", rule
    const imagesC = images.current;

    imagesC.map((image: HTMLImageElement) => {
      const choice = image.getAttribute('data-choice');
      image.addEventListener('click', () => { checkPlayingInfo.current(choice!!); });
      return image;
    });

    // open sockect
    connectSocket.current(friendSocket);
    yourChoice = null;
    opponentChoice = null;
    isMessageShown = false;

    return () => {
      // cleanup
      disconnectSocket.current(friendSocket);
    };
  }, []);

  return (
    <Container
      style={{
        marginTop: `${margin + 10}px`,
        marginBottom: `${margin + 10}px`,
      }}
      ref={container}
    >
      {redirect && <Redirect to="/play-with-friend" />}
      <Row>
        <Col />
        <Col
          lg={12}
          md={12}
          sm={12}
          xl={12}
          xs={12}
        >

          {/* scores */}
          <div className="scores">
            <h5>Scores</h5>
            <div className="ui buttons" style={{ paddingTop: '25px' }}>
              <br />
              <button
                ref={buttonY}
                type="button"
                className="ui icon right labeled orange button button-y button-yo"
              >
                <i
                  aria-hidden="true"
                  className="icon"
                  style={{ lineHeight: `${lineHeight}px` }}
                >
                  {yourScoreRef.current}
                </i>
                You
              </button>

              <button
                ref={buttonO}
                type="button"
                className="ui icon left labeled orange button button-o button-yo"
              >
                <i
                  aria-hidden="true"
                  className="icon"
                  style={{ lineHeight: `${lineHeight}px` }}
                >
                  {opponentScoreRef.current}
                </i>
                Opponent
              </button>
            </div>
          </div>

          {/* heading */}
          <Row>
            <Col />
            <Col
              lg={12}
              md={12}
              sm={12}
              xl={12}
              xs={12}
            >
              <h5 style={{ textAlign: 'center' }}>Choose Your Weapon Of Destruction.</h5>
            </Col>
            <Col />
          </Row>

          {/* rock paper scissors */}
          <Row className="rps-container" style={{ maxWidth: '550px', margin: '0 auto' }}>
            <Col
              lg={4}
              md={4}
              sm={4}
              xl={4}
              xs={4}
              className="rps"
            >
              <img
                ref={(element: HTMLImageElement) => { images.current[0] = element; }}
                src={rock}
                alt="rock"
                data-choice={choices.rock}
              />
              <p>Rock</p>
            </Col>

            <Col
              lg={4}
              md={4}
              sm={4}
              xl={4}
              xs={4}
              className="rps"
            >
              <img
                ref={(element: HTMLImageElement) => { images.current[1] = element; }}
                src={paper}
                alt="paper"
                data-choice={choices.paper}
              />
              <p>Paper</p>
            </Col>

            <Col
              lg={4}
              md={4}
              sm={4}
              xl={4}
              xs={4}
              className="rps"
            >
              <img
                ref={(element: HTMLImageElement) => { images.current[2] = element; }}
                src={scissors}
                alt="scissors"
                data-choice={choices.scissors}
              />
              <p>Scissors</p>
            </Col>
          </Row>

          {/* message */}
          <div ref={messageInfo} className="ui icon large message message-info">
            <i aria-hidden="true" className="circle notched loading icon" />
            <div className="content">
              <div className="header">Rock Paper Scissors</div>
              <p style={{ color: '#000', fontWeight: 'bold' }}>
                {isAI() ? 'Waiting for you .....' : 'Waiting for opponent .....'}
              </p>
            </div>
          </div>

          {/* new game btn */}
          <div className="new-game ">
            <button
              ref={newGameBtn}
              onClick={() => { newGame(true); }}
              className="ui button orange"
              type="button"
            >
              New Game
            </button>
          </div>

          {/* playing-info */}
          <Message size="large" className="playing-info">
            You are playing with
            {` ${playingInfo.info}`}
          </Message>

        </Col>
        <Col />
      </Row>

      {/* modal for request */}
      <Modal
        show={showRequestMessage}
        animation={false}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>R.P.S</Modal.Title>
        </Modal.Header>
        <Modal.Body>{requestMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRejectRequest}>
            Reject
          </Button>
          <Button variant="primary" onClick={handleAcceptRequest}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAnswerMessage}
        animation={false}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>R.P.S</Modal.Title>
        </Modal.Header>
        <Modal.Body>{answerMessage}</Modal.Body>
      </Modal>
    </Container>
  );
}

export default Game;
