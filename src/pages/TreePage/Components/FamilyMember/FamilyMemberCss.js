import { CONSTS } from 'data/constants';
import styled from 'styled-components';

export const Group = styled.g`
  .lifeDates {
    font-size: 6px;
    font-family: 'Roboto Mono', monospace;
  }
  .nameAndSurname {
    font-size: 12px;
    font-family: 'Roboto Mono', monospace;
  }
  line {
    stroke: black;
  }
  .editIcon {
    cursor: pointer;
    opacity: 0.4;
    fill: ivory;
  }
  .addIcon {
    cursor: pointer;
    opacity: 0.4;
    fill: ivory;
  }
  .deathIcon {
    fill: #452311;
  }
  .icon:hover {
    fill: rgba(50, 50, 50, 1);
  }
  rect {
    stroke: ${({ gender }) => (gender === CONSTS.MALE ? 'lightblue' : 'pink')};
    fill-opacity: 0.7;
    stroke-width: 2;
    rx: 15px;
  }
  text {
    stroke: none;
  }
  border-radius: 20px;
`;
