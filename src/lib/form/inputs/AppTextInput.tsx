import {FormControl, FormHelperText, Input, InputLabel} from "@material-ui/core";
import React, {ChangeEvent} from "react";

export interface AppTextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  lines?: number;
  valid?: boolean;
  error?: string;
  submitFailed: boolean;
}

export function AppTextInput({label, valid, error, onChange, lines, name, value, submitFailed}: AppTextInputProps) {
  return (
    <FormControl
      margin="normal"
      error={submitFailed && valid === false}
    >
      <InputLabel>{label}</InputLabel>
      <Input
        name={name}
        value={value}
        multiline={lines && lines > 1}
        rows={lines || 1}
        onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => onChange(event.target.value)}
      />
      {submitFailed && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}