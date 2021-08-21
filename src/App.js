import React, { useState } from 'react';
import { Button } from './components';
const node = { id: '', lvl: 0, name: 'p', surename: 'o' };
const edge = { from: 0, to: 1, type: 'son' };
function App() {
  const [nodes, setNodes] = useState([node]);
  const [edges, setEdges] = useState([edge]);
  const data = { nodes, edges };

  const addNode = () => {
    setNodes([...nodes, node]);
  };
  const addEdge = () => {
    setEdges([...edges, edge]);
  };
  return (
    <div className="App">
      <Button onClick={addNode}>add Node</Button>
      <Button onClick={addEdge}>add Edge</Button>
      {JSON.stringify(data, 0, 1)}
    </div>
  );
}

export default App;
