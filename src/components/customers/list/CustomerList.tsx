import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@material-ui/core";
import style from "./CustomerList.module.scss";

interface CustomerRow {
    id: string;
    fullName: string;
    address: string;
    subscriptions: string[];
}

const rows: CustomerRow[] = [
    {
        id: '1',
        fullName: 'John surname1',
        address: 'Žalgirio g. 135, Vilnius',
        subscriptions: ['+37061234567', '+37061234568', '+37061234569']
    },
    {
        id: '2',
        fullName: 'John surname2',
        address: 'Žalgirio g. 136, Vilnius',
        subscriptions: ['+37061234568']
    },
    {
        id: '3',
        fullName: 'John surname3',
        address: 'Žalgirio g. 137, Vilnius',
        subscriptions: []
    },
    {
        id: '4',
        fullName: 'John surname4',
        address: 'Žalgirio g. 138, Vilnius',
        subscriptions: ['+37061234570']
    }
];

export class CustomerList extends Component {

    render(): React.ReactNode {
        return (
            <>
                <Typography variant="headline">Customers</Typography>
                <Paper
                  className={style["table-panel"]}
                  square={true}
                  elevation={2}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Subscriptions</TableCell>
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
                                  <TableCell>{row.subscriptions.join('\n')}</TableCell>
                                  <TableCell>
                                      <Button color="primary">
                                          <Link to={`/customer/${row.id}`}>View</Link>
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