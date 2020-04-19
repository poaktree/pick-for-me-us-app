// Main imports
import React from 'react';

// Other imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const PickForMeUsChoiceFields = (props) => {
  const amountOfChoiceFieldsToShow = props.currentAmountOfChoiceFields;
  const choiceFieldsArray = [];

  for (let amountOfChoiceFieldsBeingShown = 0; amountOfChoiceFieldsBeingShown < amountOfChoiceFieldsToShow; amountOfChoiceFieldsBeingShown++) {
    choiceFieldsArray.push(
      <div className={'app-choice-fields-input-container'} key={amountOfChoiceFieldsBeingShown}>
        <input className={'app-choice-fields-input'} id={amountOfChoiceFieldsBeingShown} type='text' autoComplete='off' placeholder={'Choice ' + (amountOfChoiceFieldsBeingShown + 1)} value={props.currentContentOfChoiceFields[amountOfChoiceFieldsBeingShown] || ""} onChange={(event) => props.handleChoiceChange(event)} />
        <FontAwesomeIcon className={'app-choice-fields-icons'} icon={faEraser} onClick={(event) => props.handleChoiceReset(event)} />
        <FontAwesomeIcon className={'app-choice-fields-icons'} icon={faTrash} onClick={(event) => props.handleChoiceDeletion(event)} />
      </div>
    );
  }

  return choiceFieldsArray;
};

export default PickForMeUsChoiceFields;
