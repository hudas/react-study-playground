import React, {Component, ComponentType} from "react";
import {ObjectSchema, ValidateOptions, ValidationError} from "yup";
import * as yup from "yup";
import {FormErrors} from "redux-form";
import deepmerge from "deepmerge";


export interface ValidatedReduxFormProps<T extends object> {
  validate: (value: T) => FormErrors<T>;
  validationRegistrar: (schema: ObjectSchema<T>) => void;
}

export interface ValidatedReduxFormSectionProps<T extends object> {
  registerSchema?: (schema: ObjectSchema<T>) => void;
}

export function withReduxFormValidation<T extends object>(WrappedComponent: ComponentType<any>) {
  return class extends Component<any> {

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
      const allFieldErrors = error.inner;
      return allFieldErrors.reduce((mergedErrorObject: FormErrors<T>, currentError: ValidationError) =>
        deepmerge(mergedErrorObject, this.mapToNestedErrorObject(currentError)),
        {}
      );
    }

    private mapToNestedErrorObject({path, message}: ValidationError) {
      return path.split('.').reverse()
        .reduce((nestedError: any, current: string) => {
            if (!nestedError) {
              return {
                [current]: message
              }
            }

            return {
              [current]: nestedError
            }
          },
          undefined
        );
    }
  }
}