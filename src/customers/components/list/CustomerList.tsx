import React from 'react';
import {Table, TableBody, TableHead} from "@material-ui/core";
import {CustomerListRow} from "./list-row/CustomerListRow";
import {CustomerListColumnHeadings} from "./list-columns/CustomerListColumnHeadings";

export interface CustomerRow {
    id: string;
    firstName: string;
    lastName: string;
    address: string;
    subscriptions: string[];
}

export interface CustomerListProps {
    rows: CustomerRow[];
}

export function CustomerList({ rows }: CustomerListProps) {
    return (
      <Table>
          <TableHead>
              <CustomerListColumnHeadings/>
          </TableHead>
          <TableBody>{rows.map(row => <CustomerListRow key={row.id} customer={row}/>)}</TableBody>
      </Table>
    );
}