import {Component} from "react";
import React from "react";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import {FormPanel} from "../../../lib/panels/form-panel/FormPanel";

interface RequiredConsent {
  id: string;
  description: string;
}

const requiredConsents: RequiredConsent[] = [
  { id: '1', description: 'Allow personal data usage for marketing purposes' },
  { id: '2', description: 'Allow personal data usage for campaign segmentation' },
  { id: '3', description: 'Allow service usage data for campaign segmentation' },
];

export interface CustomerConsentFormState {
  consents: ConsentSelection;
}

export interface ConsentSelection {
  [consentId: string]: boolean;
}


export interface ConsentFormProps {
  onChange: (data: CustomerConsentFormState) => void;
  value: CustomerConsentFormState
}

export class CustomerConsentsForm extends Component<ConsentFormProps> {

  changeHandler = (consentId: string) => {
    return (event: any) => {
      const targetInput = event.target;
      const newValue = targetInput.checked;

      this.emitConsentChange(consentId, newValue);
    }
  };

  consentRenderer = (selection: ConsentSelection) => {
    return (consent: RequiredConsent) => {
      return (
        <FormControlLabel
          key={consent.id}
          control={
            <Checkbox
              checked={selection[consent.id] || false}
              onChange={this.changeHandler(consent.id)}
            />
          }
          label={consent.description}
        />
      );
    }
  };

  render(): React.ReactNode {
    return (
      <FormPanel title="Consents">{requiredConsents.map(this.consentRenderer(this.props.value.consents))}</FormPanel>
    );
  }

  private emitConsentChange(id: string, changedValue: any) {
    const updatedConsents = {
      ...this.props.value.consents,
      [id]: changedValue,
    };

    this.props.onChange({ consents: updatedConsents });
  }
}