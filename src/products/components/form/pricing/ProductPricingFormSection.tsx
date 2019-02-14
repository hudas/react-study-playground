import React from "react";
import {Field} from "redux-form";
import style from "./ProductPricingFormSection.module.scss";

import {FormPanel} from "../../../../lib/panels/form-panel/FormPanel";
import {withReduxFieldProps} from "../../../../lib/redux-form/adapter/ReduxFormPropsAdapter";
import {AppTextInput} from "../../../../lib/form/inputs/AppTextInput";

const OneTimeField = withReduxFieldProps(AppTextInput);
const RecurringField = withReduxFieldProps(AppTextInput);

export function ProductPricingFormSection() {
  return (
    <FormPanel title="Pricing">
      <div className={style["form-section-container"]}>
        <div className={style["one-time-field"]}>
          <Field
            name="pricing.oneTime"
            label="One time fee"
            component={OneTimeField}
          />
        </div>

        <div className={style["recurring-field"]}>
          <Field
            name="pricing.recurring"
            label="Recurring fee"
            component={RecurringField}
          />
        </div>
      </div>
    </FormPanel>
  );
}