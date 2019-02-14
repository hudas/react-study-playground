import React from "react";
import {InjectedFormProps} from "redux-form";
import ProductGeneralDetailsFormSection from "./general-details/ProductGeneralDetailsFormSection";
import {ProductPricingFormSection} from "./pricing/ProductPricingFormSection";
import {PrimaryButton} from "../../../lib/buttons/PrimaryButton";
import {ProductEligibilityRules} from "./eligibility-rules/ProductEligibilityRules";
import {ProductFormState} from "../../pages/update/ProductUpdatePage";

export function ProductForm({handleSubmit}: InjectedFormProps<ProductFormState>) {
  return (
    <form onSubmit={handleSubmit}>
      <ProductGeneralDetailsFormSection/>
      <ProductPricingFormSection/>
      <ProductEligibilityRules/>
      <PrimaryButton type="submit">Submit</PrimaryButton>
    </form>
  )
}