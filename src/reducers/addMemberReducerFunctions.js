import { CONSTS } from 'data/constants';
import { findRelatives, findUnplacedRelatives } from 'helpers';
import { current } from '@reduxjs/toolkit';
const addFamilyMember = ({ state, action, row, backwardRel }) => {
  const { name, surename, gender, newId: id, forwardRel } = action.payload;

  state.nodes[id] = {
    gender,
    name,
    surename,
    childCount: 0,
    childInLawCount: 0,
    haveParents: false,
    position: { row, column: null, shift: 0 },
  };
  state.lists[id] = [];
  addRelation({ state, action, firstRelation: forwardRel, secondRelation: backwardRel });
};

const addRelation = ({ state, action, firstId, secondId, firstRelation, secondRelation }) => {
  const { from, newId: id } = action.payload;
  state.lists[firstId ? firstId : from].push({ to: secondId ? secondId : id, type: firstRelation });
  state.lists[secondId ? secondId : id].push({
    to: firstId ? firstId : from,
    type: secondRelation,
  });
};

const addFamilyMemberReducerFunctions = {
  addChild: (state, action) => {
    const children = findUnplacedRelatives(current(state).nodes, action.payload.from, state.lists, CONSTS.CHILD);
    addFamilyMember({ state, row: action.payload.row + 1, action, backwardRel: CONSTS.PARENT });
    state.nodes[action.payload.from].childCount++;
    state.nodes[action.payload.newId].haveParents = true;
    const [partner] = findUnplacedRelatives(current(state).nodes, action.payload.from, state.lists, CONSTS.PARTNER);
    children.forEach((el) => {
      addRelation({ state, action, firstId: el, firstRelation: CONSTS.SIBLING, secondRelation: CONSTS.SIBLING });
    });
    if (partner) {
      state.nodes[partner].childCount++;
      addRelation({
        state,
        action,
        firstId: action.payload.newId,
        secondId: partner,
        firstRelation: CONSTS.PARENT,
        secondRelation: CONSTS.CHILD,
      });
    }
  },
  addSibling: (state, action) => {
    const siblings = findUnplacedRelatives(current(state).nodes, action.payload.from, state.lists, CONSTS.SIBLING);
    addFamilyMember({ state, action, row: action.payload.row, backwardRel: CONSTS.SIBLING });
    siblings.forEach((el) => {
      addRelation({ state, action, firstId: el, firstRelation: CONSTS.SIBLING, secondRelation: CONSTS.SIBLING });
    });
    const [parent] = findUnplacedRelatives(current(state).nodes, action.payload.from, state.lists, CONSTS.PARENT);

    if (parent) {
      state.nodes[parent].childCount++;
      state.nodes[action.payload.newId].haveParents = true;
      addRelation({ state, action, firstId: parent, firstRelation: CONSTS.CHILD, secondRelation: CONSTS.PARENT });
      const [secParent] = findUnplacedRelatives(current(state).nodes, parent, state.lists, CONSTS.PARTNER);
      if (secParent) {
        state.nodes[secParent].childCount++;
        addRelation({
          state,
          action,
          firstId: secParent,
          firstRelation: CONSTS.CHILD,
          secondRelation: CONSTS.PARENT,
        });
      }
    }
  },

  addParent: (state, action) => {
    const siblings = findUnplacedRelatives(current(state).nodes, action.payload.from, state.lists, CONSTS.SIBLING);
    let parent;
    let [secParent] = findUnplacedRelatives(current(state).nodes, action.payload.from, state.lists, CONSTS.PARENT);
    addFamilyMember({ state, row: action.payload.row - 1, action, backwardRel: CONSTS.CHILD });
    state.nodes[action.payload.from].haveParents = true;
    siblings.forEach((el) => {
      state.nodes[el].haveParents = true;
      addRelation({ state, action, firstId: el, firstRelation: CONSTS.PARENT, secondRelation: CONSTS.CHILD });
    });
    state.nodes[action.payload.newId].childCount = siblings.length ? siblings.length : 1;
    if (secParent) {
      addRelation({
        state,
        action,
        firstId: secParent,
        firstRelation: CONSTS.PARTNER,
        secondRelation: CONSTS.PARTNER,
      });
    }
    state.nodes[action.payload.newId].childCount = findRelatives(
      action.payload.newId,
      state.lists,
      CONSTS.CHILD
    ).length;
    [parent, secParent] = findUnplacedRelatives(current(state).nodes, action.payload.from, state.lists, CONSTS.PARENT);
    const [havePartner] = findRelatives(action.payload.from, state.lists, CONSTS.PARTNER);
    if (parent && havePartner) {
      state.nodes[parent].childInLawCount++;
    }
    if (secParent && havePartner) {
      state.nodes[secParent].childInLawCount++;
    }
  },
  addPartner: (state, action) => {
    const children = findUnplacedRelatives(current(state).nodes, action.payload.from, state.lists, CONSTS.CHILD);
    addFamilyMember({ state, row: action.payload.row, action, backwardRel: CONSTS.PARTNER });
    children.forEach((el) => {
      addRelation({ state, action, firstId: el, firstRelation: CONSTS.PARENT, secondRelation: CONSTS.CHILD });
    });
    state.nodes[action.payload.newId].childCount = current(state).nodes[action.payload.from].childCount;
    const [parent, secParent] = findUnplacedRelatives(
      current(state).nodes,
      action.payload.from,
      state.lists,
      CONSTS.PARENT
    );
    if (parent) {
      state.nodes[parent].childInLawCount++;
    }
    if (secParent) {
      state.nodes[secParent].childInLawCount++;
    }
  },
  //Will be added later
  addExPartner: (state, action) => {
    addFamilyMember({
      state,
      row: action.payload.row,
      action,
      backwardRel: CONSTS.EXPARTNER,
    });
  },
  editFamilyMember: (state, action) => {
    const { name, gender, id } = action.payload;
    state.nodes[id].name = name;
    state.nodes[id].gender = gender;
  },
};
export default addFamilyMemberReducerFunctions;
