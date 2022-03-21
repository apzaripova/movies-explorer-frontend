import './ModalWindow.css';
import React, { useEffect, useRef } from 'react';

function ModalWindow({ onOpen, onClose }) {
  const overlayRef = useRef();

  const renderNotification = () => (
    <>
      <div
        className={`modal__icon ${onOpen.type === 'success' ? 'modal__icon_success' : 'modal__icon_denied'}`}
        role="img"
      />
      <h2 className="modal__title">{onOpen.title}</h2>
    </>
  );

  useEffect(() => {
    if (onOpen.visible) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  });

  useEffect(() => {
    const clickHandler = () => onClose();
    overlayRef.current.addEventListener('click', clickHandler);

    return () => overlayRef.current.removeEventListener('click', clickHandler);
  }, []);

  return (
    <section ref={overlayRef} className={`modal ${onOpen.visible ? 'modal__visible' : ''}`}>
      <div className={`modal__container ${onOpen.type === 'success' ? 'modal__success' : 'modal__denied'}`}>
        {renderNotification()}
        <button type="button" className="modal__button" onClick={onClose} />
      </div>
    </section>
  );
}

export default ModalWindow;