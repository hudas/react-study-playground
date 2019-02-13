import {Field} from "redux-form";
import React from "react";
import {FormPanel} from "../../../../lib/panels/form-panel/FormPanel";
import style from "./ProductGeneralDetailsFormSection.module.scss";
import {AppTextInput} from "../../../../lib/form/inputs/AppTextInput";
import {withReduxFieldProps} from "../../../../lib/redux-form/adapter/ReduxFormPropsAdapter";
import {AppDateInput} from "../../../../lib/form/inputs/AppDateInput";
import {AppSelectInput} from "../../../../lib/form/inputs/AppSelectInput";

const availableSubscriptionTypes = [{id: "PREPAID", name: "Prepaid"}, {id: "POSTPAID", name: "Postpaid"}];

const CodeField = withReduxFieldProps(AppTextInput);
const NameField = withReduxFieldProps(AppTextInput);
const SubscriptionTypeField = withReduxFieldProps(AppSelectInput);
const ValidFromField = withReduxFieldProps(AppDateInput);
const ValidTillField = withReduxFieldProps(AppDateInput);
const DescriptionField = withReduxFieldProps(AppTextInput);

export default function ProductGeneralDetailsFormSection() {
  console.log('Rerender?');
  return (
    <FormPanel title="General details">
      <div className={style["form-section-container"]}>
        <div className={style["code-field"]}>
          <Field
            name="code"
            label="Code"
            component={CodeField}
          />
        </div>

        <div className={style["name-field"]}>
          <Field
            name="name"
            label="Name"
            component={NameField}
          />
        </div>

        <div className={style["subscription-type-field"]}>
          <Field
            name="subscriptionType"
            label="Subscription type"
            options={availableSubscriptionTypes}
            component={SubscriptionTypeField}
          />
        </div>

        <div className={style["valid-from-field"]}>
          <Field
            name="validFrom"
            label="Valid from"
            component={ValidFromField}
          />
        </div>

        <div className={style["valid-till-field"]}>
          <Field
            name="validTill"
            label="Valid till"
            component={ValidTillField}
          />
        </div>

        <div className={style["description-field"]}>
          <Field
            name="description"
            label="Description"
            lines={5}
            component={DescriptionField}
          />
        </div>
      </div>
    </FormPanel>
  );
}

