import { MouseEventHandler } from 'react';
import { motion } from 'framer-motion';

type buttonProps = {
  body: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  width: 'full' | string;
  type?: "submit" | "button"
};

const ButtonComponent = ({ body, onClick, width, type }: buttonProps) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        backgroundColor: '#F4f4f430',
        border: '1px solid white',
      }}
      whileTap={{ scale: 1.1 }}
      onClick={onClick}
      className={`${
        width === 'full' ? 'w-full' : `w-${width}`
      } border border-white px-8 py-2 outline-none active:outline-none`}
      type={type}
    >
      {body}
    </motion.button>
  );
};

export default ButtonComponent;
