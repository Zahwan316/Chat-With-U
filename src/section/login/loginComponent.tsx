import { ChangeEvent, useEffect, useState } from 'react';
import useFormStore from '../../state/form';
import InputComponent from '../../Component/Input';
import ButtonComponent from '../../Component/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import BoxLoginRegister from '../../Component/BoxLogin&Register';
import ErrorNotification from '../../function/errorSwal';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputProperty from '../../types/inputProperty';

type errorState = {
  email: string;
  password: string;
};

const LoginComponent = () => {
  const form = useFormStore((state) => state.form);
  const setForm = useFormStore((state) => state.setform);
  const navigate = useNavigate();
  const [error, seterror] = useState<errorState>({ email: '', password: '' });
  const {
    handleSubmit,
    //formState: { errors },
  } = useForm<InputProperty>()

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

  const sendData = () => {
    const send = async () => {
      try {
        console.log(validateInput());
        const res = await axios.post(
          `${import.meta.env.VITE_APP_URL}auth/login`,
          form
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
        if (validateInput() === 0) {
        }
      } catch (e) {
        ErrorNotification(e);
      }
    };
    send();
  };

  useEffect(() => {
    console.log(error);
  });

  const onSubmit: SubmitHandler<InputProperty> = (data) => sendData();

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
            onChange={handleForm}
            placeholder='Email'
            type='text'
            width='100%'
            usingIcon={false}
          />
          <InputComponent
            name='password'
            onChange={handleForm}
            placeholder='Password'
            type='password'
            width='100%'
            usingIcon={false}
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
            onClick={sendData}
            width='full'
            type='submit'
          />
        </div>
      </form>
    </BoxLoginRegister>
  );
};

export default LoginComponent;
