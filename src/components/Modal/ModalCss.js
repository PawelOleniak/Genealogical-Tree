import styled from 'styled-components';

export const Wrapper = styled.aside`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 150;
`;

export const Content = styled.div`
  background: #fff;
  position: absolute;
  margin: auto;
  width: ${({ isStatic }) => (isStatic ? '250px' : 'fit-content')};
  height: ${({ isStatic }) => (isStatic ? '200px' : 'fit-content')};
  box-shadow: darkgray;
  padding: 25px 50px;
  border-radius: 15px;
  > * {
    display: flex;
    flex-direction: column;
    * {
      margin-top: 5px;
    }
    > :nth-child(2) {
      // background-color: red;
    }
  }
`;

export const CloseIcon = styled.div`
  position: absolute;
  right: 7px;
  top: 5px;
  cursor: pointer;
  font-size: 20px;
`;
