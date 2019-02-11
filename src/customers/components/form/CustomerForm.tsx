import React, { Component } from 'react';
import {Redirect, RouteComponentProps} from "react-router";
import {Typography} from "@material-ui/core";
import {PrimaryButton} from "../../../lib/buttons/PrimaryButton";
import {
    CustomerGeneralDetailsForm,
    GeneralDetailsCustomerFormState
} from "./general-details-form/CustomerGeneralDetailsForm";
import {ConsentSelection, CustomerConsentFormState, CustomerConsentsField} from "./consents-form/CustomerConsentsField";
import {CustomerDTO} from "../../services/dto/CustomerUpdateDto";

import * as mappers from "../../services/CustomerMappers";
import * as service from "../../services/CustomerService";
import {Field, FieldProps, Formik, FormikErrors, FormikProps} from "formik";
import * as yup from 'yup';
import {ValidationError} from "yup";
import moment from "moment";
import {CustomerContactForm, CustomerContactsFormState} from "./contacts-form/CustomerContactsForm";


interface CustomerFormRouteParams {
    id: string;
}

export type CustomerFormStateValue = GeneralDetailsCustomerFormState & CustomerContactsFormState & CustomerConsentFormState;

export interface CustomerFormState {
  value: CustomerFormStateValue;
  updated: boolean;
  loaded: boolean;
}

export class CustomerForm extends Component<RouteComponentProps<CustomerFormRouteParams>, CustomerFormState> {

  constructor(props: RouteComponentProps<CustomerFormRouteParams>) {
    super(props);
    this.initFormState();
  }

  validationHandler = (value: CustomerFormStateValue): Promise<FormikErrors<CustomerFormStateValue>> => {
    let schema = yup.object<Partial<CustomerFormStateValue>>({
      firstName: yup.string()
        .required(),
      lastName: yup.string()
        .required(),
      address: yup.string()
        .required(),
      birthDate: yup.mixed()
        .inRange(moment('2000-01-01'), moment('2018-01-01'))
        .required(),
      consents: yup.mixed()
        .someConsentsSelected()
    }).requiredOneOf('email', 'phone');

    return schema.validate(value, {abortEarly: false, recursive: true})
      .then((it: any) => Promise.resolve({}))
      .catch((error: ValidationError) => {
        console.log(error);
        const validationErrors: FormikErrors<CustomerFormStateValue> =
          error.inner.reduce((accumulator: FormikErrors<CustomerFormStateValue>, current: ValidationError) => {
              return {...accumulator, [current.path]: current.message}
            },
            {}
          );

        return Promise.resolve(validationErrors);
      })
      .then((validation: FormikErrors<CustomerFormStateValue>) => {
        // Pretty strange API :)
        // In case of sync validation => you have to return errors
        // In case of async validation => you have to throw errors
        throw validation;
      });

  };

  submitHandler = (value: CustomerFormStateValue) => {
    this.updateCustomer(value);
  };

  componentWillMount(): void {
    this.loadExistingState();
  }

  render(): React.ReactNode {
    if (!this.state.loaded) {
      return null;
    }

    if (this.state.updated) {
      return <Redirect to="/customer/list"/>
    }

    const formlabel = this.existingCustomerId() ? (
      "Customer  " + this.props.match.params.id
    ) : (
      "New customer"
    );

    return (
      <div>
        <Typography variant="headline" color="primary">
          {formlabel}
        </Typography>
        <Formik
          initialValues={this.state.value}
          validate={this.validationHandler}
          onSubmit={this.submitHandler}
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
                />
                <CustomerContactForm
                  value={values}
                  errors={errors}
                  handlers={{
                    handleChange
                  }}
                />
                <Field
                  name="consents"
                  render={({ field }: FieldProps) => {

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
      </div>
    );
  }

  private existingCustomerId() {
    return this.props.match.params.id;
  }

  private updateCustomer(formState: CustomerFormStateValue) {
    const existingId = this.existingCustomerId();
    const dto: Partial<CustomerDTO> = mappers.customerFormStateToDto(formState);

    const update = existingId ? service.updateCustomer(existingId, dto) : service.createCustomer(dto);

    update.then(() => this.setState({updated: true}))
      .catch((error) => console.error(error));
  }

  private updateState(subFormValue: Partial<CustomerFormStateValue>) {
    this.setState({
      value: {
        ...this.state.value,
        ...subFormValue
      }
    });
  }

  private markStateLoaded() {
    this.setState({
      loaded: true
    });
  }

  private loadExistingState() {
    const existing = this.existingCustomerId();

    if (!existing) {
      this.markStateLoaded();
      return;
    }

    service.getCustomer(existing)
      .then((customerDto: Partial<CustomerDTO>) => {
        const loadedFormState = mappers.customerDtoToFormState(customerDto);
        this.updateState(loadedFormState);
        this.markStateLoaded();
      });
  }

  private initFormState() {
    this.state = {
      value: {
        firstName: '',
        lastName: '',
        birthDate: null,
        address: '',
        phone: '',
        email: '',
        consents: {}
      },
      updated: false,
      loaded: false
    }
  }
}