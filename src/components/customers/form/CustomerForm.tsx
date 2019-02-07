import React, { Component } from 'react';
import {RouteComponentProps} from "react-router";
import {Checkbox, FormControlLabel, TextField, Typography} from "@material-ui/core";
import {PrimaryButton} from "../../lib/buttons/PrimaryButton";
import {DatePicker} from "material-ui-pickers";
import style from "./CustomerForm.module.scss";
import {FormPanel} from "../../lib/panels/form-panel/FormPanel";
import {Moment} from "moment";

interface CustomerFormRouteParams {
    id: string;
}

interface CustomerFormState {
    firstName?: string;
    lastName?: string;
    birthDate?: Moment | null;
    address?: string;
    marketingConsent?: boolean;
}

export class CustomerForm extends Component<RouteComponentProps<CustomerFormRouteParams>, CustomerFormState> {

    constructor(props: RouteComponentProps<CustomerFormRouteParams>) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            birthDate: null,
            address: '',
            marketingConsent: false
        }
    }

    submitHandler = (event: any) => {
        console.log('Form submitted' + JSON.stringify(this.state));
        event.preventDefault();
    };

    changeHandler = (field: keyof CustomerFormState) => {
        return (event: any) => {
            const targetInput = event.target;
            const newValue = targetInput.type === 'checkbox' ? targetInput.checked : targetInput.value;

            this.setState({
                [field]: newValue
            });
        }
    };

    dateChangeHandler = (field: keyof CustomerFormState) => {
        return (date: Moment) => {
            this.setState({ [field]: date });
        };
    };

    render(): React.ReactNode {
        const existingCustomer = !!this.props.match.params.id;

        const formlabel = existingCustomer ? (
          "Customer form  " + this.props.match.params.id
        ) : (
          "New customer form"
        );

        return (
            <div>
                <FormPanel>
                    <Typography variant="headline" color="primary">
                        {formlabel}
                    </Typography>
                    <form
                      noValidate
                      onSubmit={this.submitHandler}
                    >

                        <div className={style["form-container"]}>
                            <TextField
                              id="firstName"
                              label="First name"
                              margin="normal"
                              className={style["first-name-field"]}
                              value={this.state.firstName}
                              onChange={this.changeHandler('firstName')}
                            />

                            <TextField
                              id="lastName"
                              label="Last name"
                              margin="normal"
                              className={style["last-name-field"]}
                              value={this.state.lastName}
                              onChange={this.changeHandler('lastName')}
                            />

                            <TextField
                              id="address"
                              label="Address"
                              margin="normal"
                              className={style["address-field"]}
                              value={this.state.address}
                              onChange={this.changeHandler('address')}
                            />

                            <DatePicker
                              label="Birth date"
                              keyboard={false}
                              className={style["birthday-field"]}
                              value={this.state.birthDate}
                              onChange={this.dateChangeHandler('birthDate')}
                            />

                            <FormControlLabel
                              className={style["consent-field"]}
                              control={
                                  <Checkbox
                                    checked={this.state.marketingConsent}
                                    onChange={this.changeHandler('marketingConsent')}
                                    value="marketingConsent"
                                  />
                              }
                              label="Allow personal data usage for marketing purposes"
                            />
                        </div>

                        <PrimaryButton type="submit">Submit</PrimaryButton>
                    </form>
                </FormPanel>
            </div>
        );
    }
}