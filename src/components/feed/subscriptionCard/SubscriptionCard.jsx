import React, { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';
//* Icons
import { AiFillDelete } from 'react-icons/ai';
import { MdPaid, MdOutlineMoneyOffCsred } from 'react-icons/md';
//* Redux
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//* Selectors
import { selectPriceFilterInfo } from '../../../features/filters/filtersSlice';
import { modifyModalInfo } from '../../../features/modal/modalSlice';
import { updateSubscription } from '../../../features/subscriptions/subscriptionsSlice';
import { selectUserData } from '../../../features/user/userSlice';
//* Custom function
import getContrast from '../../../utils/getContrastBetweenTwoColors';
//* Components
import DeleteSubscriptionModal from './DeleteSubscriptionModal';

export default function SubscriptionCard({ subscription }) {
  const { name, price, color, isPaid } = subscription.data;

  //* States
  const [deleteSubModal, setDeleteSubModal] = useState(false);
  const [priceController, setPriceController] = useState(price);
  const [textColor, setTextColor] = useState('#000000');
  const [draggingMode, setDraggingMode] = useState('');
  const [cardDistanceDragged, setCardDistanceDragged] = useState(0);

  //* Refs
  const subscriptionCardRef = useRef(null);
  const subscriptionCardContainerRef = useRef(null);

  //* Dispatch
  const dispatch = useDispatch();

  //* Navigate
  const navigate = useNavigate();

  //* Selectors
  const filterInfo = useSelector(selectPriceFilterInfo);
  const userData = useSelector(selectUserData);

  //* Handle dragged card
  const handleDraggedCard = () => {
    let subInfoUpdated = {
      id: subscription.id,
      data: {
        ...subscription.data,
      },
    };

    const dispatchInfo = (isPaidStatus) => {
      subInfoUpdated.data.isPaid = isPaidStatus;
      dispatch(
        updateSubscription({
          uid: userData.uid,
          subscriptionData: subInfoUpdated,
        })
      );
      dispatch(
        modifyModalInfo({
          modalActive: true,
          modalMessage: `${name} marcada como ${
            isPaidStatus ? 'pagada' : 'no pagada'
          } exitosamente.`,
          modalType: 'success',
        })
      );
    };

    if (cardDistanceDragged > 140 && !isPaid) dispatchInfo(true);
    else if (cardDistanceDragged > 140 && isPaid) dispatchInfo(false);
    else if (cardDistanceDragged < -140) setDeleteSubModal(true);
  };

  //* Handle card background
  const handleCardBackground = (e, data) => {
    setCardDistanceDragged(data.x);

    if (cardDistanceDragged > 0 && !isPaid)
      setDraggingMode('editing-subscription');
    else if (cardDistanceDragged > 0 && isPaid)
      setDraggingMode('not-paid-subscription');
    else setDraggingMode('deleting-subscription');
  };

  //* Handle card action
  const handleCardAction = () => {
    if (cardDistanceDragged > 140 || cardDistanceDragged < -140)
      handleDraggedCard();
    else if (cardDistanceDragged < 10 && cardDistanceDragged > -10)
      navigate(`/modify-subscription/${subscription.id}`);

    setCardDistanceDragged(0);
  };

  //* Use effect
  useEffect(() => {
    if (filterInfo.filterType === 'Semanal') setPriceController(price / 4);
    else if (filterInfo.filterType === 'Mensual') setPriceController(price);
    else if (filterInfo.filterType === 'Anual') setPriceController(price * 12);

    if (getContrast(color) > 10) setTextColor('#000000');
    else setTextColor('#ffffff');
  }, [filterInfo.filterType, subscription]);

  return (
    <>
      <div
        ref={subscriptionCardContainerRef}
        className={`subscription-card-container ${draggingMode}`}
      >
        {draggingMode === 'editing-subscription' && !isPaid ? (
          <div className='sub-bg-icon-container'>
            <MdPaid className='sub-bg-icon' />
            <p className='sub-icon-text'>Pagada</p>
          </div>
        ) : draggingMode === 'not-paid-subscription' && isPaid ? (
          <div className='sub-bg-icon-container'>
            <MdOutlineMoneyOffCsred className='sub-bg-icon' />
            <p className='sub-icon-text'>No pagada</p>
          </div>
        ) : (
          <div className='sub-bg-icon-container'>
            <AiFillDelete className='sub-bg-icon' />
            <p className='sub-icon-text'>Eliminar</p>
          </div>
        )}
        <Draggable
          position={{ x: 0, y: 0 }}
          nodeRef={subscriptionCardRef}
          axis='x'
          onStop={handleDraggedCard}
          onDrag={handleCardBackground}
        >
          <div
            style={{ backgroundColor: color }}
            className='subscription-card'
            ref={subscriptionCardRef}
            onTouchEndCapture={handleCardAction}
          >
            <h3 style={{ color: textColor }}>{name}</h3>
            <h2 style={{ color: textColor }}>
              ${priceController.toLocaleString()}
            </h2>
          </div>
        </Draggable>
      </div>
      {deleteSubModal && (
        <DeleteSubscriptionModal
          subscription={subscription}
          modalOpen={setDeleteSubModal}
        />
      )}
    </>
  );
}
