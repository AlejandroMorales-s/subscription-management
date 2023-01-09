import { useState } from 'react';
//* Formik
import { Field } from 'formik';
//* Icons
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Input({
  type,
  name,
  placeholder,
  label,
  className = '',
}) {
  //* States
  const [isVisible, setIsVisible] = useState(false);

  let typeHandler = 'password';

  if (isVisible) typeHandler = 'text';
  else typeHandler = 'password';

  return (
    <div className='input-form-container'>
      <label>{label}</label>

      <Field
        className={className}
        type={type === 'password' ? typeHandler : type}
        name={name}
        placeholder={placeholder}
      />
      {isVisible && type === 'password' && (
        <AiOutlineEyeInvisible
          className='password-icon'
          onClick={() => setIsVisible(!isVisible)}
        />
      )}
      {!isVisible && type === 'password' && (
        <AiOutlineEye
          className='password-icon'
          onClick={() => setIsVisible(!isVisible)}
        />
      )}
    </div>
  );
}
