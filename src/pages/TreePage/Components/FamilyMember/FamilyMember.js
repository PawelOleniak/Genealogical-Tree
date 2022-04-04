import { CONSTS } from 'data/constants';
import React from 'react';
import { Charackter, Group } from './FamilyMemberCss';
import { FiEdit2 } from 'react-icons/fi';

const FamilyMember = ({
  familyMember,
  dx,
  dy,
  handleShowModal,
  setSelectedFamilyMember,
  setSelectedLvl,
  setIsEditMode,
}) => {
  const id = familyMember[0];
  const { name, surname, position, gender } = familyMember[1];
  const handleClickAddButton = () => {
    setSelectedFamilyMember(id);
    setSelectedLvl(position.row);
    handleShowModal();
  };
  const handleEditButton = () => {
    setSelectedFamilyMember(id);
    handleShowModal();
    setIsEditMode(true);
  };
  return (
    <Group gender={gender}>
      <rect x={dx} y={dy} width={CONSTS.MEMBERWIDTH} height={CONSTS.MEMBERHEIGHT} />
      <line x1={dx + CONSTS.MEMBERWIDTH - 13} x2={dx + CONSTS.MEMBERWIDTH - 13} y1={dy + 4} y2={dy + 12} />
      <line x1={dx + CONSTS.MEMBERWIDTH - 17} x2={dx + CONSTS.MEMBERWIDTH - 9} y1={dy + 8} y2={dy + 8} />
      <Charackter x={12 + dx} y={dy + 12}>
        {name} {surname}
      </Charackter>
      <rect x={dx + 102} y={dy + 3} width="10" height="10" onClick={handleClickAddButton} className="icon" rx={'3px'} />
      <FiEdit2 onClick={handleEditButton} className="icon" x={dx + +100} y={dy + 53} size={12} />
    </Group>
  );
};

export default FamilyMember;
