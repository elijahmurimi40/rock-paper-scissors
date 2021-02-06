import { Container, Row, Col } from 'react-bootstrap';
import { ContainerProps } from '../helperFunctions/Props';
import CreateOrJoinGame from './CreateOrJoinGame';
import { strangerInfo } from '../helperFunctions/GameInfo';

function Stranger(props: ContainerProps) {
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
          <CreateOrJoinGame>{{ playingInfo: strangerInfo, selectDiv }}</CreateOrJoinGame>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default Stranger;
