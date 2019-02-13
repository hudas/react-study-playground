import * as React from "react";
import {ReactNode} from "react";
import {Typography} from "@material-ui/core";
import {TablePanel} from "../../../lib/panels/table-panel/TablePanel";
import {CustomerList, CustomerRow} from "../../components/list/CustomerList";
import {RouteComponentProps, withRouter} from "react-router";
import {AppState} from "../../../Store";
import {getAllCustomers} from "../../store/list/CustomerListSelectors";
import {loadCustomerList} from "../../store/list/CustomerListActions";
import {connect} from "react-redux";

export interface CustomerListPageProps extends RouteComponentProps {
  customers: CustomerRow[];
  loadList: () => void;
}

class CustomerListPage extends React.Component<CustomerListPageProps> {

  handleCustomerView = (id: string) => {
    this.props.history.push(`/customer/${id}`);
  };

  componentDidMount() {
    this.props.loadList();
  }

  render(): ReactNode {
    return (
      <>
        <Typography variant="headline">Customers</Typography>
        <TablePanel>
          <CustomerList
            rows={this.props.customers}
            onViewCustomer={this.handleCustomerView}
          />
        </TablePanel>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  customers: getAllCustomers(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  loadList: () => dispatch(loadCustomerList())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CustomerListPage));