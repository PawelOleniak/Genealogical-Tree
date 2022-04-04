import { CONSTS } from 'data/constants';
import { findTreeRows } from 'helpers';
import { current } from '@reduxjs/toolkit';
const updateGridDimFunctions = {
  updateGridHeight: (state, action) => {
    const newTreeHeigth = findTreeRows(Object.entries(current(state).nodes));
    state.maxRow = Math.max(...newTreeHeigth);
    state.grid = {};
    newTreeHeigth.forEach((el) => (state.grid[el] = new Array(CONSTS.GRIDROWNUM).fill(false)));
  },
};
export default updateGridDimFunctions;
