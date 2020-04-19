// Main imports
import React from 'react';

// Other imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import nice from '../assets/images/nice.png';

const PickForMeUsChoicePickedModal = (props) => {
  const allProvidedChoicesString = props.currentContentOfChoiceFields.join(', ');
  const pickedChoiceString = props.choicePicked;

  return (
    <Modal show={props.choicePicked !== ''} onHide={props.handleGoAgain}>
      <Modal.Header id={'app-modals-header'} closeButton>
        <Modal.Title id={'app-modals-header-title'}>Choice details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} className={'app-modals-body-section'}>
              <h5 className={'app-modals-body-section-title'}>Choices provided</h5>
              <p id={'app-modals-body-section-all-choices'}>{allProvidedChoicesString}</p>
            </Col>

            <Col xs={12} sm={12} md={12} lg={12} xl={12} className={'app-modals-body-section'}>
              <h5 className={'app-modals-body-section-title'}>Choice made by us</h5>
              <p id={'app-modals-body-section-picked-choice'}>{pickedChoiceString}</p>
            </Col>

            <img id={'app-modals-body-image'} src={nice} alt="Girl doing a 'thumbs-up' gesture" />
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default PickForMeUsChoicePickedModal;