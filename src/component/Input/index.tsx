import { memo } from 'react';
import { motion } from 'framer-motion';
import InputProperty from '../../types/inputProperty';
import clsx from 'clsx';
import styles from './style.module.css'
import Icons from '../icons';

const InputComponent = memo((props: InputProperty) => {
  const isInputError = props.errors && props.errors[props.name]

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
          //type={props.type}
          //onChange={props.onChange}
          value={props.value}         
          placeholder={props.placeholder}
          className={clsx(styles.input, props.usingIcon && styles.inputIcon, styles.textarea)}
          {...props.register(props.name, {required: props.required})}
        >
          test
        </motion.textarea>
      ) : (
        <motion.input
          whileFocus={{ backgroundColor: '#5356FF90' }}
          type={props.type}
          //onChange={props.onChange}
          value={props.value}
          formNoValidate
          placeholder={props.placeholder}
          className={clsx(styles.input,props.usingIcon && styles.inputIcon, isInputError && styles.error)}
          {...props.register(props.name, {required: props.required, pattern: props.pattern, minLength: props.minLength, maxLength: props.maxLength, validate: props.validate})}
          maxLength={props.max}
          // required: props.required, pattern: props.pattern, minLength: props.minLength
        />
      )}

      {props.usingIcon && (
        <button
          className='absolute right-2 cursor-pointer'
          onClick={props.onClick}
          type='submit'
        >
          <Icons.SearchIcon fontsize='25' />
        </button>
      )}

      {isInputError && <p className='text-sm  text-red-500 '>*{ isInputError?.message}</p>}
    </div>
  );
});

export default InputComponent;
