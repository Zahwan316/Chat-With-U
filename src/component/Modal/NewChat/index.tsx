import { useState } from 'react';
import useComponentStore from '../../../state/component';
import InputComponent from '../../Input';
import ListUser from '../../User';
import FloatingWindowComponent from '..';
import axios from 'axios';
import useUserStore from '../../../state/user';
import { motion } from 'framer-motion';
import useChatStore from '../../../state/chat';
import Cookies from 'js-cookie';
import useInputLogic from '../../../hooks/useForm';
import { SubmitHandler } from 'react-hook-form';

type data = {
  no_telepon: number
}

const NewChatComponent = () => {
  const setNewChatMenuActive = useComponentStore(
    (state) => state.setNewChatMenuActive
  );
  const searcheduser = useUserStore((state) => state.searchedUser);
  const setsearcheduser = useUserStore((state) => state.setsearcheduser);
  const resetSearcheduser = useUserStore((state) => state.resetSearchedUser);
  const [searched, setsearched] = useState<boolean>(false);
  const setSessionChat = useChatStore((state) => state.setSessionChat);
  const userinfo = useUserStore((state) => state.userinfo);
  const [description, setdescription] = useState<string>();
  const token = Cookies.get('token');
  const { register, errors, handleSubmit,} = useInputLogic();


  const handleSearchUser = async (dataForm: data) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}api/user/${dataForm?.no_telepon}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data.data;
      setsearcheduser(data);
      setsearched(true);
      setdescription('User tidak ditemukan');
    } catch (e) {
      if (import.meta.env.VITE_APP_STAGE === 'BUILD') {
        console.log(e);
      }
    }
  };

  const onSubmit: SubmitHandler<data> = (data) => handleSearchUser(data)

  const handleClickUser = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const id = target.attributes.getNamedItem('data-id')?.value;
    if (id != userinfo.id) {
      setSessionChat(id as string);
      resetSearcheduser()
      setNewChatMenuActive();
    } else {
      setdescription('Tidak bisa chat dengan diri sendiri');
    }
  };

  return (
    <FloatingWindowComponent
      title='Tambah Chat'
      onClick={setNewChatMenuActive}
      size='xl'
    >
      <div>
        <div>
          {searcheduser.length === 0 && searched === true ? (
            <div className='p-4'>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='font-bold'
              >
                {description}
              </motion.p>
            </div>
          ) : (
            searcheduser.map((item) => (
              <ListUser
                id={item.id}
                img={item.image}
                username={item.username}
                onClick={handleClickUser}
              />
            ))
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='w-96 flex flex-row items-center '>
              <InputComponent
                placeholder='Cari no telpon'
                usingIcon={true}
                type='number'
                name='no_telepon'
                //onChange={handleInput}
                //onClick={handleSearchUser}
                width='100%'
                register={register}
                errors={errors}
                required={{ value: true, message: "No telepon harap diisi"}}
                minLength={{ value: 12, message: "Panjang nomor minimal 12"}}
              />
          </div>
        </form>
      </div>
    </FloatingWindowComponent>
  );
};

export default NewChatComponent;
