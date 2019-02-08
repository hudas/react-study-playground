import React, { Component } from 'react';
import {Redirect, RouteComponentProps} from "react-router";
import {Typography} from "@material-ui/core";
import {PrimaryButton} from "../../lib/buttons/PrimaryButton";
import {
    CustomerGeneralDetailsForm,
    GeneralDetailsCustomerFormState
} from "./general-details-form/CustomerGeneralDetailsForm";
import {ConsentSelection, CustomerConsentFormState, CustomerConsentsForm} from "./consents-form/CustomerConsentsForm";
import axios, {AxiosResponse} from "axios";
import {Moment} from "moment";

interface CustomerFormRouteParams {
    id: string;
}

export type CustomerFormStateValue = GeneralDetailsCustomerFormState & CustomerConsentFormState;

export interface CustomerFormState {
  value: CustomerFormStateValue;
  updated: boolean;
}

interface CustomerDTO {
  firstName: string;
  lastName: string;
  birthDate: Moment | null;
  address: string;
  consents: ConsentDTO[];
}

interface ConsentDTO {
  id: string;
  allowed: boolean;
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
    const existing = this.existingCustomerId();
    if (existing) {
      axios.get<CustomerDTO>(`http://localhost:3000/api/customer/${existing}`)
        .then((response: AxiosResponse<CustomerDTO>) => {
          const loadedFormState: CustomerFormStateValue = {
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            birthDate: response.data.birthDate,
            address: response.data.address,
            consents: (response.data.consents || [])
              .reduce((acumulated: ConsentSelection, current: ConsentDTO) => {
                acumulated[current.id] = current.allowed
                  return acumulated
                },
                {})
          };

          this.updateState(loadedFormState);
        });
    }
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
    const dto: Partial<CustomerDTO> = this.formToDto();

    const update = existingId ? this.updateExisting(existingId, dto) : this.createNew(dto);

    update.then(() => this.setState({updated: true}))
      .catch((error) => console.error(error));
  }

  private createNew(dto: Partial<CustomerDTO>) {
    return axios.post("http://localhost:3000/api/customer", dto);
  }

  private updateExisting(customerId: string, dto: Partial<CustomerDTO>) {
    return axios.put(`http://localhost:3000/api/customer/${customerId}`, dto);
  }

  private formToDto(): Partial<CustomerDTO> {
    const formState = this.state.value;
    const consentsDTO = Object.keys(formState.consents || {})
      .map(key => ({
        id: key,
        allowed: formState.consents[key]
      }));

    return {...formState, consents: consentsDTO};
  }

  private updateState(subFormValue: Partial<CustomerFormStateValue>) {
    this.setState({
      value: {
        ...this.state.value,
        ...subFormValue
      }
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
      updated: false
    }
  }
}