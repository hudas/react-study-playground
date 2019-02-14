import {FormControl, FormHelperText, Input, InputLabel, MenuItem, Select} from "@material-ui/core";
import React, {ChangeEvent} from "react";

export interface AppSelectInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: AppSelectInputOption[];
  valid?: boolean;
  error?: string;
  submitFailed: boolean;
}

export interface AppSelectInputOption {
  id: string;
  name: string;
}

export function AppSelectInput({name, label, onChange, options, valid, error, value, submitFailed}: AppSelectInputProps) {
  return (
    <FormControl
      margin="normal"
      error={submitFailed && valid === false}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value)}
        input={<Input name={name}/>}
      >
        {options.map(({id, name}: AppSelectInputOption) =>
          (<MenuItem key={id} value={id}>{name}</MenuItem>)
        )}
      </Select>
      {submitFailed && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}