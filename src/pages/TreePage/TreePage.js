import React, { useReducer, useState } from 'react';

import { Button } from 'components';
import { TreeWrapper } from './TreePageCss';
import { CONSTS } from 'data/constants';
import { AddFamilyMemberModal } from './Components';

const initialNode = { id: '', lvl: 0, name: 'p', surename: 'o' };
const initialEdge = { from: 0, to: 1, type: CONSTS.SON };

const defaultNode = { id: 'test', lvl: 2, name: 'John', surename: 'o' };
const defaultEdge = { from: 1, to: 2, type: CONSTS.SON };

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const TreePage = ({ ...props }) => {
  const [nodes, setNodes] = useState([initialNode]);
  const [edges, setEdges] = useState([initialEdge]);
  const InitialData = { nodes, edges };

  const [data, dispatch] = useReducer(reducer, InitialData);

  const [isModalActive, setIsModalActive] = useState(false);
  const handleShowModal = () => setIsModalActive(!isModalActive);

  const addNode = (newNode) => {
    setNodes([...nodes, newNode ? newNode : defaultNode]);
  };
  const addEdge = (newEdge) => {
    setEdges([...edges, newEdge ? newEdge : defaultEdge]);
  };

  return (
    <TreeWrapper>
      <Button onClick={() => addNode()}>Add Node</Button>
      <Button onClick={() => addEdge()}>Add Edge</Button>
      <Button onClick={handleShowModal}>Add Family Member</Button>
      <div>{JSON.stringify(data, 0, 1)}</div>
      {isModalActive ? (
        <AddFamilyMemberModal addNode={addNode} addEdge={addEdge} hideModal={handleShowModal} {...props} />
      ) : null}
    </TreeWrapper>
  );
};

export default TreePage;
