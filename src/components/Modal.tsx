import React from "react";
import {useEffect, useState, useLayoutEffect} from "react"
import ReactDOM from 'react-dom'

type Props = {
  closeFn: () => void;
}

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

const Modal: React.FC<Props> = ({closeFn, children}) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement>();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeFn()
  }

  useLayoutEffect(() => {
    let element = document.getElementById('modal');
    if (!element) {
      element = createWrapperAndAppendToBody('modal');
    }
    setWrapperElement(element);
  }, []);

  useEffect(() => {
    const escClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFn();
    }

    document.addEventListener('keyup', escClose);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keyup', escClose);
      document.documentElement.style.overflow = 'auto';
    }
  }, [closeFn])

  return (
    <>
      {wrapperElement && ReactDOM.createPortal(
        <div
          className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center overflow-auto bg-black/90"
          onClick={handleBackdropClick}
        >
          {children && children}
        </div>,
        wrapperElement
      )}
    </>
  )
}

export default Modal
