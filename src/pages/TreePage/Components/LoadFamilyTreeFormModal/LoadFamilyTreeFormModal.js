import { Button, Input, Modal } from 'components';
import { loadUserData, setUserData } from 'helpers/saveState';
import { noop } from 'lodash';
import React from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { loadToState } from 'reducers';

const LoadFamilyTreeFormModal = ({ hideModal, isLoadMode }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.membersSlice);
  const onSubmit = (values) => {
    if (isLoadMode) loadUserData(values.family).then((res) => dispatch(loadToState(res)));
    else setUserData(state, values.family);
    hideModal();
  };
  return (
    <Modal hideModal={hideModal}>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field description="Family Name" name="family" placeholder="Family" component={Input} />
            <div className="buttons">
              <Button
                type="button"
                variant={'inline'}
                style={{ marginRight: '30px' }}
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </Button>
              <Button type="submit" variant={'inline'} primary disabled={submitting}>
                Submit
              </Button>
            </div>
          </form>
        )}
      />
    </Modal>
  );
};

export default LoadFamilyTreeFormModal;
