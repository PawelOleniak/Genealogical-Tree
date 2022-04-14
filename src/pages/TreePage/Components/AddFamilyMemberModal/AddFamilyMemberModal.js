import React, { useState } from 'react';
import { Button, Modal } from 'components';
import { CONSTS, FAMILYMEMBERS } from 'data/constants';
import { ButtonsGrid } from './AddFamilyMemberModalCss';
import { NewMemberForm } from 'pages/TreePage/Components';
import { capitalizeFirstLetter, findRelatives, findUnplacedRelatives } from 'helpers';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  addChild,
  addExPartner,
  addParent,
  addPartner,
  addSibling,
  clearAllXPos,
  editFamilyMember,
  setXPosForMembers,
  updateGridHeight,
} from 'reducers';

const AddFamilyMemberModal = ({ hideModal, selectedFamilyMember, selectedRow, editMode, ...props }) => {
  const [selectedRelation, setselectedRelation] = useState(null);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.membersSlice);
  const isParentsButtonDisabled = state.nodes[selectedFamilyMember].haveParents;
  const isExPartnersButtonDisabled = true;
  const isPartnersButtonDisabled = Boolean(findRelatives(selectedFamilyMember, state.lists, CONSTS.PARTNER).length);
  console.log(isPartnersButtonDisabled);
  const Buttons = FAMILYMEMBERS.map((FamilyMember) => (
    <Button
      disabled={
        (isParentsButtonDisabled && FamilyMember === CONSTS.PARENT) ||
        (isExPartnersButtonDisabled && FamilyMember === CONSTS.EXPARTNER) ||
        (isPartnersButtonDisabled && FamilyMember === CONSTS.PARTNER)
      }
      key={FamilyMember + 'button'}
      onClick={() => setselectedRelation(FamilyMember)}
      className={selectedRelation === FamilyMember ? 'selected' : null}
    >
      <span>{capitalizeFirstLetter(FamilyMember)}</span>
    </Button>
  ));
  const handleEditFamilyMember = (values) => {
    const payload = {
      id: selectedFamilyMember,
      name: values.name,
      gender: values.gender,
      birthDate: values.birthDate,
      deathDate: values.deathDate,
    };
    dispatch(editFamilyMember(payload));
    hideModal();
  };
  const handleAddFamilyMember = (values) => {
    const payload = {
      row: selectedRow,
      newId: uuid(),
      name: values.name,
      surename: 'o',
      from: selectedFamilyMember,
      gender: values.gender,
      forwardRel: selectedRelation,
    };

    dispatch(clearAllXPos());
    switch (selectedRelation) {
      case CONSTS.CHILD:
        dispatch(addChild(payload));
        const partner = findUnplacedRelatives(state.nodes, payload.from, state.lists, CONSTS.PARTNER);
        if (!!!partner) {
          payload.gender = payload.gender === CONSTS.MALE ? CONSTS.FEMALE : CONSTS.MALE;
          payload.name = null;
          payload.newId = uuid();
          payload.forwardRel = CONSTS.PARTNER;
          dispatch(addPartner(payload));
        }
        dispatch(updateGridHeight());
        break;

      case CONSTS.PARENT:
        dispatch(addParent(payload));
        payload.gender = payload.gender === CONSTS.MALE ? CONSTS.FEMALE : CONSTS.MALE;
        payload.name = null;
        payload.newId = uuid();
        dispatch(addParent(payload));
        dispatch(updateGridHeight());
        break;
      case CONSTS.PARTNER:
        dispatch(addPartner(payload));
        break;

      case CONSTS.SIBLING:
        dispatch(addSibling(payload));
        if (state.nodes[selectedFamilyMember].haveParents === false) {
          payload.gender = payload.gender === CONSTS.MALE;
          payload.name = null;
          payload.newId = uuid();
          payload.forwardRel = CONSTS.PARENT;
          dispatch(addParent(payload));
          payload.gender = payload.gender === CONSTS.MALE ? CONSTS.FEMALE : CONSTS.MALE;
          payload.newId = uuid();
          dispatch(addParent(payload));
          dispatch(updateGridHeight());
        }
        break;

      case CONSTS.EXPARTNER:
        dispatch(addExPartner(payload));
        break;

      default:
        console.log('default');
        break;
    }
    dispatch(setXPosForMembers());
    hideModal();
  };

  return (
    <Modal hideModal={hideModal} {...props}>
      {editMode ? null : <ButtonsGrid>{Buttons}</ButtonsGrid>}
      {selectedRelation || editMode ? (
        <NewMemberForm
          selectedFamilyMember={selectedFamilyMember}
          onSubmit={editMode ? handleEditFamilyMember : handleAddFamilyMember}
        />
      ) : null}
    </Modal>
  );
};

export default AddFamilyMemberModal;
