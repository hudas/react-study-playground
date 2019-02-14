import React, {ChangeEvent, Component} from "react";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {SelectionChangeEvent} from "../../../customers/components/form/consents-form/consent-selection-box/ConsentSelectionBox";

export interface AppMultiCheckboxInputProps {
  value: AppMultiCheckboxInputSelection;
  onChange: (value: AppMultiCheckboxInputSelection) => void;
  options: AppCheckboxInputOption[];
}

export interface AppMultiCheckboxInputSelection {
  [id: string]: boolean;
}

export class AppMultiCheckboxInput extends Component<AppMultiCheckboxInputProps> {

  handleChange = (event: SelectionChangeEvent) => {
    this.emitChange(event.id, event.value);
  };

  render(): React.ReactNode {
    return (
      <>
        {this.props.options.map(option => (
          <AppCheckboxInput
            key={option.id}
            option={option}
            value={this.props.value[option.id] || false}
            onChange={this.handleChange}
          />
        ))}
      </>
    );
  }

  private emitChange(id: string, changedValue: any) {
    const updatedConsents = {
      ...this.props.value,
      [id]: changedValue,
    };

    this.props.onChange(updatedConsents);
  }
}

interface AppCheckboxInputProps {
  value: boolean;
  option: AppCheckboxInputOption;
  onChange: (event: AppCheckboxChangeEvent) => void;
}

export interface AppCheckboxInputOption {
  id: string;
  description: string;
}

interface AppCheckboxChangeEvent {
  id: string;
  value: boolean;
}

function AppCheckboxInput({value, option, onChange}: AppCheckboxInputProps) {
  return (
    <FormControlLabel
      label={option.description}
      control={
        <Checkbox
          checked={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onChange({id: option.id, value: event.target.checked})
          }
        />
      }
    />
  );
}


