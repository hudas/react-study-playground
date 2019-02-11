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
import {Field, FieldProps, Formik, FormikActions, FormikProps} from "formik";

interface CustomerFormRouteParams {
    id: string;
}

export type CustomerFormStateValue = GeneralDetailsCustomerFormState & CustomerConsentFormState;

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
          onSubmit={this.submitHandler}
          render={({values, handleSubmit, handleChange, setFieldValue, handleBlur}: FormikProps<GeneralDetailsCustomerFormState>) => (
            <form noValidate onSubmit={handleSubmit}>
              <CustomerGeneralDetailsForm
                value={values}
                handlers={{
                  handleChange: (event: any) => {
                    handleChange(event)
                  }, handleBlur, setFieldValue
                }}
              />
              <Field
                name="consents"
                render={({ field, form }: FieldProps) => {

                  return (
                    <CustomerConsentsField
                      value={field.value}
                      onChange={(value: ConsentSelection) => setFieldValue(field.name, value)}
                    />
                  );
                }}
              />

              <PrimaryButton type="submit">Submit</PrimaryButton>
            </form>
          )}
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
        consents: {}
      },
      updated: false,
      loaded: false
    }
  }
}