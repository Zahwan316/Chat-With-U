import { ChangeEvent, useEffect, useState } from 'react';
import useFormStore from '../../state/form';

import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import ErrorNotification from '../../function/errorSwal';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputProperty from '../../types/inputProperty';
import BoxLoginRegister from '../../component/BoxLogin&Register';

import ButtonComponent from '../../component/Button';
import useInputLogic from '../../hooks/useForm';
import InputComponent from '../../component/Input';
import { REG_EXP } from '../../constant/Regexp';

type errorState = {
  email: string;
  password: string;
};

type dataLogin = {
  email: string,
  password: string
}

const LoginComponent = () => {
  const form = useFormStore((state) => state.form);
  const setForm = useFormStore((state) => state.setform);
  const navigate = useNavigate();
  const [error, seterror] = useState<errorState>({ email: '', password: '' });
  const {
    register,
    handleSubmit,
    errors
  } = useInputLogic()

  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(name, value);
  };

  const validateInput = () => {
    const errors = {};

    if (form?.email === '') {
      errors.email = 'Email tidak boleh kosong';
    }

    if (form?.password === '') {
      errors.password = 'Password tidak boleh kosong';
    }

    seterror(errors);

    return Object.entries(errors).length;
  };

  const sendData = (data: dataLogin) => {
    const send = async () => {
      try {
        //console.log(validateInput());
        const res = await axios.post(
          `${import.meta.env.VITE_APP_URL}auth/login`,
          data
        );
        console.log(res);
        Swal.fire({
          title: 'Login berhasil',
          icon: 'success',
          timer: 1000,
        });
        Cookies.set('token', res.data.token);
        setTimeout(() => {
          navigate('/chat');
        }, 1100);
  
      } catch (e) {
        ErrorNotification(e);
      }
    };
    send();
  };

  useEffect(() => {
   //console.log(error);
  });

  const onSubmit: SubmitHandler<InputProperty> = (data) => {
    sendData(data)
    console.log(data)
  };

  useEffect(() => {
    setForm('email', '');
    setForm('password', '');
  }, []);

  return (
    <BoxLoginRegister title='Login'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full'>
          <InputComponent
            name='email'
            required={{ value: true, message:"Email harus diisi" }}
            onChange={handleForm}
            placeholder='Email'
            type='text'
            width='100%'
            usingIcon={false}
            register={register}
            errors={errors}
            label='Email'
            pattern={{
              value: REG_EXP.email,
              message: "Isi format email dengan benar"
            }}
          />
          <InputComponent
            name='password'
            onChange={handleForm}
            placeholder='Password'
            type='password'
            width='100%'
            usingIcon={false}
            register={register}
            errors={errors}
            required={{ value: true, message:"Password harus diisi" }}
            label='Password'
          />
        </div>
        <div className='mb-10'>
          <p className='text-[#e7e6e6] text-sm'>
            Belum mempunyai akun?{' '}
            <a
              className='text-[#05BDF8] cursor-pointer'
              onClick={() => {
                navigate('/register');
              }}
            >
              Registrasi Sekarang
            </a>
          </p>
        </div>
        <div className=''>
          <ButtonComponent
            body='Login'
            //onClick={sendData}
            width='full'
            type='submit'
          />
        </div>
      </form>
    </BoxLoginRegister>
  );
};

export default LoginComponent;
