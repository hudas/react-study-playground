import React, {Component, ReactNode} from 'react';
import {Redirect, RouteComponentProps} from "react-router";
import axios, {AxiosResponse} from "axios";
import {
    CustomerGeneralDetailsForm,
    GeneralDetailsCustomerFormState
} from "../form/general-details-form/CustomerGeneralDetailsForm";
import {Typography} from "@material-ui/core";
import {PrimaryButton} from "../../lib/buttons/PrimaryButton";
import {Link} from "react-router-dom";

interface CustomerViewRouteParams {
    id: string;
}

interface CustomerViewState {
    details: GeneralDetailsCustomerFormState;
    redirectToEdit: boolean;
}

export class CustomerView extends Component<RouteComponentProps<CustomerViewRouteParams>, CustomerViewState> {

    constructor(props: any) {
        super(props);
        this.initViewState();
    }

    editClickHandler = () => {
        this.setState({
            redirectToEdit: true
        });
    };

    componentDidMount(): void {
        axios.get<GeneralDetailsCustomerFormState>(`http://localhost:3000/api/customer/${this.props.match.params.id}`)
          .then((response: AxiosResponse<GeneralDetailsCustomerFormState>) => {
              this.setState({
                  details: response.data
              })
          })
          .catch((error) => console.error(error));
    }

    render(): ReactNode {
        return (
          <div>
              <Link to={`/customer/edit/${this.props.match.params.id}`}>Edit</Link>
              <Typography variant="headline">Customer</Typography>
              <CustomerGeneralDetailsForm value={this.state.details} disabled={true}/>
              <PrimaryButton onClick={this.editClickHandler}>
                  Edit
              </PrimaryButton>
              {this.state.redirectToEdit && <Redirect to={`/customer/edit/${this.props.match.params.id}`}/>}
          </div>
        );
    }

    private initViewState() {
        this.state = {
            details: {
                firstName: '',
                lastName: '',
                birthDate: null,
                address: ''
            },
            redirectToEdit: false
        }
    }
}