import React, { useEffect } from 'react';
//* Icons
import { AiOutlineClose } from 'react-icons/ai';
//* React redux
import { useDispatch, useSelector } from 'react-redux';
//* Redux slices
import { removeError } from '../features/error/errorSlice';
import {
  modifyModalInfo,
  returnToInicialValuesModalInfo,
  selectModalMessage,
  selectModalStatus,
  selectModalType,
} from '../features/modal/modalSlice';

export default function Modal({ type, message }) {
  //* Use dispatch
  const dispatch = useDispatch();

  //* Selectors
  const modalType = useSelector(selectModalType);
  const modalMessage = useSelector(selectModalMessage);
  const modalStatus = useSelector(selectModalStatus);

  let classNameOfType;

  if (modalType === 'success') classNameOfType = 'background-success';
  else if (modalType === 'error') classNameOfType = 'background-error';
  else if (modalType === 'warning') classNameOfType = 'background-warning';

  //* Handle close modal
  const closeModal = () => {
    dispatch(returnToInicialValuesModalInfo());
    dispatch(removeError());
  };

  //* Use effect
  useEffect(() => {
    if (type && message) {
      dispatch(
        modifyModalInfo({
          modalActive: true,
          modalMessage: message,
          modalType: type,
        })
      );
    }
  }, [type, message]);

  return (
    <div
      className={`modal-container ${
        modalStatus ? 'modal-active' : 'modal-inactive'
      }`}
    >
      <div className={`${classNameOfType} modal`}>
        <p className='modal-message'>{modalMessage}</p>
        <AiOutlineClose onClick={closeModal} className='modal-icon' />
      </div>
    </div>
  );
}
