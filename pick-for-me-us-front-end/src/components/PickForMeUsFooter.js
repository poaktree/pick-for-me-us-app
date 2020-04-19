// Main imports
import React from 'react';

// Other imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

// Our app's main component
const PickForMeUsFooter = () => {
  return (
    <footer id={'app-footer'}>
      <h6 id={'app-footer-author-info'}>
        <span id={'app-footer-author-name'}>Pedro Carvalho, 2020</span>

        <span className={'app-footer-author-links'}>
          <a id={'app-footer-author-link-one'} href={'https://www.linkedin.com/in/poaktree/'} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </span>

        <span className={'app-footer-author-links'}>
          <a id={'app-footer-author-link-two'} href={'https://github.com/poaktree'} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </span>
      </h6>
    </footer>
  );
}

export default PickForMeUsFooter;
