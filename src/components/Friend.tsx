import { Container, Row, Col } from 'react-bootstrap';
import { ContainerProps } from '../helperFunctions/Props';
import CreateOrJoinGame from './CreateOrJoinGame';
import { friendInfo } from '../helperFunctions/GameInfo';

function Friend(props: ContainerProps) {
  const { children } = props;
  const { margin, selectDiv } = children;

  return (
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
          <CreateOrJoinGame>{{ playingInfo: friendInfo, selectDiv }}</CreateOrJoinGame>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default Friend;
