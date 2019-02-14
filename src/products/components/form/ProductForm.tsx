import React from "react";
import {reduxForm, InjectedFormProps} from "redux-form";
import ProductGeneralDetailsFormSection from "./general-details/ProductGeneralDetailsFormSection";
import {Moment} from "moment";
import {ProductPricingFormSection} from "./pricing/ProductPricingFormSection";
import {PrimaryButton} from "../../../lib/buttons/PrimaryButton";
import {EligibilityRulesSelection, ProductEligibilityRules} from "./eligibility-rules/ProductEligibilityRules";

interface ProductFormState {
  code: string;
  name: string;
  validFrom: Moment | null | 'a';
  validTill: Moment | null;
  description: String;
  pricing: {
    oneTime: number | undefined;
    recurring: number | undefined;
  },
  eligibility: EligibilityRulesSelection;
}

const INITIAL_PRODUCT_FORM_STATE: ProductFormState = {
  code: undefined,
  name: undefined,
  validFrom: null,
  validTill: null,
  description: undefined,
  pricing: {
    oneTime: undefined,
    recurring: undefined
  },
  eligibility: {}
};

function ProductForm({handleSubmit}: InjectedFormProps<ProductFormState>) {
  console.log('Rerendering whole form?');
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ProductGeneralDetailsFormSection/>
        <ProductPricingFormSection/>
        <ProductEligibilityRules/>
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'product',
  initialValues: INITIAL_PRODUCT_FORM_STATE,
  onSubmit: (value: any) => { console.log(value) }
})(ProductForm);
