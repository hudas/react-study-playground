import {FormControl, Input, InputLabel, MenuItem, Select} from "@material-ui/core";
import React, {ChangeEvent} from "react";

export interface AppSelectInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: AppSelectInputOption[];
}

export interface AppSelectInputOption {
  id: string;
  name: string;
}

export function AppSelectInput({name, label, onChange, options, ...compatibleProps}: AppSelectInputProps) {
  return (
    <FormControl margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        {...compatibleProps}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value)}
        input={<Input name={name}/>}
      >
        {options.map(({id, name}: AppSelectInputOption) =>
          (<MenuItem key={id} value={id}>{name}</MenuItem>)
        )}
      </Select>
    </FormControl>
  );
}