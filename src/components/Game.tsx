import { Container, Row, Col } from 'react-bootstrap';
import { ContainerProps } from '../helperFunctions/Props';

function Game(props: ContainerProps) {
  const { children } = props;
  const { container, cHeight } = children;

  return (
    <Container
      style={{ border: '1px solid red', height: cHeight }}
      ref={container}
    >
      <Row style={{ border: '1px solid green' }}>
        <Col />
        <Col
          style={{ border: '1px solid black' }}
          lg={12}
          md={12}
          sm={12}
          xl={12}
          xs={12}
        >
          World
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default Game;
