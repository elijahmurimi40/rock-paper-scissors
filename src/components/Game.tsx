import { useRef, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Message, Icon } from 'semantic-ui-react';
import { ContainerProps } from '../helperFunctions/Props';
import './Game.css';
import rock from './rock.svg';
import paper from './paper.svg';
import scissors from './scissors.svg';

/**
 * Y -> your score
 * O -> opponent score
 *
 */

function Game(props: ContainerProps) {
  const buttonY = useRef<HTMLButtonElement>(null);
  const buttonO = useRef<HTMLButtonElement>(null);

  const [lineHeight, setLineHeight] = useState(0);
  const [yourScore, setYourScore] = useState('0');
  const [opponentScore, setOpponentScore] = useState('0');

  const { children } = props;
  const { container, margin, playingInfo } = children;

  useEffect(() => {
    // effect
    const buttonYHeight = buttonY.current!!.clientHeight;
    setLineHeight(buttonYHeight);
    setYourScore('0');
    setOpponentScore('0');
    return () => {
      // cleanup
    };
  }, []);

  return (
    <Container
      style={{
        border: '1px solid green',
        marginTop: `${margin + 10}px`,
        marginBottom: `${margin + 10}px`,
      }}
      ref={container}
    >
      <Row>
        <Col />
        <Col
          style={{ border: '1px solid black' }}
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
              <img src={rock} alt="rock" />
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
              <img src={paper} alt="paper" />
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
              <img src={scissors} alt="scissors" />
              <p>Scissors</p>
            </Col>
          </Row>

          {/* message */}
          <Message icon size="large" className="message-info">
            <Icon name="circle notched" loading />
            <Message.Content>
              <Message.Header>Rock Paper Scissors</Message.Header>
              Waiting for you .....
            </Message.Content>
          </Message>

          {/* new game btn */}
          <div className="new-game ">
            <button className="ui button orange" type="button">New Game</button>
          </div>

          {/* playing-info */}
          <Message size="large" className="playing-info">
            You are playing with
            {` ${playingInfo}`}
          </Message>

        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default Game;
