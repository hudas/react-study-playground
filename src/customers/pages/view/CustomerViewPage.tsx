import React, {Component, ReactNode} from "react";
import {RouteComponentProps} from "react-router";
import {Typography} from "@material-ui/core";
import {PrimaryButton} from "../../../lib/buttons/PrimaryButton";
import {CustomerView} from "../../components/view/CustomerView";
import {AppState} from "../../../Store";
import {getCustomer} from "../../store/customer/CustomerSelectors";
import {connect} from "react-redux";
import {Customer} from "../../store/customer/CustomerState";
import {loadCustomer} from "../../store/customer/actions/LoadCustomerAction";

export interface CustomerViewPageProps extends RouteComponentProps<CustomerViewRouteParams> {
  customer: Customer;
  loadCustomer: (id: string) => void;
}

interface CustomerViewRouteParams {
  id: string;
}

class CustomerViewPage extends Component<CustomerViewPageProps> {

  handleEdit = (id: string) => {
    this.props.history.push(`/customer/edit/${id}`);
  };

  componentDidMount(): void {
    this.props.loadCustomer(this.props.match.params.id);
  }

  render(): ReactNode {
    return (
      <div>
        <Typography variant="headline">Customer</Typography>
        <CustomerView customer={this.props.customer}/>
        <PrimaryButton onClick={() => this.handleEdit(this.props.match.params.id)}>Edit</PrimaryButton>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  customer: getCustomer(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  loadCustomer: (id: string) => dispatch(loadCustomer(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerViewPage);
