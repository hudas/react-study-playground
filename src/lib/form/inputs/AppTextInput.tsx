import {FormControl, Input, InputLabel} from "@material-ui/core";
import React, {ChangeEvent} from "react";

export interface AppTextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  lines?: number;
}

export function AppTextInput({label, onChange, lines, ...compatibleProps} :AppTextInputProps) {
  return (
    <FormControl margin="normal">
      <InputLabel>{label}</InputLabel>
      <Input
        {...compatibleProps}
        multiline={lines && lines > 1}
        rows={lines || 1}
        onChange={(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => onChange(event.target.value)}
      />
    </FormControl>
  );
}