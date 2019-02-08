import React from "react";
import {Checkbox, FormControlLabel} from "@material-ui/core";

export interface ConsentSelectionProps {
  item: SelectionItemProps;
  selected: boolean;
  onChange: (event: SelectionChangeEvent) => void;
}

export interface SelectionItemProps {
  id: string;
  description: string;
}

export interface SelectionChangeEvent {
  id: string;
  value: boolean;
}

export function ConsentSelectionBox({ item, selected, onChange }: ConsentSelectionProps) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={selected}
          onChange={(event) =>
            onChange({
              id: item.id,
              value: event.target.checked
            })}
        />
      }
      label={item.description}
    />
  );
}