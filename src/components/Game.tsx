import { useRef, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Message } from 'semantic-ui-react';
import { ContainerProps } from '../helperFunctions/Props';
import choices, { order, readable } from '../helperFunctions/Choices';
import { AIinfo } from '../helperFunctions/GameInfo';
import './Game.css';
import rock from './rock.svg';
import paper from './paper.svg';
import scissors from './scissors.svg';

/**
 * Y -> your score
 * O -> opponent score
 *
 */

let isMessageShown = false;

function Game(props: ContainerProps) {
  const buttonY = useRef<HTMLButtonElement>(null);
  const buttonO = useRef<HTMLButtonElement>(null);
  const images = useRef<Array<HTMLImageElement>>([]);
  const messageInfo = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line no-unused-vars
  const checkPlayingInfo = useRef((choice: string) => { });

  const [lineHeight, setLineHeight] = useState(0);
  const [yourScore, setYourScore] = useState('0');
  const [opponentScore, setOpponentScore] = useState('0');

  const { children } = props;
  const { container, margin, playingInfo } = children;

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

  const initMessageParams = () => {
    messageInfoChildNodes = messageInfo.current!!.childNodes;
    contentChildNodes = messageInfoChildNodes[1].childNodes;
    // eslint-disable-next-line prefer-destructuring
    header = contentChildNodes[0];
    // eslint-disable-next-line prefer-destructuring
    p = contentChildNodes[1];
  };

  const restoreShowMessage = () => {
    if (!isMessageShown) initMessageParams();
    isMessageShown = false;
    header.textContent = 'Rock Paper Scissors';
    p.textContent = 'Waiting for you .....';

    const i = document.createElement('i');
    i.className = 'circle notched loading icon';
    i.setAttribute('aria-hidden', 'true');
    messageInfoChildNodes[0].replaceWith(i);

    images.current.map((image: HTMLImageElement) => {
      image.classList.remove('tranform-img');
      return image;
    });
  };

  const newGame = () => {
    initMessageParams();
    restoreShowMessage();
    if (isAI()) {
      setYourScore('0');
      setOpponentScore('0');
    }
  };

  const showMessage = (
    playerChoice: string,
    headerMessage: string,
    pMessage: string,
  ) => {
    initMessageParams();
    isMessageShown = true;
    header.textContent = headerMessage;
    p.textContent = pMessage;

    const i = document.createElement('i');
    i.className = `icon hand ${playerChoice.toLocaleLowerCase()} outline`;
    i.setAttribute('aria-hidden', 'true');
    messageInfoChildNodes[0].replaceWith(i);

    let messageTimer = 0;
    if (messageTimer) clearTimeout(messageTimer);
    messageTimer = window.setTimeout(() => {
      restoreShowMessage();
      clearTimeout(messageTimer);
    }, 2500);
  };

  const chooseWinner = (playerOneChoice: number, playerTwoChoice: number) => {
    const headerMessage = `Your opponent chose: ${readable[playerTwoChoice]}`;
    let pMessage = '';

    if (order[playerOneChoice] === order[playerTwoChoice]) {
      pMessage = 'The game is tied';
      showMessage(readable[playerTwoChoice], headerMessage, pMessage);
    } else if (order[playerOneChoice] === order[playerTwoChoice + 1]) {
      pMessage = 'You won!';
      showMessage(readable[playerTwoChoice], headerMessage, pMessage);
      const newScore = parseInt(yourScore, 10) + 1;
      setYourScore(newScore.toString());
    } else {
      pMessage = 'You lost :(';
      showMessage(readable[playerTwoChoice], headerMessage, pMessage);
      const newScore = parseInt(opponentScore, 10) + 1;
      setOpponentScore(newScore.toString());
    }
  };

  checkPlayingInfo.current = (choice: string) => {
    const choiceNo = choice as unknown as number;
    images.current[choiceNo].classList.add('tranform-img');
    if (isAI() && !isMessageShown) {
      const CPUChoice = Math.floor(Math.random() * 3);
      chooseWinner(choiceNo, CPUChoice);
    }
  };

  useEffect(() => {
    // effect
    const buttonYHeight = buttonY.current!!.clientHeight;
    setLineHeight(buttonYHeight);
    setYourScore('0');
    setOpponentScore('0');

    // copy images.current for "react-hooks/exhaustive-deps": "warn", rule
    const imagesC = images.current;

    imagesC.map((image: HTMLImageElement) => {
      const choice = image.getAttribute('data-choice');
      image.addEventListener('click', () => { checkPlayingInfo.current(choice!!); });
      return image;
    });

    return () => {
      // cleanup
      imagesC.map((image: HTMLImageElement) => {
        const choice = image.getAttribute('data-choice');
        image.removeEventListener('click', () => { checkPlayingInfo.current(choice!!); });
        return image;
      });
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
                  {yourScore}
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
                  {opponentScore}
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
              <p>Waiting for you .....</p>
            </div>
          </div>

          {/* new game btn */}
          <div className="new-game ">
            <button
              onClick={newGame}
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
    </Container>
  );
}

export default Game;
