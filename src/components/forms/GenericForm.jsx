//* Formik
import { Formik, Form } from 'formik';
//* React redux
import { useSelector } from 'react-redux';
//* Redux slices
import { selectIsSubmitting } from '../../features/user/userSlice';
//* Components
import Spinner from '../Spinner';

export default function CustomForm({
  children,
  initialValues,
  onSubmit,
  buttonText,
}) {
  //* Selectors
  const submitting = useSelector(selectIsSubmitting);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <>
          <Form className='form'>
            {children}
            <button
              type='submit'
              className={`${isSubmitting && 'button-disabled'} form-button`}
              disabled={submitting}
            >
              {submitting ? <Spinner /> : buttonText}
            </button>
          </Form>
        </>
      )}
    </Formik>
  );
}
