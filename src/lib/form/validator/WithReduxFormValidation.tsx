import React, {Component, ComponentType} from "react";
import {ObjectSchema, ValidateOptions, ValidationError} from "yup";
import * as yup from "yup";
import {FormProps} from "../FormProps";
import {FormErrors} from "redux-form";


export interface ValidatedReduxFormProps<T extends object> {
  validate: (value: T) => FormErrors<T>;
  validationRegistrar: (schema: ObjectSchema<T>) => void;
}

export interface ValidatedReduxFormSectionProps<T extends object> {
  registerSchema?: (schema: ObjectSchema<T>) => void;
}

export function withReduxFormValidation<T extends object>(WrappedComponent: ComponentType<ValidatedReduxFormProps<T> & any>) {

  return class extends Component<FormProps<T>> {

    validationSchema: ObjectSchema<Partial<T>> = yup.object<Partial<T>>();

    validationSchemaRegistrar = (schema: ObjectSchema<Partial<T>>) => {
      this.appendSchema(schema);
    };

    validationHandler = (value: T): FormErrors<T> => {
      return this.validateFormValue(value);
    };

    render(): React.ReactNode {
      return <WrappedComponent
        {...this.props}
        validate={this.validationHandler}
        validationRegistrar={this.validationSchemaRegistrar}
      />;
    }

    private appendSchema(subFormSchema: ObjectSchema<Partial<T>>) {
      this.validationSchema = this.validationSchema.concat(subFormSchema);
    }

    private validateFormValue(value: T): FormErrors<T> {
      const validationOptions: ValidateOptions = {abortEarly: false, recursive: true};

      try {
        this.validationSchema.validateSync(value, validationOptions)
        return {}
      } catch (error) {
        return this.objectValidationsToReduxFormErrors<T>(error);
      }
    }

    private objectValidationsToReduxFormErrors<T>(error: ValidationError): FormErrors<T> {
      console.log(error);
      return error.inner.reduce((accumulator: FormErrors<T>, { path, message }: ValidationError) => {
          return {
            ...accumulator,
            [path]: message
          }
        },
        {}
      );
    }


  }
}