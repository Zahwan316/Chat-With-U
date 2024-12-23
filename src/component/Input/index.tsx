import { memo } from 'react';
import { motion } from 'framer-motion';
import Icons from '../Icons';
import InputProperty from '../../types/inputProperty';
import clsx from 'clsx';
import styles from './style.module.css'
import { useForm } from 'react-hook-form';

const InputComponent = memo((props: InputProperty) => {
  const { register, handleSubmit, formState: {errors}} = useForm();
  return (
    <div
      style={{ width: props.width }}
      className={`w-[gap-2 justify-center mb-4 flex flex-col relative`}
    >
      {props.label && (
        <label className='font-bold text-md mb-2'>{props.label}</label>
      )}

      {props.type === 'textarea' ? (
        <motion.textarea
          whileFocus={{ backgroundColor: '#5356FF90' }}
          type={props.type}
          onChange={props.onChange}
          value={props.value}
          name={props.name}
          placeholder={props.placeholder}
          className={clsx(styles.input, props.usingIcon && styles.inputIcon, styles.textarea)}
          {...register(props.name, {required: props.required})}
        >
          test
        </motion.textarea>
      ) : (
        <motion.input
          whileFocus={{ backgroundColor: '#5356FF90' }}
          type={props.type}
          //onChange={props.onChange}
          value={props.value}
          //name={props.name}
          placeholder={props.placeholder}
          className={clsx(styles.input,props.usingIcon && styles.inputIcon)}
          {...register(props.name, {required: props.required})}

        />
      )}

      {props.usingIcon && (
        <div
          className='absolute right-2 cursor-pointer'
          onClick={props.onClick}
        >
          <Icons.SearchIcon fontsize='25' />
        </div>
      )}

      {errors.name && <p className='text-sm  font-bold'>*This field required</p>}
    </div>
  );
});

export default InputComponent;
