import React, { Component } from 'react';
import {RouteComponentProps} from "react-router";
import {Typography} from "@material-ui/core";
import {PrimaryButton} from "../../lib/buttons/PrimaryButton";
import {
    CustomerGeneralDetailsForm,
    GeneralDetailsCustomerFormState
} from "./general-details-form/CustomerGeneralDetailsForm";
import {CustomerConsentFormState, CustomerConsentsForm} from "./consents-form/CustomerConsentsForm";

interface CustomerFormRouteParams {
    id: string;
}

export interface CustomerFormState
  extends GeneralDetailsCustomerFormState, CustomerConsentFormState {

}

export class CustomerForm extends Component<RouteComponentProps<CustomerFormRouteParams>, CustomerFormState> {

    constructor(props: RouteComponentProps<CustomerFormRouteParams>) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            birthDate: null,
            address: '',
            consents: {}
        }
    }

    submitHandler = (event: any) => {
        console.log('Form submitted' + JSON.stringify(this.state));
        event.preventDefault();
    };

    changeHandler = (subFormValue: Partial<CustomerFormState>) => {
        this.setState({
            ...this.state,
            ...subFormValue
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
          <div>
              <Typography variant="headline" color="primary">
                  {formlabel}
              </Typography>
              <CustomerGeneralDetailsForm
                value={this.state}
                onChange={this.changeHandler}
              />
              <CustomerConsentsForm
                value={this.state}
                onChange={this.changeHandler}
              />

              <form
                noValidate
                onSubmit={this.submitHandler}
              >
                  <PrimaryButton type="submit">Submit</PrimaryButton>
              </form>
          </div>
        );
    }
}