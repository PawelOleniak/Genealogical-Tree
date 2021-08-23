import React, { useState } from 'react';
import { Button, Modal } from 'components';
import { FAMILYMEMBERS } from 'data/constants';
import { ButtonsGrid } from './AddFamilyMemberModalCss';
import { NewMemberForm } from 'pages/TreePage/Components';
import { capitalizeFirstLetter } from 'helpers';

const AddFamilyMemberModal = ({ addEdge, addNode, hideModal, ...props }) => {
  const [selectedFamilyMember, setSelectedFamilyMember] = useState(null);

  const Buttons = FAMILYMEMBERS.map((FamilyMember) => (
    <Button key={FamilyMember} onClick={() => setSelectedFamilyMember(FamilyMember)}>
      {capitalizeFirstLetter(FamilyMember)}
    </Button>
  ));

  const handleAddFamilyMember = (values) => {
    addNode({ id: '', lvl: '0', name: values.name, surename: 'o' });
    hideModal();
  };

  return (
    <Modal hideModal={hideModal} {...props}>
      <ButtonsGrid>{Buttons}</ButtonsGrid>
      {selectedFamilyMember ? <NewMemberForm onSubmit={handleAddFamilyMember} /> : null}
    </Modal>
  );
};

export default AddFamilyMemberModal;
