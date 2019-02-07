import React, {Component} from "react";
import {Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";
import style from "../../customers/list/CustomerList.module.scss";
import {Link} from "react-router-dom";

enum OrderStatus {
  NEW = 'NEW',
  SUBMITTED = 'SUBMITTED',
  FINISHED = 'FINISHED'
}

interface OrderRow {
  id: string;
  fullName: string;
  address: string;
  subscription: string;
  activateAt: Date;
  status: OrderStatus;
}

const rows: OrderRow[] = [
  {
    id: '1',
    fullName: 'John surname1',
    address: 'Žalgirio g. 135, Vilnius',
    subscription: '+37061234567',
    activateAt: new Date('2019-02-01'),
    status: OrderStatus.NEW
  },
  {
    id: '2',
    fullName: 'John surname2',
    address: 'Žalgirio g. 136, Vilnius',
    subscription: '+37061234568',
    activateAt: new Date('2019-02-15'),
    status: OrderStatus.SUBMITTED
  },
  {
    id: '3',
    fullName: 'John surname3',
    address: 'Žalgirio g. 137, Vilnius',
    subscription: '+37061234571',
    activateAt: new Date('2018-09-01'),
    status: OrderStatus.FINISHED
  }
];

export class OrderList extends Component {

  render(): React.ReactNode {
    return (
      <>
        <Typography variant="headline">Orders</Typography>
        <Paper
          className={style["table-panel"]}
          square={true}
          elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Subscription</TableCell>
                <TableCell>Activation date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.fullName}
                  </TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.subscription}</TableCell>
                  <TableCell>{row.activateAt.toDateString()}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <Button color="primary">
                      <Link to={`/order/${row.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
}