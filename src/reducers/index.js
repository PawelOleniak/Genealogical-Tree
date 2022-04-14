import { CONSTS } from 'data/constants';
import { createSlice } from '@reduxjs/toolkit';
import addFamilyMemberReducerFunctions from './addMemberReducerFunctions';
import updateGridDimFunctions from './updateGridDimFunctions';
import mapColumnsMembersReducer from './mapMembersGridReducerFunctions';

const nodes = {
  root: {
    gender: CONSTS.MALE,
    name: 'p',
    surname: 'o',
    birthDate: '2000-01-01',
    childCount: 0,
    childInLawCount: 0,
    haveParents: true,
    position: { column: 1, row: 0, shift: 0 },
  }, // column serves as isVisited in dfs
  parent1: {
    gender: CONSTS.MALE,
    name: 'z',
    surname: 'o',
    birthDate: '1949-01-01',
    deathDate: '2000-01-01',
    childCount: 1,
    childInLawCount: 0,
    haveParents: false,
    position: { column: 2, row: -1, shift: 0 },
  },
  parent2: {
    gender: CONSTS.FEMALE,
    name: 'm',
    surname: 'o',
    birthDate: '1956-01-01',
    deathDate: '2000-01-01',
    childCount: 1,
    childInLawCount: 0,
    haveParents: false,
    position: { column: 1, row: -1, shift: 0 },
  },
};

const lists = {
  root: [
    { to: 'parent2', type: CONSTS.PARENT },
    { to: 'parent1', type: CONSTS.PARENT },
  ],
  parent1: [
    { to: 'root', type: CONSTS.CHILD },
    { to: 'parent2', type: CONSTS.PARTNER },
  ],
  parent2: [
    { to: 'parent1', type: CONSTS.PARTNER },
    { to: 'root', type: CONSTS.CHILD },
  ],
};
const grid = { 0: new Array(CONSTS.GRIDROWNUM).fill(false), '-1': new Array(CONSTS.GRIDROWNUM).fill(false) };
const initialState = { nodes, lists, grid };

const loadFnc = {
  loadToState: (state, action) => {
    console.log('Document data:', action.payload);
    return action.payload;
  },
};
export const geneaologicalSlice = createSlice({
  name: 'membersSlice',
  initialState: initialState,
  reducers: {
    ...addFamilyMemberReducerFunctions,
    ...mapColumnsMembersReducer,
    ...updateGridDimFunctions,
    ...loadFnc,
  },
});
export const {
  addChild,
  addParent,
  addSibling,
  addPartner,
  addExPartner,
  editFamilyMember,
  updateGridHeight,
  clearAllXPos,
  setXPosForMembers,
  loadToState,
} = geneaologicalSlice.actions;

export default geneaologicalSlice.reducer;
