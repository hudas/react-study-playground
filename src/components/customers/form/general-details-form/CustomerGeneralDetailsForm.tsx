import {Component} from "react";
import {Moment} from "moment";
import React from "react";
import {FormPanel} from "../../../lib/panels/form-panel/FormPanel";
import {TextField} from "@material-ui/core";
import style from "./CustomerGeneralDetailsForm.module.scss";
import {DatePicker} from "material-ui-pickers";
import {PrimaryButton} from "../../../lib/buttons/PrimaryButton";
import {Link} from "react-router-dom";

export interface GeneralDetailsCustomerFormState {
  firstName?: string;
  lastName?: string;
  birthDate?: Moment | null;
  address?: string;
}

export interface GeneralDetailsFormProps {
  value: GeneralDetailsCustomerFormState;
  onChange?: (data: GeneralDetailsCustomerFormState) => void;
  disabled?: boolean;
}

export class CustomerGeneralDetailsForm extends Component<GeneralDetailsFormProps> {

  changeHandler = (field: keyof GeneralDetailsCustomerFormState) => {
    return (event: any) => {
      const targetInput = event.target;
      const newValue = targetInput.type === 'checkbox' ? targetInput.checked : targetInput.value;

      this.emitChange(field, newValue);
    }
  };

  dateChangeHandler = (field: keyof GeneralDetailsCustomerFormState) => {
    return (date: Moment) => {
      this.emitChange(field, date);
    };
  };

  render(): React.ReactNode {
    return (
      <FormPanel title="General details">
        <form className={style["form-container"]}>
          <TextField
            id="firstName"
            label="First name"
            margin="normal"
            className={style["first-name-field"]}
            disabled={this.props.disabled}
            value={this.props.value.firstName}
            onChange={this.changeHandler('firstName')}
          />

          <TextField
            id="lastName"
            label="Last name"
            margin="normal"
            className={style["last-name-field"]}
            disabled={this.props.disabled}
            value={this.props.value.lastName}
            onChange={this.changeHandler('lastName')}
          />

          <TextField
            id="address"
            label="Address"
            margin="normal"
            className={style["address-field"]}
            disabled={this.props.disabled}
            value={this.props.value.address}
            onChange={this.changeHandler('address')}
          />

          <DatePicker
            label="Birth date"
            keyboard={false}
            className={style["birthday-field"]}
            disabled={this.props.disabled}
            value={this.props.value.birthDate}
            onChange={this.dateChangeHandler('birthDate')}
          />
        </form>
      </FormPanel>
    );
  }

  private emitChange(field: keyof GeneralDetailsCustomerFormState, changedValue: any) {
    const updatedDetails = {
      ...this.props.value,
      [field]: changedValue,
    };

    this.props.onChange && this.props.onChange(updatedDetails);
  }
}