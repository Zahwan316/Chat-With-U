import { useEffect, useState } from 'react';
import useFormStore from '../../state/form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ErrorNotification from '../../function/errorSwal';
import ConsoleDebug from '../../function/debugConsole';
import BoxLoginRegister from '../../component/BoxLogin&Register';
import useInputLogic from '../../hooks/useForm';
import ButtonComponent from '../../component/Button';
import InputComponent from '../../component/Input';
import { SubmitHandler } from 'react-hook-form';
import { REG_EXP } from '../../constant/Regexp';

type dataForm = {
  fullname: string;
  username: string;
  email: string;
  number_phone: number;
  password: string;
};

const RegisterMainComponent = () => {
  const setform = useFormStore((state) => state.setform);
  const form = useFormStore((state) => state.form);
  const [error, seterror] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    repeat_password: '',
    number_phone: '',
  });
  const navigate = useNavigate();
  const { register, errors, handleSubmit} = useInputLogic();

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setform(name, value);
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_URL}auth/register`,
        form
      );
      Swal.fire({
        text: res.data?.message,
        icon: 'success',
        title: 'Berhasil',
        timer: 1000,
      });
      setTimeout(() => {
        navigate('/login');
      }, 1300);
    } catch (e) {
      console.log(validateInput());
      ErrorNotification(e);
    }
  };

  const onSubmit: SubmitHandler<dataForm> = (data) => console.log(data);

  useEffect(() => {
    for (const key in error) {
      setform(key, error[key]);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BoxLoginRegister title='Registrasi'>
        <div className='flex flex-col'>       
          <div className='flex flex-row gap-4'>
            <InputComponent
              name='fullname'
              onChange={handleForm}
              placeholder='Nama Lengkap'
              type='text'
              usingIcon={false}
              register={register}
              errors={errors}
              label='Nama Lengkap'
              required={{ value: true, message: "Nama lengkap harus diisi" }}
            />
            <InputComponent
              name='username'
              onChange={handleForm}
              placeholder='Username'
              type='text'
              usingIcon={false}
              register={register}
              errors={errors}
              label='Username'
              required={{ value: true, message: "Username harus diisi" }}
            />        
          </div> 
          <div className='flex flex-row gap-4'>
            <InputComponent
              name='email'
              onChange={handleForm}
              placeholder='Email'
              type='text'
              usingIcon={false}
              register={register}
              errors={errors}
              label='Email'
              required={{ value: true, message: "Email harus diisi" }}
              pattern={{ value: REG_EXP.email, message: "Isi format email dengan benar" }}
            />
            <InputComponent
              name='number_phone'
              onChange={handleForm}
              placeholder='Nomor Telepon'
              type='number'
              usingIcon={false}
              register={register}
              errors={errors}
              label='Nomor Telepon'
              required={{ value: true, message: "Nomor telepon harus diisi" }}
              minLength={{ value: 12, message: "Nomor telepon minimal 12 angka"}}
              maxLength={{ value: 13, message: "Nomor telepon tidak bisa lebih dari 13 angka"}}
              max={13}
            />
            </div>
            <div className='flex flex-row gap-4'>
              <InputComponent
                name='password'
                onChange={handleForm}
                placeholder='Password'
                type='password'
                usingIcon={false}
                register={register}
                errors={errors}
                label='Password'
                required={{ value: true, message: "Password harus diisi" }}
              />
              <InputComponent
                name='repeat_password'
                onChange={handleForm}
                placeholder='Ulangi Password'
                type='password'
                usingIcon={false}
                register={register}
                errors={errors}
                label='Ulangi Password'
                /* validate={(value: string) =>
                  value === getValues("password") || "Password tidak cocok"
                } */
              />
          </div>
          <div className='mb-8'>
            <p className='text-[#e7e6e6] text-sm'>
              Sudah punya akun?{' '}
              <a
                className='text-[#05BDF8] cursor-pointer'
                onClick={() => {
                  navigate('/login');
                }}
              >
                Login Sekarang
              </a>
            </p>
          </div>
        </div>
        <ButtonComponent
          body='Registrasi'
          type='submit'
          width='full'
        />
      </BoxLoginRegister>
    </form>
  );
};

export default RegisterMainComponent;
