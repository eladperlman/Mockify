import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = (props: {
  children?: JSX.Element[] | JSX.Element;
  onClose: any;
}) => {
  useEffect(() => {
    document.getElementById('body')?.classList.add('modal');
    return () => {
      document.getElementById('body')?.classList.remove('modal');
    };
  }, []);

  return (
    <>
      {createPortal(
        <div
          onClick={props.onClose}
          className="top-0 left-0 z-10 fixed w-[100%] h-[100%] bg-[rgba(0,0,0,0.6)] blur-lg"
        ></div>,
        document.getElementById('modal-root') as HTMLElement
      )}
      {createPortal(
        <div className="z-10 top-[10%] left-[10%] fixed w-[80%] h-[80%] flex flex-wrap justify-center content-center">
          {props.children}
        </div>,
        document.getElementById('modal-root') as HTMLElement
      )}
    </>
  );
};

export default Modal;
