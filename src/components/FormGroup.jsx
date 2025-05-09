import React from 'react';
import { Form as BootstrapForm } from 'react-bootstrap';

const FormGroup = ({ name, label, type = 'text', values, errors, touched, handleChange, handleBlur }) => (
  <BootstrapForm.Group className="mb-3">
    <BootstrapForm.Label>{label}</BootstrapForm.Label>
    <BootstrapForm.Control
      as={type === 'textarea' ? 'textarea' : 'input'}
      type={type}
      name={name}
      value={values[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      isInvalid={touched[name] && errors[name]}
    />
    <BootstrapForm.Control.Feedback type="invalid">
      {errors[name]}
    </BootstrapForm.Control.Feedback>
  </BootstrapForm.Group>
);

export default FormGroup;