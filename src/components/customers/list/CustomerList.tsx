import React, {Component, ReactNode} from 'react';
import {Table, TableBody, TableHead, Typography} from "@material-ui/core";
import {TablePanel} from "../../lib/panels/table-panel/TablePanel";
import axios, {AxiosResponse} from "axios";
import {CustomerListRow} from "./list-row/CustomerListRow";
import {CustomerListColumnHeadings} from "./list-columns/CustomerListColumnHeadings";

interface CustomerListState {
    rows: CustomerRow[];
}

export interface CustomerRow {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    subscriptions: string[];
}

export class CustomerList extends Component<any, CustomerListState> {

    constructor(props: any) {
        super(props);
        this.state = {
            rows: []
        };
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
                        .map(row => <CustomerListRow customer={row}/>)}
                      </TableBody>
                  </Table>
              </TablePanel>
          </>
        );
    }

    private fetchListRows() {
        axios.get<CustomerRow[]>('http://localhost:3000/api/customer/list')
          .then((result: AxiosResponse<CustomerRow[]>) => {
              this.setState({rows: result.data})
          })
          .catch((error) => {
              console.error(error);
          });
    }
}