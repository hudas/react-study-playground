import React, { Component } from 'react';
import {Redirect, RouteComponentProps} from "react-router";
import {Typography} from "@material-ui/core";
import {PrimaryButton} from "../../lib/buttons/PrimaryButton";
import {
    CustomerGeneralDetailsForm,
    GeneralDetailsCustomerFormState
} from "./general-details-form/CustomerGeneralDetailsForm";
import {CustomerConsentFormState, CustomerConsentsForm} from "./consents-form/CustomerConsentsForm";
import axios from "axios";

interface CustomerFormRouteParams {
    id: string;
}

export type CustomerFormStateValue = GeneralDetailsCustomerFormState & CustomerConsentFormState;

export interface CustomerFormState {
  value: CustomerFormStateValue;
  created: boolean;
}

export class CustomerForm extends Component<RouteComponentProps<CustomerFormRouteParams>, CustomerFormState> {

  constructor(props: RouteComponentProps<CustomerFormRouteParams>) {
    super(props);
    this.state = {
      value: {
        firstName: '',
        lastName: '',
        birthDate: null,
        address: '',
        consents: {}
      },
      created: false
    }
  }

  submitHandler = (event: any) => {
    this.createCustomer();

    event.preventDefault();
  };

  changeHandler = (subFormValue: Partial<CustomerFormStateValue>) => {
    this.setState({
      value: {
        ...this.state.value,
        ...subFormValue
      }
    });
  };

  render(): React.ReactNode {
    const existingCustomer = !!this.props.match.params.id;

    const formlabel = existingCustomer ? (
      "Customer  " + this.props.match.params.id
    ) : (
      "New customer"
    );

    return (
      this.state.created ? (
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

  private createCustomer() {
    const formState = this.state.value;
    const consentsDTO = Object.keys(formState.consents || {})
      .map(key => ({
        id: key,
        allowed: formState.consents[key]
      }));

    const dto = { ...formState, consents: consentsDTO };

    axios.post("http://localhost:3000/api/customer", dto)
      .then(() => this.setState({created: true}))
      .catch((error) => console.error(error));
  }
}