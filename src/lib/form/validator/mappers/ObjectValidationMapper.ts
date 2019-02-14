import {ValidationError} from "yup";
import {FormikErrors} from "formik";

export function objectValidationsToFormikErrors<T>(error: ValidationError): FormikErrors<T> {

  return error.inner.reduce((accumulator: FormikErrors<T>, { path, message }: ValidationError) => {
      return {
        ...accumulator,
        [path]: message
      }
    },
    {}
  );
}

