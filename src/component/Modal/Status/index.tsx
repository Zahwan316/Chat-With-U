import { memo, MouseEvent, useEffect, useState } from 'react';
import statusDummyData from '../../data/status';
import InputComponent from '../../../section/main/middle-side/Input';
import useComponentStore from '../../../state/component';
import FloatingWindowComponent from '..';
import useChatStore from '../../../state/chat';
import status from '../../../types/status';
import useStatusStore from '../../../state/status';
import useUserStore from '../../../state/user';
import ButtonComponent from '../../Button';
import ErrorNotification from '../../../function/errorSwal';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import ShowNotification from '../../../function/notification';
import { io } from 'socket.io-client';
import Icons from '../../icons';

const socket = io(import.meta.env.VITE_APP_URL);

const StatusFloatingComponent = memo(() => {
  const token = Cookies.get('token');
  //user state
  const userinfo = useUserStore((state) => state.userinfo);
  const allUser = useUserStore((state) => state.alluser);
  //component state
  const setStatusModalActive = useComponentStore(
    (state) => state.setStatusModalActive
  );
  //status state
  const status = useStatusStore((state) => state.status);
  //local state
  const [currindex, setcurrindex] = useState<number>(0);
  const [statusData, setStatusData] = useState<Array<status>>([]);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  //chat state
  const sessionChat = useChatStore((state) => state.sessionChat);
  //handle Index Page
  const handleCurrIndex = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLElement;
    const handle = target.attributes.getNamedItem('data-method')?.value;
    if (handle == 'previous') setcurrindex((prev) => prev - 1);
    if (handle == 'next') setcurrindex((prev) => prev + 1);
  };

  //handle slider button
  const handleClickSlider = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const value = target.attributes.getNamedItem('data-index')?.value;
    setcurrindex(parseInt(value));
  };

  //check curr status username
  const currUsername =
    statusData.length != 0 &&
    allUser.find((item) => item.id === statusData[0].user_id)?.username;

  //delete status
  const handleDeleteStatus = async (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      Swal.fire({
        text: 'Apakah anda ingin menghapus status ini?',
        title: 'Peringatan',
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Ya',
      }).then(async (confirm) => {
        if (confirm) {
          socket.emit('deleteStatus', {
            id: statusData[currindex]?.id,
            token: Cookies.get('token'),
          });
        }
      });
    } catch (e) {
      ErrorNotification(e);
    }
  };

  //find user with session chat
  useEffect(() => {
    const findStatus = status.filter((item) => item.user_id === sessionChat);
    setIsOpened(true);
    setStatusData(findStatus);
  }, [sessionChat, status]);

  useEffect(() => {
    if (statusData.length === 0 && isOpened === true) {
      setStatusModalActive();
    }
  }, [statusData, isOpened]);

  useEffect(() => { });

  return (
    <FloatingWindowComponent
      title={currUsername as string}
      size='lg'
      titlePosition='left'
      onClick={setStatusModalActive}
    >
      <div className='relative -top-4 gap-0 flex flex-col justify-center'>
        <p className='font-bold'>{statusData[currindex]?.time}</p>
        {sessionChat === userinfo.id && (
          <div onClick={handleDeleteStatus} className='cursor-pointer self-end'>
            <Icons.TrashIcon fontsize='35' />
          </div>
        )}
      </div>

      {/* Slider */}
      <div className='w-full flex justify-center mb-4 gap-2'>
        {statusData.map((item, index) => (
          <div
            key={item.id}
            className={`w-3 h-3  rounded-full cursor-pointer ${index == currindex ? 'bg-cyan-400' : 'bg-gray-300'
              }`}
            data-index={index}
            onClick={handleClickSlider}
          ></div>
        ))}
      </div>

      {/* img */}
      <div className='w-12/12 relative flex flex-row'>
        {/* Left Arrow */}
        {currindex > 0 && (
          <div className='absolute bg-black bg-opacity-20 w-16 h-full flex justify-center items-center opacity-0 hover:opacity-100 transition-all'>
            <div
              className='cursor-pointer'
              data-method='previous'
              onClick={handleCurrIndex}
            >
              <Icons.LeftTriangleIcon fontsize='40' data-method='previous' />
            </div>
          </div>
        )}

        {statusData[currindex]?.img_id != null ||
          statusData[currindex]?.type === 'img' ? (
          <img
            src={statusData[currindex]?.img_id as string}
            className='rounded-[8px]'
          />
        ) : (
          <div className='w-[30vw] h-[30vh] bg-emerald-600 rounded-md flex justify-center items-center p-8'>
            <p className='font-bold'>{statusData[currindex]?.text}</p>
          </div>
        )}

        {/* Right Arrow*/}
        {currindex !== statusData.length - 1 && (
          <div className='absolute bg-black bg-opacity-20 w-16 h-full flex justify-center items-center right-0 opacity-0 hover:opacity-100 transition-all'>
            <div
              className='cursor-pointer'
              data-method='next'
              onClick={handleCurrIndex}
            >
              <Icons.RightTriangleIcon fontsize='40' data-method='previous' />
            </div>
          </div>
        )}
      </div>

      {/* input */}
      {sessionChat !== userinfo?.id && (
        <div>
          <InputComponent />
        </div>
      )}
    </FloatingWindowComponent>
  );
});

export default StatusFloatingComponent;
