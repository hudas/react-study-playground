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
import {CustomerForm} from "../../components/form/CustomerForm";
import {withValidation} from "../../../lib/form/validator/WithValidation";
import {AppState} from "../../../Store";
import {getCustomer, isCustomerUpdated} from "../../store/customer/CustomerSelectors";
import {connect} from "react-redux";
import {Customer} from "../../store/customer/CustomerState";
import {submitCustomer} from "../../store/customer/actions/SubmitCustomerActions";
import {prepareCustomerForm} from "../../store/customer/actions/PrepareCustomerFormAction";

export interface CustomerUpdatePageProps extends RouteComponentProps<CustomerUpdatePageRouteParams> {
  customer: Customer;
  wasUpdated: boolean;
  prepareCustomerForm: (id: string) => void;
  submitCustomer: (id: string, form: Customer) => void;
}

interface CustomerUpdatePageRouteParams {
  id: string;
}

export type CustomerFormStateValue = GeneralDetailsCustomerFormState &
  CustomerContactsFormState &
  CustomerConsentFormState;

class CustomerUpdatePage extends Component<CustomerUpdatePageProps> {

  submitHandler = (value: CustomerFormStateValue) => {
    this.props.submitCustomer(this.existingCustomerId(), value as Customer);
  };

  componentWillMount(): void {
    this.props.prepareCustomerForm(this.existingCustomerId());
  }

  render(): React.ReactNode {
    if (this.props.wasUpdated) {
      return <Redirect to="/customer/list"/>
    }

    const ValidatedCustomerForm = withValidation(CustomerForm);
    return (
      <div>
        <Typography variant="headline" color="primary">
          {this.existingCustomerId() ? ("Customer  " + this.existingCustomerId()) : ("New customer")}
        </Typography>
        <ValidatedCustomerForm
          value={this.props.customer}
          onSubmit={this.submitHandler}
        />
      </div>
    );
  }

  private existingCustomerId() {
    return this.props.match.params.id;
  }
}

const mapStateToProps = (state: AppState) => ({
  customer: getCustomer(state),
  wasUpdated: isCustomerUpdated(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  prepareCustomerForm: (id: string) => dispatch(prepareCustomerForm(id)),
  submitCustomer: (id: string, form: Customer) => dispatch(submitCustomer(id, form))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerUpdatePage);