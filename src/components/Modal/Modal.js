import React from 'react';
import { createPortal } from 'react-dom';
import { Wrapper, Content, CloseIcon } from './ModalCss';

export default function Modal({ children, isStatic, hideModal }) {
  return createPortal(
    <Wrapper onClick={hideModal}>
      <Content isStatic={isStatic} onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={hideModal}>&times;</CloseIcon>
        {children}
      </Content>
    </Wrapper>,
    document.querySelector('#modal')
  );
}
