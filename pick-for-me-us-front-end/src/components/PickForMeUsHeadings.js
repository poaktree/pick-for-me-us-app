// Main imports
import React from 'react';

const PickForMeUsHeadings = (props) => {
  return (
    <div>
      <h1 className={'app-headings-main-heading'}>{props.mainHeading}</h1>
      <h6 className={'app-headings-secondary-heading'}>{props.secondaryHeading}</h6>
    </div>
  );
};

export default PickForMeUsHeadings;
