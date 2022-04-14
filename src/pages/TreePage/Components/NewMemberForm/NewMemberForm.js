import React, { useState } from 'react';
import { Input } from 'components/InputTemplates';
import { Form, Field } from 'react-final-form';
import { Button } from 'components';
import { noop } from 'lodash';
import Toggle from 'react-toggle';
import { FormWrapper } from './NewMemberFormCss';
import MaleIcon from 'utils/male.svg';
import FemaleIcon from 'utils/female.svg';
import { CONSTS } from 'data/constants';

const MyToggle = ({ input, meta, name, isMale, handleGenderChange, values, ...rest }) => {
  return (
    <label>
      <Toggle
        {...input}
        rest={rest}
        name={name}
        checked={isMale}
        value="yes"
        icons={{
          checked: <img width={19} src={MaleIcon} alt="React Logo" />,
          unchecked: <img width={19} src={FemaleIcon} alt="React Logo" />,
        }}
        onChange={handleGenderChange}
      />
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </label>
  );
};
const NewMemberForm = ({ onSubmit = noop }) => {
  const [isMale, setIsMale] = useState(true);
  const handleGenderChange = () => {
    setIsMale(!isMale);
  };
  return (
    <FormWrapper>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => {
          values.gender = isMale ? CONSTS.MALE : CONSTS.FEMALE;
          return (
            <form onSubmit={handleSubmit}>
              <Field description="Name" name="name" placeholder="name" component={Input} />
              <Field description="Date of Birth" name="birthDate" fieldType="date" component={Input} />
              <Field description="Date of Death" name="deathDate" fieldType="date" component={Input} />
              <div className="genderToggle">
                <span>Gender</span>

                <Field
                  description="gender"
                  name="gender"
                  isMale={isMale}
                  values={values}
                  handleGenderChange={handleGenderChange}
                  component={MyToggle}
                />
              </div>
              <div className="buttons">
                <Button
                  type="button"
                  style={{ marginRight: '30px' }}
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </Button>
                <Button type="submit" primary disabled={submitting}>
                  Submit
                </Button>
              </div>
            </form>
          );
        }}
      />
    </FormWrapper>
  );
};

export default NewMemberForm;
