import * as React from "react";
import {ReactNode} from "react";
import {Typography} from "@material-ui/core";
import {TablePanel} from "../../../lib/panels/table-panel/TablePanel";
import * as service from "../../services/CustomerService";
import {CustomerList, CustomerRow} from "../../components/list/CustomerList";

interface CustomerListPageState {
  rows: CustomerRow[];
}

const INITIAL_STATE: CustomerListPageState = {
  rows: []
};

export class CustomerListPage extends React.Component<{}, CustomerListPageState> {
  constructor(props: any) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.fetchListRows();
  }

  render(): ReactNode {
    return (
      <>
        <Typography variant="headline">Customers</Typography>
        <TablePanel>
          <CustomerList rows={this.state.rows}/>
        </TablePanel>
      </>
    );
  }

  private fetchListRows() {
    service.getCustomerList()
      .then((rows: CustomerRow[]) => this.setState({rows: rows}))
      .catch((error) => console.error(error));
  }
}