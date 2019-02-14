import {Field} from "redux-form";
import React from "react";
import {FormPanel} from "../../../../lib/panels/form-panel/FormPanel";
import style from "./ProductGeneralDetailsFormSection.module.scss";
import {
  ValidatedReduxFormSectionProps
} from "../../../../lib/form/validator/WithReduxFormValidation";
import {ObjectSchema} from "yup";
import * as yup from "yup";
import {Moment} from "moment";
import {
  AppReduxFormDateInput,
  AppReduxFormSelectInput,
  AppReduxFormTextInput
} from "../../../../lib/redux-form/inputs/AdaptedReduxFormInputs";

export interface ProductGeneralDetailsFormState {
  code: string;
  name: string;
  validFrom: Moment | null;
  validTill: Moment | null;
  description: string;
  subscriptionType: string;
}

const availableSubscriptionTypes = [{id: "PREPAID", name: "Prepaid"}, {id: "POSTPAID", name: "Postpaid"}];

const formSectionValidationSchema: ObjectSchema<Partial<ProductGeneralDetailsFormState>> = yup.object<Partial<ProductGeneralDetailsFormState>>({
  code: yup.string()
    .required(),
  name: yup.string()
    .required(),
  validFrom: yup.mixed()
    .required(),
  validTill: yup.mixed()
    .required(),
  subscriptionType: yup.mixed()
    .required()
});

export default function ProductGeneralDetailsFormSection({registerSchema}: ValidatedReduxFormSectionProps<ProductGeneralDetailsFormState>) {
  registerSchema(formSectionValidationSchema as ObjectSchema<ProductGeneralDetailsFormState>);

  return (
    <FormPanel title="General details">
      <div className={style["form-section-container"]}>
        <div className={style["code-field"]}>
          <Field
            name="code"
            label="Code"
            component={AppReduxFormTextInput}
          />
        </div>

        <div className={style["name-field"]}>
          <Field
            name="name"
            label="Name"
            component={AppReduxFormTextInput}
          />
        </div>

        <div className={style["subscription-type-field"]}>
          <Field
            name="subscriptionType"
            label="Subscription type"
            options={availableSubscriptionTypes}
            component={AppReduxFormSelectInput}
          />
        </div>

        <div className={style["valid-from-field"]}>
          <Field
            name="validFrom"
            label="Valid from"
            component={AppReduxFormDateInput}
          />
        </div>

        <div className={style["valid-till-field"]}>
          <Field
            name="validTill"
            label="Valid till"
            component={AppReduxFormDateInput}
          />
        </div>

        <div className={style["description-field"]}>
          <Field
            name="description"
            label="Description"
            lines={5}
            component={AppReduxFormTextInput}
          />
        </div>
      </div>
    </FormPanel>
  );
}

