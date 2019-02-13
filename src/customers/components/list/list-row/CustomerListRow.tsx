import {CustomerRow} from "../CustomerList";
import {TableCell, TableRow} from "@material-ui/core";
import {EmbeddedButton} from "../../../../lib/buttons/EmbeddedButton";
import {Link} from "react-router-dom";
import React from "react";

export interface CustomerListRowProps {
  customer: CustomerRow;
  onView: (id: string) => void;
}

export function CustomerListRow({customer, onView}: CustomerListRowProps) {
  return (
    <TableRow key={customer.id}>
      <TableCell component="th" scope="row">
        {customer.firstName + " " + customer.lastName}
      </TableCell>
      <TableCell>{customer.address}</TableCell>
      <TableCell>{customer.subscriptions.join('\n')}</TableCell>
      <TableCell>
        <EmbeddedButton onClick={() => onView(customer.id)}>View</EmbeddedButton>
      </TableCell>
    </TableRow>
  );
}