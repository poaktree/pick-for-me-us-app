// Main imports
import React from 'react';

const PickForMeUsAddOrMakeChoiceButton = (props) => {
  return <button className={'app-add-or-make-choice-buttons'} onClick={props.onClick}>{props.buttonText}</button>
};

export default PickForMeUsAddOrMakeChoiceButton;
