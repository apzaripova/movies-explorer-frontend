import React, { useCallback } from 'react';

export function useFormValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [validity, setValidity] = React.useState({});
  const [isFormValid, setIsFormValid] = React.useState(false);

  const handleChange = (event) => {
    const {target} = event;
    const {name} = target;
    const {value} = target;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setValidity({...validity, [name]: target.validity.valid })
    setIsFormValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsInputsValid = {}, newIsFormValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setValidity(newIsInputsValid);
      setIsFormValid(newIsFormValid);
    },
    [setValues, setErrors, setValidity, setIsFormValid]
  );

  return { values, setValues, handleChange, errors, validity, isFormValid, resetForm };
}