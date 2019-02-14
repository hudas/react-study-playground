import {FormControl, FormHelperText} from "@material-ui/core";
import {DatePicker} from "material-ui-pickers";
import React from "react";

export interface AppDateInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  valid?: boolean;
  error?: string;
  submitFailed: boolean;
}

export function AppDateInput({ name, label, value, valid, error, onChange, submitFailed}: AppDateInputProps) {
  return (
    <FormControl
      margin={"normal"}
      error={submitFailed && valid === false}
    >
      <DatePicker
        label={label}
        name={name}
        onChange={onChange}
        value={value !== '' ? value : null}
        keyboard={false}
        error={submitFailed && valid === false}
      />
      {submitFailed && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}