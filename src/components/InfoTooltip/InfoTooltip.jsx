import React from 'react';
import successLogo from '../../images/svg/image-popup-ok.svg';
import errorLogo from '../../images/svg/image-popup-error.svg';
import {SUCCESS_MESSAGE, FAILED_MESSAGE} from '../../utils/constants';
import './InfoTooltip.css';

function InfoTooltip(props) {

  function handleOverlayClose(evt) {
    if (evt.target.classList.contains('infotooltip')) {
      props.onClose()
    }
  }

    return (
      <div className={`infotooltip ${props.isOpen ? "infotooltip_opened" : ""}`} onMouseDown={handleOverlayClose}>
      <div className="infotooltip__container">
          <button type="button" className="button button_type_close-popup" onClick={props.onClose} aria-label="close"> 
          </button>
          <div className="infotooltip__info">
            <img className="infotooltip__info-status" src={props.isSuccess ? successLogo : errorLogo} alt="Статус события" />
            <h2 className="infotooltip__title">{props.isSuccess ? SUCCESS_MESSAGE : FAILED_MESSAGE}</h2>
          </div>
      </div>
  </div> 
    )
};

export default InfoTooltip;