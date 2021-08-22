import styled from 'styled-components';

export const ButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 15px;
  > :nth-child(even) {
    margin-left: 50px;
    color: darkcyan;
  }
  > :nth-child(odd) {
    margin-right: 50px;
  }
`;
