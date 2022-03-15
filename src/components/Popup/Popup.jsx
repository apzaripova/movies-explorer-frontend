import Animations from './Animation';
import * as CONSTANTS from '../../utils/constants';

function Popup(props) {

    return (
        <div className={`popup ${props.isOpen ? 'popup_opened ' : ' '}`} >
          <div className="popup__tooltip">
            <Animations
              success={props.isActionSuccessful}
            />
            <button className="popup__close" type="button" onClick={props.onClose}></button>
            <h3 className="popup__tooltip-heading">{!props.isActionSuccessful ? CONSTANTS.DEFAULT_MESSAGE.TOOLTIP.FAIL : CONSTANTS.DEFAULT_MESSAGE.TOOLTIP.SUCCESS}</h3>
          </div>
        </div>
    );
}

export default Popup;