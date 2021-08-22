import React from 'react';
import { Input } from 'components/InputTemplates';
import { Form, Field } from 'react-final-form';
import { Button } from 'components';
import { noop } from 'lodash';
const NewMemberForm = ({ onSubmit = noop }) => {
  return (
    <div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field description="Name" name="name" placeholder="name" component={Input} />
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
    </div>
  );
};

export default NewMemberForm;
