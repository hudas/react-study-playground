import React, {Component, ReactNode} from 'react';
import {Table, TableBody, TableHead, Typography} from "@material-ui/core";
import {TablePanel} from "../../../lib/panels/table-panel/TablePanel";
import {CustomerListRow} from "./list-row/CustomerListRow";
import {CustomerListColumnHeadings} from "./list-columns/CustomerListColumnHeadings";
import * as service from "../../services/CustomerService";

export interface CustomerRow {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    subscriptions: string[];
}

interface CustomerListState {
    rows: CustomerRow[];
}

const INITIAL_STATE: CustomerListState = {
    rows: []
};

export class CustomerList extends Component<any, CustomerListState> {

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
                  <Table>
                      <TableHead>
                          <CustomerListColumnHeadings/>
                      </TableHead>
                      <TableBody>{this.state.rows
                        .map(row => <CustomerListRow key={row.id} customer={row}/>)}
                      </TableBody>
                  </Table>
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