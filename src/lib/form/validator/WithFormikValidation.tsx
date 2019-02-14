import React, {Component, ComponentType} from "react";
import {ObjectSchema, ValidateOptions, ValidationError} from "yup";
import * as yup from "yup";
import {FormikErrors} from "formik";
import * as mappers from "./mappers/ObjectValidationMapper";
import {FormProps} from "../FormProps";


export interface ValidatedFormProps<T> extends FormProps<T> {
  validator: (value: T) => Promise<FormikErrors<T>>;
  validationRegistrar: (schema: ObjectSchema<Partial<T>>) => void;
}

export function withFormikValidation<T>(WrappedComponent: ComponentType<ValidatedFormProps<T>>) {

  return class extends Component<FormProps<T>> {

    validationSchema: ObjectSchema<Partial<T>> = yup.object<Partial<T>>();

    validationSchemaRegistrar = (schema: ObjectSchema<Partial<T>>) => {
      this.appendSchema(schema);
    };

    validationHandler = (value: T): Promise<FormikErrors<T>> => {
      return this.validateFormValue(value)
        .then((validation: FormikErrors<T>) => {
          // Pretty strange API :)
          // In case of sync validation => you have to return errors
          // In case of async validation => you have to throw errors
          throw validation;
        });
    };

    render(): React.ReactNode {
      return <WrappedComponent
        {...this.props}
        validator={this.validationHandler}
        validationRegistrar={this.validationSchemaRegistrar}
      />;
    }

    private appendSchema(subFormSchema: ObjectSchema<Partial<T>>) {
      this.validationSchema = this.validationSchema.concat(subFormSchema);
    }

    private validateFormValue(value: T): Promise<FormikErrors<T>> {
      const validationOptions: ValidateOptions = {abortEarly: false, recursive: true};

      return this.validationSchema.validate(value, validationOptions)
        .then(() => Promise.resolve({}))
        .catch((error: ValidationError) => {
          return Promise.resolve(mappers.objectValidationsToFormikErrors<T>(error));
        });
    }
  }
}