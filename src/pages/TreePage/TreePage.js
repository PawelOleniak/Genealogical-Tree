import React, { useState } from 'react';

import { Button } from 'components';
import { TreeWrapper } from './TreePageCss';
import { CONSTS } from 'data/constants';
import { AddFamilyMemberModal } from './Components';

const node = { id: '', lvl: 0, name: 'p', surename: 'o' };
const edge = { from: 0, to: 1, type: CONSTS.SON };
const TreePage = () => {
  const [nodes, setNodes] = useState([node]);
  const [edges, setEdges] = useState([edge]);
  const [isModalActive, setIsModalActive] = useState(false);
  const handleShowModal = () => setIsModalActive(!isModalActive);
  const data = { nodes, edges };

  const addNode = (newNode) => {
    setNodes([...nodes, newNode ? newNode : node]);
  };
  const addEdge = (newEdge) => {
    setEdges([...edges, newEdge ? newEdge : edge]);
  };

  return (
    <TreeWrapper>
      <Button onClick={() => addNode()}>add Node</Button>
      <Button onClick={() => addEdge()}>add Edge</Button>
      <Button onClick={handleShowModal}>add </Button>
      <div>{JSON.stringify(data, 0, 1)}</div>
      {isModalActive ? <AddFamilyMemberModal addNode={addNode} addEdge={addEdge} hideModal={handleShowModal} /> : null}
    </TreeWrapper>
  );
};

export default TreePage;
