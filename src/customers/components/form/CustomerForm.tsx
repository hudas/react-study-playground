import React from 'react';
import {PrimaryButton} from "../../../lib/buttons/PrimaryButton";
import {
    CustomerGeneralDetailsForm,
} from "./general-details-form/CustomerGeneralDetailsForm";
import {ConsentSelection, CustomerConsentsField} from "./consents-form/CustomerConsentsField";
import {Field, FieldProps, Formik, FormikProps} from "formik";
import {CustomerContactForm} from "./contacts-form/CustomerContactsForm";
import {CustomerFormStateValue} from "../../pages/update/CustomerUpdatePage";
import {ValidatedFormProps} from "../../../lib/form/validator/WithValidation";
import * as yup from "yup";

export type CustomerFormProps = ValidatedFormProps<CustomerFormStateValue>;

export function CustomerForm({ value, onSubmit, validator, validationRegistrar }: CustomerFormProps) {
  validationRegistrar(
    yup.object({
      consents: yup.mixed().someConsentsSelected()
    })
  );

  return (
    <Formik
      initialValues={value}
      validate={validator}
      onSubmit={onSubmit}
      render={
        ({values, handleSubmit, handleChange, setFieldValue, handleBlur, errors}: FormikProps<CustomerFormStateValue>) => {

          return (
            <form noValidate onSubmit={handleSubmit}>
              <CustomerGeneralDetailsForm
                value={values}
                errors={errors}
                handlers={{
                  handleChange,
                  handleBlur: handleBlur,
                  setFieldValue: setFieldValue
                }}
                registerSchema={validationRegistrar}
              />
              <CustomerContactForm
                value={values}
                errors={errors}
                handlers={{
                  handleChange
                }}
                registerSchema={validationRegistrar}
              />
              <Field
                name="consents"
                render={({field}: FieldProps) => {

                  return (
                    <CustomerConsentsField
                      value={field.value}
                      error={errors}
                      onChange={(value: ConsentSelection) => setFieldValue(field.name, value)}
                    />
                  );
                }}
              />

              <PrimaryButton type="submit">Submit</PrimaryButton>
            </form>
          )
        }}
    />
  );
}