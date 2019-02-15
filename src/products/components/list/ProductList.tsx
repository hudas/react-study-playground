import {TablePanel} from "../../../lib/panels/table-panel/TablePanel";
import {Moment} from "moment";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import React from "react";
import {EmbeddedButton} from "../../../lib/buttons/EmbeddedButton";

export interface ProductRow {
  id: string;
  name: string;
  validFrom: Moment | null;
  validTill: Moment | null;
}

export interface ProductListProps {
  rows: ProductRow[];
  onView: (id: string) => void;
}

export function ProductList({rows, onView}: ProductListProps) {
  return (
    <TablePanel>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Valid from</TableCell>
            <TableCell>Valid till</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.validFrom.toISOString()}</TableCell>
              <TableCell>{row.validTill.toISOString()}</TableCell>
              <TableCell>
                <EmbeddedButton onClick={() => onView(row.id)}>View</EmbeddedButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TablePanel>
  )
}