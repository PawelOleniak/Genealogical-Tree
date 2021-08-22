import React, { useState } from 'react';
import { Button, Modal } from 'components';
import { FAMILYMEMBERS } from 'data/constants';
import { ButtonsGrid } from './AddFamilyMemberModalCss';
import { NewMemberForm } from 'pages/TreePage/Components';
import { capitalizeFirstLetter } from 'helpers';

const AddFamilyMemberModal = ({ addEdge, addNode, hideModal }) => {
  const [selectedFamilyMember, setSelectedFamilyMember] = useState(null);

  const Buttons = FAMILYMEMBERS.map((FamilyMember) => (
    <Button key={FamilyMember} onClick={() => setSelectedFamilyMember(FamilyMember)}>
      {capitalizeFirstLetter(FamilyMember)}
    </Button>
  ));

  const handleAddFamilyMember = (values) => {
    console.log(values);
    hideModal();
  };

  return (
    <Modal hideModal={hideModal}>
      <ButtonsGrid>{Buttons}</ButtonsGrid>
      {selectedFamilyMember ? <NewMemberForm onSubmit={handleAddFamilyMember} /> : null}
    </Modal>
  );
};

export default AddFamilyMemberModal;
