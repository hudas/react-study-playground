import React, { Component } from 'react';
import {Redirect, RouteComponentProps} from "react-router";
import {Typography} from "@material-ui/core";
import {PrimaryButton} from "../../../lib/buttons/PrimaryButton";
import {
    CustomerGeneralDetailsForm,
    GeneralDetailsCustomerFormState
} from "./general-details-form/CustomerGeneralDetailsForm";
import {CustomerConsentFormState, CustomerConsentsForm} from "./consents-form/CustomerConsentsForm";
import {CustomerDTO} from "../../services/dto/CustomerUpdateDto";

import * as mappers from "../../services/CustomerMappers";
import * as service from "../../services/CustomerService";

interface CustomerFormRouteParams {
    id: string;
}

export type CustomerFormStateValue = GeneralDetailsCustomerFormState & CustomerConsentFormState;

export interface CustomerFormState {
  value: CustomerFormStateValue;
  updated: boolean;
}

export class CustomerForm extends Component<RouteComponentProps<CustomerFormRouteParams>, CustomerFormState> {

  constructor(props: RouteComponentProps<CustomerFormRouteParams>) {
    super(props);
    this.initFormState();
  }

  submitHandler = (event: any) => {
    this.updateCustomer();
    event.preventDefault();
  };

  changeHandler = (subFormValue: Partial<CustomerFormStateValue>) => {
    this.updateState(subFormValue);
  };

  componentDidMount(): void {
    this.loadExistingState();
  }

  render(): React.ReactNode {
    const formlabel = this.existingCustomerId() ? (
      "Customer  " + this.props.match.params.id
    ) : (
      "New customer"
    );

    return (
      this.state.updated ? (
        <Redirect to="/customer/list"/>
        ) : (
        <div>
          <Typography variant="headline" color="primary">
            {formlabel}
          </Typography>
          <CustomerGeneralDetailsForm
            value={this.state.value}
            onChange={this.changeHandler}
          />
          <CustomerConsentsForm
            value={this.state.value}
            onChange={this.changeHandler}
          />

          <form
            noValidate
            onSubmit={this.submitHandler}
          >
            <PrimaryButton type="submit">Submit</PrimaryButton>
          </form>
        </div>
      )
    );
  }

  private existingCustomerId() {
    return this.props.match.params.id;
  }

  private updateCustomer() {
    const existingId = this.existingCustomerId();
    const dto: Partial<CustomerDTO> = mappers.customerFormStateToDto(this.state.value);

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

  private loadExistingState() {
    const existing = this.existingCustomerId();

    if (existing) {
      service.getCustomer(existing)
        .then((customerDto: Partial<CustomerDTO>) => {
          const loadedFormState = mappers.customerDtoToFormState(customerDto);
          this.updateState(loadedFormState);
        });
    }
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
      updated: false
    }
  }
}