import React from "react";
import {Field} from "redux-form";
import style from "./ProductPricingFormSection.module.scss";
import * as yup from "yup";
import {FormPanel} from "../../../../lib/panels/form-panel/FormPanel";
import {AppReduxFormTextInput} from "../../../../lib/redux-form/inputs/AdaptedReduxFormInputs";
import {ObjectSchema} from "yup";
import {ValidatedReduxFormSectionProps} from "../../../../lib/form/validator/WithReduxFormValidation";

export interface ProductPricingFormSectionState {
  pricing: {
    oneTime: number | undefined;
    recurring: number | undefined;
  }
}

const formSectionValidationSchema: ObjectSchema<Partial<ProductPricingFormSectionState>> = yup.object<Partial<ProductPricingFormSectionState>>({
  pricing: yup.object().shape({
    oneTime: yup.number().required()
      .positive(),
    recurring: yup.number().required()
      .positive()
  })
});

export function ProductPricingFormSection({registerSchema}: ValidatedReduxFormSectionProps<ProductPricingFormSectionState>) {
  registerSchema(formSectionValidationSchema as ObjectSchema<ProductPricingFormSectionState>);

  return (
    <FormPanel title="Pricing">
      <div className={style["form-section-container"]}>
        <div className={style["one-time-field"]}>
          <Field
            name="pricing.oneTime"
            label="One time fee"
            component={AppReduxFormTextInput}
          />
        </div>

        <div className={style["recurring-field"]}>
          <Field
            name="pricing.recurring"
            label="Recurring fee"
            component={AppReduxFormTextInput}
          />
        </div>
      </div>
    </FormPanel>
  );
}