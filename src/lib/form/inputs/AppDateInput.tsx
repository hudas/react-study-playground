import {FormControl} from "@material-ui/core";
import {DatePicker} from "material-ui-pickers";
import React from "react";

export interface AppDateInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
}

export function AppDateInput({ value, ...compatibleProps}: AppDateInputProps) {
  return (
    <FormControl margin={"normal"}>
      <DatePicker
        {...compatibleProps}
        value={value !== '' ? value : null}
        keyboard={false}
      />
    </FormControl>
  );
}