import {FormPanel} from "../../../../lib/panels/form-panel/FormPanel";
import {TextField} from "@material-ui/core";
import {FormikErrors, FormikHandlers} from "formik";
import style from "./CustomerContactsForm.module.scss";
import React from "react";

export interface CustomerContactsFormState {
  email: string;
  phone: string;
}

export interface CustomerContactsFormProps {
  value: CustomerContactsFormState;
  handlers?: {
    handleChange?: FormikHandlers['handleChange'];
  };
  disabled?: boolean;
  errors?: FormikErrors<CustomerContactsFormState>;
}

export function CustomerContactForm({ disabled, errors, handlers, value }: CustomerContactsFormProps) {
  return (
    <FormPanel title="Contacts">
      <span>{ errors && errors.email }</span>
      <span>{ errors && errors.phone }</span>

      <div className={style["form-container"]}>
        <TextField
          name="email"
          label="Email"
          margin="normal"
          value={value.email}
          disabled={disabled}
          onChange={handlers && handlers.handleChange}
          className={style["email-field"]}
        />

        <TextField
          name="phone"
          label="Phone"
          margin="normal"
          value={value.phone}
          disabled={disabled}
          onChange={handlers && handlers.handleChange}
          className={style["phone-field"]}
        />
      </div>
    </FormPanel>
  );
}