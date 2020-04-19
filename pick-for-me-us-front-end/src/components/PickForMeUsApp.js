// Main imports
import React, { useState, useEffect } from 'react';

// Component imports
import PickForMeUsChoicePickedModal from './PickForMeUsChoicePickedModal.js';
import PickForMeUsLatestChoicesModal from './PickForMeUsLatestChoicesModal.js';

import PickForMeUsHeadings from './PickForMeUsHeadings.js';
import PickForMeUsChoiceFields from './PickForMeUsChoiceFields.js';
import PickForMeUsAddOrMakeChoiceButton from './PickForMeUsAddOrMakeChoiceButton.js';
import PickForMeUsLatestChoices from './PickForMeUsLatestChoices.js';
import PickForMeUsFooter from './PickForMeUsFooter.js';

// Other imports

// Our own images
import thinking from '../assets/images/thinking.png';
import smiling from '../assets/images/smiling.png';
import choosing from '../assets/images/choosing.png';
import calling from '../assets/images/calling.png';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// 'GET' and 'POST' request methods
import allRequests from '../requests/requests.js';

// Our app's main component
const PickForMeUsApp = () => {
  // Our app's overall state, which is going to be passed down to - and manipulated by - other components

  // Our app's state for its 'main' view
  const [currentAmountOfChoiceFields, setCurrentAmountOfChoiceFields] = useState(5);
  const [currentContentOfChoiceFields, setCurrentContentOfChoiceFields] = useState(["", "", "", "", ""]);

  // Our app's state for its 'Picked choice' view
  const [choicePicked, setChoicePicked] = useState("");

  // Our app's state for its 'Latest choices' section
  const [fiveLatestChoicesMade, setFiveLatestChoicesMade] = useState([]);
  const [showMoreAboutLatestChoice, setShowMoreAboutLatestChoice] = useState(false);
  const [latestChoiceToShowMoreAbout, setLatestChoiceToShowMoreAbout] = useState({});

  /* After the 'PickForMeUsApp' component is rendered, the 'useEffect' function executes
  the 'getFiveLatestChoicesMade' function to retrieve the five latest choices that have been made */
  useEffect(() => {
    allRequests.getFiveLatestChoicesMade().then((retrievedData) => {
      console.log("'PickForMeUsApp': This is what the 'getFiveLatestChoicesMade' method returned (i.e., the five latest choices made)", retrievedData);

      setFiveLatestChoicesMade(retrievedData);
    });
  }, []);

  /**
  * Handles a 'choice' change by updating the app's state.
  * @param {object} changeEvent - an 'Event' object through which we can determine what 'choice' field has been changed.
  */
  const handleChoiceChange = (changeEvent) => {
    const idOfChoiceChanged = changeEvent.target.id;
    const contentOfChoiceChanged = changeEvent.target.value;

    const newCurrentContentOfChoiceFields = [...currentContentOfChoiceFields];
    newCurrentContentOfChoiceFields[idOfChoiceChanged] = contentOfChoiceChanged;

    setCurrentContentOfChoiceFields(newCurrentContentOfChoiceFields);
  };

  /**
  * Handles a 'choice' reset by updating the app's state.
  * @param {object} changeEvent - an 'Event' object through which we can determine what 'choice' field has been reset.
  */
  const handleChoiceReset = (clickEvent) => {
    const choiceFieldToBeReset = clickEvent.currentTarget.previousElementSibling;
    const idOfChoiceFieldToBeReset = choiceFieldToBeReset.id;

    choiceFieldToBeReset.value = "";

    const newCurrentContentOfChoiceFields = [...currentContentOfChoiceFields];
    newCurrentContentOfChoiceFields[idOfChoiceFieldToBeReset] = "";

    setCurrentContentOfChoiceFields(newCurrentContentOfChoiceFields);
  };

  /**
  * Handles a 'choice' deletion by updating the app's state.
  * @param {object} changeEvent - an 'Event' object through which we can determine what 'choice' field is to be deleted.
  */
  const handleChoiceDeletion = (clickEvent) => {
    if (currentAmountOfChoiceFields === 2) {
      return;
    }

    const choiceFieldToBeDeleted = clickEvent.currentTarget.previousElementSibling.previousElementSibling;
    const idOfChoiceFieldToBeDeleted = choiceFieldToBeDeleted.id;

    const newCurrentAmountOfChoiceFields = currentAmountOfChoiceFields - 1;

    const newCurrentContentOfChoiceFields = [...currentContentOfChoiceFields];
    newCurrentContentOfChoiceFields.splice(idOfChoiceFieldToBeDeleted, 1);

    setCurrentAmountOfChoiceFields(newCurrentAmountOfChoiceFields);
    setCurrentContentOfChoiceFields(newCurrentContentOfChoiceFields);
  };

  /**
  * Handles a 'choice' addition by updating the app's state.
  */
  const handleChoiceAddition = () => {
    const newCurrentAmountOfChoiceFields = currentAmountOfChoiceFields + 1;
    const newCurrentContentOfChoiceFields = currentContentOfChoiceFields.concat("");

    setCurrentAmountOfChoiceFields(newCurrentAmountOfChoiceFields);
    setCurrentContentOfChoiceFields(newCurrentContentOfChoiceFields);
  };

  /**
  * Randomly picks a 'choice', and updates the app's state.
  */
  const handleChoiceSelection = () => {
    const filteredCurrentContentOfChoiceFields = currentContentOfChoiceFields.filter((choice) => {
      return choice !== "" ? true : false;
    });

    if (filteredCurrentContentOfChoiceFields.length < 2) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * filteredCurrentContentOfChoiceFields.length);
    const randomChoice = filteredCurrentContentOfChoiceFields[randomIndex];

    const latestChoicePicked = {
      allChoices: filteredCurrentContentOfChoiceFields,
      pickedChoice: randomChoice
    };

    allRequests.addChoicePicked(latestChoicePicked).then((responseData) => {
      console.log("'PickForMeUsApp': This is what the 'addChoicePicked' method returned", responseData);

      const newfiveLatestChoicesMade = [latestChoicePicked, ...fiveLatestChoicesMade];
      newfiveLatestChoicesMade.pop();

      console.log("'PickForMeUsApp': These are the five latest choices made", newfiveLatestChoicesMade);

      setCurrentContentOfChoiceFields(filteredCurrentContentOfChoiceFields);
      setChoicePicked(randomChoice);
      setFiveLatestChoicesMade(newfiveLatestChoicesMade);
    });
  };

  /**
  * Resets our app's state, and with it, our app.
  */
  const handleGoAgain = () => {
    setCurrentAmountOfChoiceFields(5);
    setCurrentContentOfChoiceFields(["", "", "", "", ""]);
    setChoicePicked("");
  };

  /**
  * Gathers the necessary information to display in the modal of a 'latest choice'.
  * @param {object} clickEvent - an 'Event' object through which we can determine what 'latest choice' the user wants more details of.
  */
  const handleShowMoreAboutLatestChoice = (clickEvent) => {
    const newValueOfShowMoreAboutLatestChoice = true;

    const indexOfLatestChoiceToShowMoreAbout = parseInt(clickEvent.currentTarget.firstElementChild.id);

    const newValueOfLatestChoiceToShowMoreAbout = fiveLatestChoicesMade[indexOfLatestChoiceToShowMoreAbout];

    setShowMoreAboutLatestChoice(newValueOfShowMoreAboutLatestChoice);
    setLatestChoiceToShowMoreAbout(newValueOfLatestChoiceToShowMoreAbout);
  };

  /**
  * Resets parts of our app's state once the modal of a 'latest choice' is closed.
  */
  const handleDoNotShowMoreAboutLatestChoice = () => {
    const newValueOfShowMoreAboutLatestChoice = false;

    setShowMoreAboutLatestChoice(newValueOfShowMoreAboutLatestChoice);
    setLatestChoiceToShowMoreAbout([]);
  };

  return (
    <>
      <PickForMeUsChoicePickedModal
        currentContentOfChoiceFields={currentContentOfChoiceFields}
        choicePicked={choicePicked}
        handleGoAgain={handleGoAgain}
      />

      <PickForMeUsLatestChoicesModal
        showMoreAboutLatestChoice={showMoreAboutLatestChoice}
        latestChoiceToShowMoreAbout={latestChoiceToShowMoreAbout}
        handleDoNotShowMoreAboutLatestChoice={handleDoNotShowMoreAboutLatestChoice}
      />

      <Container id={'app-container'} className={'slide-in-fwd-center'}>
        <Row>
          {/* 1 - Section for headings, 'choice' fields, and buttons */}
          <Col id={'app-section-one'} xs={12} sm={12} md={12} lg={6} xl={7} className={'col-xxl-7 col-xxxl-7 col-xxxxl-7 col-xxxxxl-7'}>
            {/* 1.1 - Headings */}
            <Row className={'app-headings'}>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} className={'col-xxl-12 col-xxxl-12 col-xxxxl-12 col-xxxxxl-12'}>
                <PickForMeUsHeadings
                  mainHeading={'Pick For Me/Us'}
                  secondaryHeading={'Decisions, decisions - why must choosing be so hard?'}
                />

                <img src={thinking} alt='Dude thinking' id={'app-headings-image'} />
              </Col>
            </Row>

            {/* 1.2 - 'Choice' fields, and buttons */}
            <Row id={'app-choice-fields-and-add-or-make-choice-buttons-row'}>
              {/* 1.2.1 - 'Choice' fields */}
              <Col id={'app-choice-fields-column'} xs={12} sm={7} md={6} lg={12} xl={7} className={'col-xxl-7 col-xxxl-7 col-xxxxl-7 col-xxxxxl-7'}>
                <PickForMeUsChoiceFields
                  currentAmountOfChoiceFields={currentAmountOfChoiceFields}
                  currentContentOfChoiceFields={currentContentOfChoiceFields}
                  handleChoiceChange={handleChoiceChange}
                  handleChoiceReset={handleChoiceReset}
                  handleChoiceDeletion={handleChoiceDeletion}
                />
              </Col>

              {/* 1.2.2 - Buttons */}
              <Col id={'app-add-or-make-choice-buttons-column'} xs={12} sm={5} md={6} lg={12} xl={5} className={'col-xxl-5 col-xxxl-5 col-xxxxl-5 col-xxxxxl-5'}>
                <Row>
                  <Col xs={6} sm={12} md={12} lg={12} xl={12} className={'col-xxl-12 col-xxxl-12 col-xxxxl-12 col-xxxxxl-12'}>
                    <PickForMeUsAddOrMakeChoiceButton
                      buttonText='Add choice'
                      onClick={handleChoiceAddition}
                    />
                  </Col>

                  <Col xs={6} sm={12} md={12} lg={12} xl={12} className={'col-xxl-12 col-xxxl-12 col-xxxxl-12 col-xxxxxl-12'}>
                    <PickForMeUsAddOrMakeChoiceButton
                      buttonText='Pick For Me/Us!'
                      onClick={handleChoiceSelection}
                    />
                  </Col>

                  <img src={smiling} alt='Girl smiling' id={'app-add-or-make-choice-buttons-image'} />
                </Row>
              </Col>
            </Row>
          </Col>

          {/* 2 - Section for 'Latest choices' */}
          <Col id={'app-section-two'} xs={12} sm={12} md={12} lg={6} xl={5} className={'col-xxl-5 col-xxxl-5 col-xxxxl-5 col-xxxxxl-5'}>
            <Row className={'app-headings'}>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} className={'col-xxl-12 col-xxxl-12 col-xxxxl-12 col-xxxxxl-12'}>
                <PickForMeUsHeadings
                  mainHeading={'Latest choices'}
                  secondaryHeading={"The last 5 choices we made on other people's behalf!"}
                />
              </Col>
            </Row>

            {/* 2.1 - Rows for each latest choice */}
            <PickForMeUsLatestChoices
              fiveLatestChoicesMade={fiveLatestChoicesMade}
              handleShowMoreAboutLatestChoice={handleShowMoreAboutLatestChoice}
            />

            <img src={choosing} alt='Girl choosing' id={'app-hidden-image-until-huge-viewports-left'} />
            <img src={calling} alt='Boy calling' id={'app-hidden-image-until-huge-viewports-right'} />
          </Col>
        </Row>

        {/* 3 - Section for our app's bottom image, and footer */}
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} className={'col-xxl-12 col-xxxl-12 col-xxxxl-12 col-xxxxxl-12'}>
            <img src={choosing} alt='Girl choosing' id={'app-bottom-image'} />

            <PickForMeUsFooter />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PickForMeUsApp;
