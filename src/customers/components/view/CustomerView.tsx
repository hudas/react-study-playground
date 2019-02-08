import React, {Component, ReactNode} from 'react';
import {Redirect, RouteComponentProps} from "react-router";
import {
    CustomerGeneralDetailsForm,
    GeneralDetailsCustomerFormState
} from "../form/general-details-form/CustomerGeneralDetailsForm";
import {Typography} from "@material-ui/core";
import {PrimaryButton} from "../../../lib/buttons/PrimaryButton";
import {Link} from "react-router-dom";
import {getCustomer} from "../../services/CustomerService";
import {CustomerDTO} from "../../services/dto/CustomerUpdateDto";

export interface CustomerViewRouteParams {
    id: string;
}

interface CustomerViewState {
    details: GeneralDetailsCustomerFormState;
    redirectToEdit: boolean;
}

const INITIAL_STATE: CustomerViewState = {
  details: {
    firstName: '',
    lastName: '',
    birthDate: null,
    address: ''
  },
  redirectToEdit: false
};

export class CustomerView extends Component<RouteComponentProps<CustomerViewRouteParams>, CustomerViewState> {

  constructor(props: any) {
    super(props);
    this.state = INITIAL_STATE;
  }

  editClickHandler = () => {
    this.setState({
      redirectToEdit: true
    });
  };

  componentDidMount(): void {
    this.loadExistingState();
  }

  render(): ReactNode {
    return (
      <div>
        <Link to={`/customer/edit/${this.props.match.params.id}`}>Edit</Link>
        <Typography variant="headline">Customer</Typography>
        <CustomerGeneralDetailsForm value={this.state.details} disabled/>
        <PrimaryButton onClick={this.editClickHandler}>
          Edit
        </PrimaryButton>
        {this.state.redirectToEdit && <Redirect to={`/customer/edit/${this.props.match.params.id}`}/>}
      </div>
    );
  }

  private loadExistingState() {
    getCustomer(this.props.match.params.id)
      .then((customer: Partial<CustomerDTO>) => {
        this.setState({
          details: customer
        })
      })
      .catch((error) => console.error(error));
  }
}