import React from "react";
import {InjectedFormProps} from "redux-form";
import ProductGeneralDetailsFormSection from "./general-details/ProductGeneralDetailsFormSection";
import {ProductPricingFormSection} from "./pricing/ProductPricingFormSection";
import {PrimaryButton} from "../../../lib/buttons/PrimaryButton";
import {ProductEligibilityRules} from "./eligibility-rules/ProductEligibilityRules";
import {ProductFormState} from "../../pages/update/ProductUpdatePage";
import {ValidatedReduxFormProps} from "../../../lib/form/validator/WithReduxFormValidation";

export function ProductForm({handleSubmit, validationRegistrar}: InjectedFormProps<ProductFormState> & ValidatedReduxFormProps<ProductFormState>) {
  return (
    <form onSubmit={handleSubmit}>
      <ProductGeneralDetailsFormSection registerSchema={validationRegistrar}/>
      <ProductPricingFormSection registerSchema={validationRegistrar}/>
      <ProductEligibilityRules registerSchema={validationRegistrar}/>
      <PrimaryButton type="submit">Submit</PrimaryButton>
    </form>
  )
}