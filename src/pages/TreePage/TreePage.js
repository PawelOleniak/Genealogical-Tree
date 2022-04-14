import React, { useState } from 'react';
import { TreeWrapper } from './TreePageCss';
import { CONSTS } from 'data/constants';
import { AddFamilyMemberModal } from './Components';
import FamilyMember from './Components/FamilyMember/FamilyMember';
import { useDispatch, useSelector } from 'react-redux';
import useDraggable from 'helpers/useDraggable';

import { findAllRelations } from 'helpers';
import { Button } from 'components';
import { loadUserData, setUserData } from 'helpers/saveState';
import { loadToState } from 'reducers';
import LoadFamilyTreeFormModal from './Components/LoadFamilyTreeFormModal/LoadFamilyTreeFormModal';
import { signOut } from 'firebase/auth';
import { auth } from 'index';
import { useHistory } from 'react-router-dom';

const TreePage = ({ ...props }) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [isInputModalActive, setIsInputModalActive] = useState(false);
  const [isLoadMode, setIsLoadMode] = useState(false);
  const [editMode, setIsEditMode] = useState(false);
  const handleShowModal = () => {
    setIsModalActive(!isModalActive);
    setIsEditMode(false);
  };
  const handleShowLoadModal = () => {
    setIsInputModalActive(!isInputModalActive);
  };
  const [selectedFamilyMember, setSelectedFamilyMember] = useState(null);
  const [selectedRow, setSelectedLvl] = useState(null);
  const state = useSelector((state) => state.membersSlice);
  const { nodes, lists, grid } = state;
  const members = Object.entries(nodes);

  const rows = Object.entries(grid);
  const elements = members.length
    ? members.map((el, index) => (
        <g key={el[0]}>
          <FamilyMember
            dx={(el[1].position.column + el[1].position.shift) * CONSTS.XGAPS.ALONESIBLINGS}
            dy={(el[1].position.row + 0.5 + rows.length / 2) * CONSTS.ROWHEIGHT - CONSTS.MEMBERHEIGHT / 2}
            familyMember={el}
            handleShowModal={handleShowModal}
            setSelectedLvl={setSelectedLvl}
            setSelectedFamilyMember={setSelectedFamilyMember}
            setIsEditMode={setIsEditMode}
          />
        </g>
      ))
    : null;
  const treeLvls = grid
    ? rows.map((el, index) => (
        <rect
          key={index + 'row'}
          x={-10000}
          y={(+el[0] + rows.length / 2) * CONSTS.ROWHEIGHT}
          width={20000}
          height={CONSTS.ROWHEIGHT}
          fill={'white'}
          opacity={0.2}
          stroke={'white'}
        />
      ))
    : null;
  const xd = 0;
  const PartnersRelations = findAllRelations(lists, CONSTS.PARTNER);
  const PartnersLines = PartnersRelations.map(([fromId, toId]) => {
    const from = nodes[fromId].position;
    const to = nodes[[toId]].position;

    return (
      <line
        key={fromId + toId + 'partnersLine'}
        className="partnerLine"
        x1={(from.column + from.shift) * CONSTS.XGAPS.ALONESIBLINGS + CONSTS.MEMBERWIDTH / 2}
        x2={(to.column + to.shift) * CONSTS.XGAPS.ALONESIBLINGS + CONSTS.MEMBERWIDTH / 2}
        y1={(from.row + 0.5 + rows.length / 2) * CONSTS.ROWHEIGHT}
        y2={(from.row + 0.5 + rows.length / 2) * CONSTS.ROWHEIGHT}
      />
    );
  });

  const parentRelations = findAllRelations(lists, CONSTS.PARENT);
  const parentLines = ParentLines(parentRelations, nodes, rows);
  const [offset, setOffset] = useState(1);
  const onScroll = (e) => {
    setOffset(Math.max(0.3, offset - e.deltaY / 1250));
  };
  const history = useHistory();
  const ref = useDraggable();
  return (
    <TreeWrapper height={treeLvls.length * CONSTS.ROWHEIGHT * 1.5} offset={offset} onWheel={onScroll}>
      <div className="menuButtons">
        <div className="dataButtons">
          <Button
            onClick={() => {
              setIsLoadMode(false);
              setIsInputModalActive(true);
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setIsLoadMode(true);
              setIsInputModalActive(true);
            }}
          >
            Load
          </Button>
        </div>
        <Button
          onClick={() => {
            signOut(auth)
              .then(() => {
                history.push('/');
              })
              .catch((error) => {});
          }}
        >
          Sign out
        </Button>
      </div>
      <svg height={CONSTS.ROWHEIGHT * 20} id="TreePanel">
        <g className="scroller">
          <g ref={ref}>
            {treeLvls}
            {PartnersLines}
            {/* {SiblingsLines} */}
            {parentLines}
            {elements}
          </g>
        </g>
      </svg>
      {isModalActive ? (
        <AddFamilyMemberModal
          selectedFamilyMember={selectedFamilyMember}
          selectedRow={selectedRow}
          hideModal={handleShowModal}
          editMode={editMode}
          {...props}
        />
      ) : null}
      {isInputModalActive ? <LoadFamilyTreeFormModal hideModal={handleShowLoadModal} isLoadMode={isLoadMode} /> : null}
    </TreeWrapper>
  );
};

export default TreePage;
function ParentLines(parentRelations, nodes, rows) {
  return parentRelations.map(([fromId, toId], index) => {
    const from = nodes[parentRelations[index][0]].position;
    const firstParentColum = nodes[toId[0]].position.column;
    const secondParentColumn = toId[1] ? nodes[toId[1]].position.column : firstParentColum;
    const column = (firstParentColum + secondParentColumn) / 2;
    const childCount = nodes[toId[0]].childCount * 4;
    const to = nodes[[fromId]].position;
    return (
      <g key={fromId + toId + 'parentLine'}>
        <line
          className="parentLine"
          x1={(column + from.shift) * CONSTS.XGAPS.ALONESIBLINGS + CONSTS.MEMBERWIDTH / 2}
          x2={(column + to.shift) * CONSTS.XGAPS.ALONESIBLINGS + CONSTS.MEMBERWIDTH / 2}
          y1={(from.row - 0.5 + rows.length / 2) * CONSTS.ROWHEIGHT}
          y2={(to.row + 0.24 + rows.length / 2) * CONSTS.ROWHEIGHT - childCount}
        />
        <line
          className="parentLine"
          x1={(from.column + from.shift) * CONSTS.XGAPS.ALONESIBLINGS + CONSTS.MEMBERWIDTH / 2}
          x2={(column + to.shift) * CONSTS.XGAPS.ALONESIBLINGS + CONSTS.MEMBERWIDTH / 2}
          y1={(to.row + 0.24 + rows.length / 2) * CONSTS.ROWHEIGHT - childCount}
          y2={(to.row + 0.24 + rows.length / 2) * CONSTS.ROWHEIGHT - childCount}
          stroke={`rgb(${150 + childCount * 2},150,${170 - childCount})`}
        />
        <line
          className="parentLine"
          x1={(from.column + from.shift) * CONSTS.XGAPS.ALONESIBLINGS + CONSTS.MEMBERWIDTH / 2}
          x2={(from.column + from.shift) * CONSTS.XGAPS.ALONESIBLINGS + CONSTS.MEMBERWIDTH / 2}
          y1={(to.row + 0.24 + rows.length / 2) * CONSTS.ROWHEIGHT - childCount}
          y2={(to.row + 0.3 + rows.length / 2) * CONSTS.ROWHEIGHT}
        />
      </g>
    );
  });
}

export const ParentLine = (PartnersRelations, nodes, rows) => {
  return PartnersRelations.map(([fromId, toId]) => {
    const from = nodes[fromId].position;
    const to = nodes[[toId]].position;

    return (
      <line
        key={fromId + toId + 'partnersLine'}
        className="partnerLine"
        x1={(from.column + from.shift) * CONSTS.XGAPS.ALONESIBLINGS + CONSTS.MEMBERWIDTH / 2}
        x2={(to.column + to.shift) * CONSTS.XGAPS.ALONESIBLINGS + CONSTS.MEMBERWIDTH / 2}
        y1={(from.row + 0.5 + rows.length / 2) * CONSTS.ROWHEIGHT}
        y2={(from.row + 0.5 + rows.length / 2) * CONSTS.ROWHEIGHT}
      />
    );
  });
};
