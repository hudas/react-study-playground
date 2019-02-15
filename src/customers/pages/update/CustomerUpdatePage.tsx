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
import {withFormikValidation} from "../../../lib/form/validator/WithFormikValidation";
import {AppState} from "../../../Store";
import {getCustomer, isCustomerUpdated} from "../../store/customer/CustomerSelectors";
import {connect} from "react-redux";
import {Customer} from "../../store/customer/CustomerState";
import {prepareFormEffect, submitCustomerEffect} from "../../store/customer/CustomerEffects";

export interface CustomerUpdatePageProps extends RouteComponentProps<CustomerUpdatePageRouteParams> {
  customer: Customer;
  wasUpdated: boolean;
  prepareCustomerForm: (id: string) => void;
  submitCustomer: () => void;
}

interface CustomerUpdatePageRouteParams {
  id: string;
}

export type CustomerFormStateValue = GeneralDetailsCustomerFormState &
  CustomerContactsFormState &
  CustomerConsentFormState;

class CustomerUpdatePage extends Component<CustomerUpdatePageProps> {

  submitHandler = () => {
    // We ignore value, since Redux store is our source of truth, not HTML
    console.log('Im submitting');
    this.props.submitCustomer();
  };

  componentWillMount(): void {
    this.props.prepareCustomerForm(this.existingCustomerId());
  }

  render(): React.ReactNode {
    if (this.props.wasUpdated) {
      return <Redirect to="/customer/list"/>
    }

    const ValidatedCustomerForm = withFormikValidation(CustomerForm);
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
  prepareCustomerForm: (id: string) => dispatch(prepareFormEffect(id)),
  submitCustomer: () => dispatch(submitCustomerEffect())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerUpdatePage);