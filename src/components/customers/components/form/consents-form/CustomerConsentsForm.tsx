import {Component} from "react";
import React from "react";
import {FormPanel} from "../../../../lib/panels/form-panel/FormPanel";
import {ConsentSelectionBox, SelectionChangeEvent} from "./consent-selection-box/ConsentSelectionBox";

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

  changeHandler = (event: SelectionChangeEvent) => {
    this.emitConsentChange(event.id, event.value);
  };

  selectionRenderer = (selection: ConsentSelection) => {
    return (consent: RequiredConsent) => {
      return (
        <ConsentSelectionBox
          key={consent.id}
          item={consent}
          selected={selection[consent.id] || false}
          onChange={this.changeHandler}
        />
      );
    }
  };

  render(): React.ReactNode {
    return (
      <FormPanel title="Consents">
        {requiredConsents.map(this.selectionRenderer(this.props.value.consents))}
      </FormPanel>
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