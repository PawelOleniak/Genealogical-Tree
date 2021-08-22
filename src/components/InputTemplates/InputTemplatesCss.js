import styled from 'styled-components';
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > :nth-child(2) {
    > :nth-child(1) {
      padding: 6px 7px;
      border: 1px solid lightgray;
      box-sizing: border-box;
      box-shadow: -2px 4px 8px rgba(110, 120, 140, 0.1);
      border-radius: 25px;
      width: calc(50px + 15vw);
    }

    > :focus {
      outline: none;
      background-color: ivory;
    }
  }
`;
