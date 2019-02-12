import React, {Component, ReactNode} from "react";
import {getCustomer} from "../../services/CustomerService";
import {CustomerDTO} from "../../services/dto/CustomerUpdateDto";
import {Redirect, RouteComponentProps} from "react-router";
import {Typography} from "@material-ui/core";
import {PrimaryButton} from "../../../lib/buttons/PrimaryButton";
import {CustomerView} from "../../components/view/CustomerView";
import * as mappers from "../../services/CustomerMappers";
import {CustomerFormStateValue} from "../update/CustomerUpdatePage";

export interface CustomerViewPageProps extends RouteComponentProps<CustomerViewRouteParams>{
}

interface CustomerViewRouteParams {
  id: string;
}

interface CustomerViewPageState {
  value: Partial<CustomerFormStateValue>;
  redirectToEdit: boolean;
}

const INITIAL_STATE: CustomerViewPageState = {
  value: {
    firstName: '',
    lastName: '',
    birthDate: null,
    address: ''
  },
  redirectToEdit: false
};

export class CustomerViewPage extends Component<CustomerViewPageProps, CustomerViewPageState> {

  editClickHandler = () => {
    this.setState({ redirectToEdit: true });
  };

  constructor(props: any) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount(): void {
    this.loadExistingState();
  }

  render(): ReactNode {
    if (this.state.redirectToEdit) {
      return <Redirect to={`/customer/edit/${this.props.match.params.id}`}/>;
    }

    return (
      <div>
        <Typography variant="headline">Customer</Typography>
        <CustomerView customer={this.state.value}/>
        <PrimaryButton onClick={this.editClickHandler}>Edit</PrimaryButton>
      </div>
    );
  }

  private loadExistingState() {
    getCustomer(this.props.match.params.id)
      .then((customer: Partial<CustomerDTO>) => {
        this.setState({
          value: mappers.customerDtoToFormState(customer)
        })
      })
      .catch((error) => console.error(error));
  }
}