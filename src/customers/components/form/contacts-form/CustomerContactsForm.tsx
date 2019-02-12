import {FormPanel} from "../../../../lib/panels/form-panel/FormPanel";
import {FormControl, FormHelperText, Input, InputLabel, TextField} from "@material-ui/core";
import {FormikErrors, FormikHandlers} from "formik";
import style from "./CustomerContactsForm.module.scss";
import React from "react";
import {ObjectSchema} from "yup";
import * as yup from "yup";


export interface CustomerContactsFormState {
  email: string;
  phone: string;
}

export interface CustomerContactsFormProps {
  value: CustomerContactsFormState
  handlers?: {
    handleChange?: FormikHandlers['handleChange'];
  };
  disabled?: boolean;
  errors?: FormikErrors<CustomerContactsFormState>;
  registerSchema?: (schema: ObjectSchema<CustomerContactsFormState>) => void;
}

export function CustomerContactForm({ disabled, errors, handlers, value, registerSchema }: CustomerContactsFormProps) {
  if (registerSchema) {
    const validationSchema: ObjectSchema<CustomerContactsFormState> = yup.object<CustomerContactsFormState>()
      .requiredOneOf('email', 'phone');

    registerSchema(validationSchema);
  }

  return (
    <FormPanel title="Contacts">
      <div className={style["form-container"]}>
        <FormControl
          error={errors && !!errors.email}
          className={style["email-field"]}
          margin="normal"
        >
          <InputLabel>Email</InputLabel>
          <Input
            name="email"
            value={value.email}
            disabled={disabled}
            onChange={handlers && handlers.handleChange}
          />
          <FormHelperText>{errors && errors.email}</FormHelperText>
        </FormControl>

        <FormControl
          className={style["phone-field"]}
          error={errors && !!errors.phone}
          margin="normal"
        >
          <InputLabel>Phone</InputLabel>
          <Input
            name="phone"
            value={value.phone}
            disabled={disabled}
            onChange={handlers && handlers.handleChange}
          />
          <FormHelperText>{errors && errors.phone}</FormHelperText>
        </FormControl>
      </div>
    </FormPanel>
  );
}