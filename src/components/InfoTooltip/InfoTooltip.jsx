import React from 'react';
import successLogo from '../../images/svg/image-popup-ok.svg';
import errorLogo from '../../images/svg/image-popup-error.svg';
import {SUCCESS_MESSAGE, FAILED_MESSAGE} from '../../utils/constants';

function InfoTooltip(props) {

  function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      props.onClose()
    }
  }

    return (
      <div className={`popup ${props.isOpen ? "popup_opened" : ""}`} onMouseDown={handleOverlayClose}>
      <div className="popup__container">
          <button type="button" className="button button_type_close-popup" onClick={props.onClose} aria-label="close"> 
          </button>
          <div className="popup__info">
            <img className="popup__info-status" src={props.isSuccess ? successLogo : errorLogo} alt="Статус события" />
            <h2 className="popup__title">{props.isSuccess ? SUCCESS_MESSAGE : FAILED_MESSAGE}</h2>
          </div>
      </div>
  </div> 
    )
};

export default InfoTooltip;