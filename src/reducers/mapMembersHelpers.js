import { current } from '@reduxjs/toolkit';
import { CONSTS } from 'data/constants';
import { findRelatives, findUnplacedRelatives } from 'helpers';

export const checkIsPositionFree = (state, [row], [column]) => current(state).grid[row][column];

export const fillPos = ({ state, node, row, column, reserveNext = false, reservePrev = false }) => {
  if (reservePrev) state.grid[row][Math.floor(column - 1)] = true;
  state.grid[row][Math.floor(column)] = true;
  if (reserveNext) state.grid[row][Math.floor(column + 1)] = true;
  state.nodes[node].position.column = column;
};
export const getPosition = (state, node) => [
  current(state).nodes[node].position.row,
  current(state).nodes[node].position.column,
];
export const findNextFreeColumn = ({ state, row, iniColumn = 0, reservation = 0 }) => {
  const rowFromIniColumn = current(state).grid[row].slice(iniColumn - reservation);
  return (
    rowFromIniColumn.findIndex((el, i) => el === false && rowFromIniColumn[i + reservation] === false) +
    iniColumn -
    reservation
  );
};
export const findMeanColumnOfChildren = ({ state, memberId }) => {
  const childrenIds = findRelatives(memberId, state.lists, CONSTS.CHILD);
  const children = childrenIds.map((el) => current(state).nodes[el]);
  const childCount = state.nodes[memberId].childCount;
  return children.reduce((acc, el) => acc + el.position.column, 0) / childCount;
};
export const shiftColumnIfPartnerHaveParents = (state, memberId, column) => {
  const [partner] = findUnplacedRelatives(state.nodes, memberId, state.lists, CONSTS.PARTNER);
  if (partner && current(state).nodes[partner].haveParents) {
    return 2;
  } else {
    return 0;
  }
};
export const setParentShift = (state, column, node, schiftChange) => {
  let currentShift = current(state).nodes[node].position.shift;
  currentShift += schiftChange;

  state.nodes[node].position.shift = currentShift;
};
export const getChildCount = (state, node) => current(state).nodes[node].childCount;
export const tS = (el) => el.toString();
