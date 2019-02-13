import React, {Component} from "react";
import {
  GeneralDetailsCustomerFormState
} from "../../components/form/general-details-form/CustomerGeneralDetailsForm";
import {CustomerContactsFormState} from "../../components/form/contacts-form/CustomerContactsForm";
import {
  CustomerConsentFormState,
} from "../../components/form/consents-form/CustomerConsentsField";
import {Redirect, RouteComponentProps} from "react-router";
import {Typography} from "@material-ui/core";
import {CustomerDTO} from "../../services/dto/CustomerUpdateDto";
import * as mappers from "../../services/CustomerMappers";
import * as service from "../../services/CustomerService";
import {CustomerForm} from "../../components/form/CustomerForm";
import {withValidation} from "../../../lib/form/validator/WithValidation";

export type CustomerUpdatePageProps = RouteComponentProps<CustomerUpdatePageRouteParams>;

interface CustomerUpdatePageRouteParams {
  id: string;
}

export type CustomerFormStateValue = GeneralDetailsCustomerFormState &
  CustomerContactsFormState &
  CustomerConsentFormState;

export interface CustomerFormState {
  value: CustomerFormStateValue;
  updated: boolean;
  loaded: boolean;
}

const INITIAL_STATE: CustomerFormState = {
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
};

export class CustomerUpdatePage extends Component<CustomerUpdatePageProps, CustomerFormState> {

  constructor(props: CustomerUpdatePageProps) {
    super(props);
    this.state = INITIAL_STATE;
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

    const ValidatedCustomerForm = withValidation(CustomerForm);
    return (
      <div>
        <Typography variant="headline" color="primary">
          {this.existingCustomerId() ? ("Customer  " + this.props.match.params.id) : ("New customer")}
        </Typography>
        <ValidatedCustomerForm
          value={this.state.value}
          onSubmit={this.submitHandler}
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

  private setLoadedState(subFormValue: Partial<CustomerFormStateValue>) {
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
        const loadedFormState = mappers.dtoToCustomer(customerDto);
        this.setLoadedState(loadedFormState);
        this.markStateLoaded();
      });
  }

}