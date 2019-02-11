import {Component} from "react";
import {Moment} from "moment";
import React from "react";
import {FormPanel} from "../../../../lib/panels/form-panel/FormPanel";
import style from "./CustomerGeneralDetailsForm.module.scss";
import {TextField} from "@material-ui/core";
import {DatePicker} from "material-ui-pickers";
import {Field, FieldProps, FormikActions, FormikErrors, FormikHandlers, FormikProps} from "formik";

export interface GeneralDetailsCustomerFormState {
  firstName?: string;
  lastName?: string;
  birthDate?: Moment | null;
  address?: string;
}

export interface GeneralDetailsFormProps {
  value: GeneralDetailsCustomerFormState;
  errors?: FormikErrors<GeneralDetailsCustomerFormState>;
  handlers?: {
    handleChange?: FormikHandlers['handleChange'];
    handleBlur?: FormikHandlers['handleBlur'];
    setFieldValue?: FormikActions<GeneralDetailsCustomerFormState>['setFieldValue'];
  };
  disabled?: boolean;
}

export function CustomerGeneralDetailsForm({ value, disabled, handlers, errors }: GeneralDetailsFormProps) {
  // console.log('Errors');
  // console.log(errors);

  return (
    <FormPanel title="General details">
      { errors && errors.firstName }
      <div className={style["form-container"]}>
        <TextField
          name="firstName"
          label="First name"
          margin="normal"
          value={value.firstName}
          disabled={disabled}
          onChange={handlers && handlers.handleChange}
          onBlur={handlers && handlers.handleBlur}
          className={style["first-name-field"]}
        />

        <TextField
          label="Last name"
          name="lastName"
          margin="normal"
          value={value.lastName}
          disabled={disabled}
          onChange={handlers && handlers.handleChange}
          onBlur={handlers && handlers.handleBlur}
          className={style["last-name-field"]}
        />

        <TextField
          name="address"
          label="Address"
          margin="normal"
          value={value.address}
          disabled={disabled}
          onChange={handlers && handlers.handleChange}
          onBlur={handlers && handlers.handleBlur}
          className={style["address-field"]}
        />

        <DatePicker
          name="birthDate"
          label="Birth date"
          keyboard={false}
          value={value.birthDate}
          disabled={disabled}
          onChange={(date: Moment) => handlers && handlers.setFieldValue && handlers.setFieldValue('birthDate', date)}
          className={style["birthday-field"]}
        />
      </div>

    </FormPanel>
  );

}