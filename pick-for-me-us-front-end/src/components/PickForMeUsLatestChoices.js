// Main imports
import React from 'react';

// Other imports
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const PickForMeUsLatestChoices = (props) => {
  const arrayOfCardElements = props.fiveLatestChoicesMade.map((choiceObject, index) => {
    const pickedChoiceString = choiceObject.pickedChoice;
    const allChoicesString = choiceObject.allChoices.join(', ');

    return (
      <Row className={'app-latest-choice-row'} key={index}>
        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <Card className={'app-latest-choice-card'}>
            <Card.Body>
              <Container>
                <Row>
                  <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                    <p className={'app-latest-choice-card-body-paragraph'}>
                      <span className={'app-latest-choice-card-body-paragraph-main'}>{pickedChoiceString} </span>
                      <small className={'app-latest-choice-card-body-paragraph-other'}>(out of {allChoicesString})</small>
                    </p>
                  </Col>

                  <Col xs={2} sm={2} md={2} lg={2} xl={2} className={'app-latest-choice-card-body-show-more'} onClick={(event) => props.handleShowMoreAboutLatestChoice(event)}>
                    <FontAwesomeIcon id={index} icon={faPlus} />
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  });

  return arrayOfCardElements;
};

export default PickForMeUsLatestChoices;