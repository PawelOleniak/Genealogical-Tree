import { current } from '@reduxjs/toolkit';
import { CONSTS } from 'data/constants';
import {
  findYoungestMemberId,
  findUnplacedRelatives,
  findTreeRows,
  findUnplacedRelativesSortIfPartnerHaveParents,
} from 'helpers';
import {
  fillPos,
  findMeanColumnOfChildren,
  findNextFreeColumn,
  getChildCount,
  shiftColumnIfPartnerHaveParents,
  tS,
} from './mapMembersHelpers';

const fillPartner = ({ state, memberId, row, column, isFillingUpwards }) => {
  const [unplacedPartner] = findUnplacedRelatives(state.nodes, memberId, state.lists, CONSTS.PARTNER);

  if (unplacedPartner !== undefined) {
    //const partnersParentsShift = checkPa;
    fillMember({
      state,
      memberId: unplacedPartner,
      row,
      column: findNextFreeColumn({ state, row, iniColumn: column }),
      isFillingUpwards,
      //siblingsColumnShift
    });
  }
};
const fillParent = ({ state, memberId, row, column, isFillingUpwards }) => {
  const [unplacedParent] = findUnplacedRelatives(state.nodes, memberId, state.lists, CONSTS.PARENT);
  if (unplacedParent) {
    let higherRow = tS(+row - 1);
    fillMember({
      state,
      memberId: unplacedParent,
      row: higherRow,
      column: findNextFreeColumn({
        state,
        row: higherRow,
        iniColumn: Math.ceil(findMeanColumnOfChildren({ state, memberId: unplacedParent })),
        reservation: 1,
      }),
      isFillingUpwards: true,
      //siblingsColumnShift - 0.5 * (childCount % 2)
    });
  }
};
const fillSibling = ({ state, memberId, row, column, childCount, isFillingUpwards }) => {
  const unplacedSiblings = findUnplacedRelativesSortIfPartnerHaveParents(
    state.nodes,
    memberId,
    state.lists,
    CONSTS.SIBLING,
    isFillingUpwards
  );
  if (unplacedSiblings.length) {
    const siblingsChildrenCount = getChildCount(state, unplacedSiblings[0]);
    console.log(memberId);
    const childInLawCount = current(state).nodes[memberId].childInLawCount;
    console.log(childInLawCount);
    fillMember({
      state,
      memberId: unplacedSiblings[0],
      row,
      column: findNextFreeColumn({
        state,
        row,
        iniColumn:
          column + Math.ceil(childCount / 2) + Math.ceil(siblingsChildrenCount / 2) + Math.floor(childInLawCount / 2),
      }),
      isFillingUpwards,
    });
  }
};
const fillChild = ({ state, memberId, row, column, childCount, isFillingUpwards }) => {
  const unplacedChildren = findUnplacedRelatives(state.nodes, memberId, state.lists, CONSTS.CHILD);
  if (unplacedChildren.length) {
    let lowerRow = tS(+row + 1);
    fillMember(
      {
        state,
        memberId: unplacedChildren[0],
        row: lowerRow,
        column: findNextFreeColumn({ state, row: lowerRow, iniColumn: column - Math.floor(childCount / 2) }),
        isFillingUpwards: false,
      }
      //siblingsColumnShift - 0.5 * (childCount % 2)}
    );
  }
};

const fillMember = ({ state, memberId, row, column, isFillingUpwards, siblingsColumnShift = 0 }) => {
  //state.nodes[memberId].position.shift = siblingsColumnShift;
  fillPos({ state, node: memberId, row, column });
  let childCount = getChildCount(state, memberId);
  const args = { state, memberId, row, column, childCount, isFillingUpwards };
  if (isFillingUpwards) {
    console.log('up', current(state).nodes[memberId].name);
    fillPartner(args);
    fillSibling(args);
    fillParent(args);
    fillChild(args);
  } else {
    console.log('down', current(state).nodes[memberId].name);
    fillPartner(args);
    fillChild(args);
    fillSibling(args);
    fillParent(args);
  }
};

const mapColumnsMembersReducer = {
  clearAllXPos: (state) => {
    Object.entries(state.nodes).forEach(([key, value]) => {
      value.position.column = null;
    });

    Object.entries(current(state).grid).forEach(([key, value]) => {
      state.grid[key] = new Array(CONSTS.GRIDROWNUM).fill(false);
    });
  },

  setXPosForMembers: (state, action) => {
    console.clear();
    const rows = findTreeRows(Object.entries(current(state).nodes)).flatMap((el) => +el);
    const initialRow = Math.max(...rows);
    const youngestMemberId = findYoungestMemberId(current(state).nodes);
    fillMember({ state, memberId: youngestMemberId, row: initialRow, column: 1, isFillingUpwards: false });
  },
};

export default mapColumnsMembersReducer;
