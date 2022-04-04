import { CONSTS } from 'data/constants';
import styled from 'styled-components';

export const Charackter = styled.text`
  font-size: 12px;
  font-family: Roboto;
`;
export const Group = styled.g`
  line {
    stroke: black;
  }
  .icon {
    cursor: pointer;
    opacity: 0.4;
    fill: ivory;
  }
  .icon:hover {
    fill: rgba(50, 50, 50, 1);
  }
  rect {
    stroke: ${({ gender }) => (gender === CONSTS.MALE ? 'lightblue' : 'pink')};
    fill: #9c9c94;
    fill-opacity: 1;
    rx: 15px;
  }
  text {
    stroke: none;
  }
  border-radius: 20px;
`;
