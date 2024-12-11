import Icons from '../Icons';
import { motion } from 'framer-motion';

type props = {
  children: React.ReactNode;
  title: string;
  onClick: React.MouseEventHandler;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  titlePosition?: 'left' | 'right';
};

const FloatingWindowComponent = ({
  children,
  title,
  onClick,
  size,
  titlePosition,
}: props) => {
  return (
    <div className='absolute flex justify-center items-center w-full h-full backdrop-blur-sm'>
      <motion.div
        initial={{ width: 0, height: 0, display: 'none' }}
        animate={{ width: 'auto', height: 'auto', display: 'block' }}
        exit={{ width: 0, height: 0, display: 'none', opacity: 0 }}
        className={`max-w-[50%]  ${size === 'sm'
            ? 'w-2/12'
            : size === 'md'
              ? 'w-6/12'
              : size === 'lg' && 'w-8/12'
          } relative h-auto rounded-xl border border-[#ffffff30] bg-[#5356FF] backdrop-blur-sm bg-opacity-50 p-4`}
      >
        <div className='w-full mb-4 flex justify-between items-center h-8 relative'>
          {titlePosition !== 'left' && <div></div>}
          <div>
            <h2 className='font-bold text-xl'>{title}</h2>
          </div>
          <div className='cursor-pointer' onClick={onClick}>
            <Icons.CloseIcon fontsize='20' />
          </div>
        </div>
        {children}
      </motion.div>
    </div>
  );
};

export default FloatingWindowComponent;
