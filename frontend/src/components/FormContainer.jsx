import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({children, isShippingPage}) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={isShippingPage ? 12 : 6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
