import React from "react";
import {Field} from "redux-form";
import {FormPanel} from "../../../../lib/panels/form-panel/FormPanel";
import {AppCheckboxInputOption, AppMultiCheckboxInput} from "../../../../lib/form/inputs/AppMultiCheckboxInput";
import {withReduxFieldProps} from "../../../../lib/redux-form/adapter/ReduxFormPropsAdapter";

export interface EligibilityRulesSelection {
  [ruleId: string]: boolean;
}

const eligibilityRules: AppCheckboxInputOption[] = [
  { id: '1', description: "New customers" },
  { id: '2', description: "Existing customers" },
  { id: '3', description: "Long term customers" }
];

const EligibilityRulesSelection = withReduxFieldProps(AppMultiCheckboxInput);

export function ProductEligibilityRules() {
  return (
    <FormPanel title="Eligibility">
      <Field
        name="eligibility"
        options={eligibilityRules}
        component={EligibilityRulesSelection}
      />
    </FormPanel>
  );
}