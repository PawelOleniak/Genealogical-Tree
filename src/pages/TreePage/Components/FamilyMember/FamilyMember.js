import { CONSTS, dateOptions } from 'data/constants';
import React from 'react';
import { Group } from './FamilyMemberCss';
import { FiEdit2 } from 'react-icons/fi';
import { FaCross } from 'react-icons/fa';

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

  const { name, surname, position, gender, birthDate, deathDate } = familyMember[1];
  const dateOfBirth = birthDate ? new Date(birthDate).toLocaleDateString('pl-PL', dateOptions) : null;
  const dateOfDeath = deathDate ? new Date(deathDate).toLocaleDateString('pl-PL', dateOptions) : null;

  const age =
    birthDate && deathDate
      ? new Date(deathDate).getFullYear() - new Date(birthDate).getFullYear()
      : birthDate
      ? new Date().getFullYear() - new Date(birthDate).getFullYear()
      : null;
  const ageColor =
    age && age > 15
      ? `rgb(${200 + age * 1.5},${200 + age},${200 + age * 0.8})`
      : age <= 15
      ? `rgb(${200 + age * 4},${200 + age * 4},${200 + age * 6})`
      : 'rgb(100,100,100)';
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
      <rect x={dx} y={dy} width={CONSTS.MEMBERWIDTH} height={CONSTS.MEMBERHEIGHT} fill={ageColor} />
      <line x1={dx + CONSTS.MEMBERWIDTH - 13} x2={dx + CONSTS.MEMBERWIDTH - 13} y1={dy + 4} y2={dy + 12} />
      <line x1={dx + CONSTS.MEMBERWIDTH - 17} x2={dx + CONSTS.MEMBERWIDTH - 9} y1={dy + 8} y2={dy + 8} />
      <text className="nameAndSurname" x={dx + 12} y={dy + 12}>
        {name} {surname}
      </text>
      {birthDate || deathDate ? (
        <g>
          <text className="lifeDates" x={dx + 10} y={dy + CONSTS.MEMBERHEIGHT - 5}>
            {dateOfBirth}-{dateOfDeath}
          </text>
          {deathDate ? (
            <FaCross
              className="deathIcon"
              size={12}
              x={dx + dateOfBirth.length * 4.2 + dateOfDeath.length * 4.2}
              y={dy + CONSTS.MEMBERHEIGHT - 15}
            />
          ) : null}
        </g>
      ) : null}
      <rect
        x={dx + CONSTS.MEMBERWIDTH - 18}
        y={dy + 3}
        width="10"
        height="10"
        onClick={handleClickAddButton}
        className="addIcon"
        rx={'3px'}
      />
      <FiEdit2 onClick={handleEditButton} className="editIcon" x={dx + CONSTS.MEMBERWIDTH - 18} y={dy + 53} size={12} />
    </Group>
  );
};

export default FamilyMember;
