import styled from 'styled-components';

export const ButtonsGrid = styled.div`
  display: flex;

  row-gap: 15px;
  span {
    text-shadow: 1px 1px gray;
  }
  .selected {
    background-color: lightgray;
  }

  button {
    margin: 0 50px;
    color: darkcyan;
  }
  button:disabled {
    opacity: 0.5;
  }
`;
