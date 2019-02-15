import {Moment} from "moment";
import React from "react";
import {FormPanel} from "../../../../lib/panels/form-panel/FormPanel";
import style from "./CustomerGeneralDetailsForm.module.scss";
import {FormControl, FormHelperText, Input, InputLabel, TextField} from "@material-ui/core";
import {DatePicker} from "material-ui-pickers";
import {FormikActions, FormikErrors, FormikHandlers} from "formik";
import * as yup from "yup";
import {ObjectSchema} from "yup";
import moment from "moment";

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
  registerSchema?: (schema: ObjectSchema<GeneralDetailsCustomerFormState>) => void;
}

export function CustomerGeneralDetailsForm({ value, disabled, handlers, errors, registerSchema }: GeneralDetailsFormProps) {
  if (registerSchema) {
    const generalDetailsFormSchema: ObjectSchema<GeneralDetailsCustomerFormState> = yup.object<Partial<GeneralDetailsCustomerFormState>>({
      firstName: yup.string()
        .required(),
      lastName: yup.string()
        .required(),
      address: yup.string()
        .required(),
      birthDate: yup.mixed()
        .inRange(moment('2000-01-01'), moment('2018-01-01'))
        .required()
    });

    registerSchema(generalDetailsFormSchema);
  }

  return (
    <FormPanel title="General details">

      <div className={style["form-container"]}>

        <FormControl
          className={style["first-name-field"]}
          error={errors && !!errors.firstName}
          margin={"normal"}
        >
          <InputLabel>First name</InputLabel>
          <Input
            name="firstName"
            value={value.firstName}
            disabled={disabled}
            onChange={handlers && handlers.handleChange}
            onBlur={handlers && handlers.handleBlur}
            aria-describedby="component-error-text"
          />

          <FormHelperText>{errors && errors.firstName}</FormHelperText>
        </FormControl>

        <FormControl
          className={style["last-name-field"]}
          error={errors && !!errors.lastName}
          margin={"normal"}
        >
          <InputLabel>Last name</InputLabel>
          <Input
            name="lastName"
            value={value.lastName}
            disabled={disabled}
            onChange={handlers && handlers.handleChange}
            onBlur={handlers && handlers.handleBlur}
          />
          <FormHelperText>{errors && errors.lastName}</FormHelperText>
        </FormControl>

        <FormControl
          className={style["address-field"]}
          error={errors && !!errors.address}
          margin={"normal"}
        >
          <InputLabel>Address</InputLabel>
          <Input
            name="address"
            value={value.address}
            disabled={disabled}
            onChange={handlers && handlers.handleChange}
            onBlur={handlers && handlers.handleBlur}
          />
          <FormHelperText>{ errors && errors.address }</FormHelperText>
        </FormControl>

        <FormControl
          className={style["birthday-field"]}
          error={errors && !!errors.birthDate}
          margin={"normal"}
        >
          <DatePicker
            name="birthDate"
            label="Birth date"
            keyboard={false}
            value={value.birthDate}
            disabled={disabled}
            onChange={(date: Moment) => handlers && handlers.setFieldValue && handlers.setFieldValue('birthDate', date)}
            error={errors && !!errors.birthDate}
          />
          <FormHelperText>{ errors && errors.birthDate }</FormHelperText>
        </FormControl>

      </div>
    </FormPanel>
  );
}