import React from "react";
import {ProductForm} from "../../components/form/ProductForm";
import {
  EligibilityRulesSelection, ProductEligibilityRulesFormState
} from "../../components/form/eligibility-rules/ProductEligibilityRules";
import {reduxForm} from "redux-form";
import {AppState} from "../../../Store";
import {connect} from "react-redux";
import {submitProduct} from "../../store/product/actions/SubmitProductAction";
import {withReduxFormValidation} from "../../../lib/form/validator/WithReduxFormValidation";
import {ProductGeneralDetailsFormState} from "../../components/form/general-details/ProductGeneralDetailsFormSection";
import {
  ProductPricingFormSectionState
} from "../../components/form/pricing/ProductPricingFormSection";


export type ProductFormState = ProductGeneralDetailsFormState & ProductPricingFormSectionState & ProductEligibilityRulesFormState;

const INITIAL_PRODUCT_FORM_STATE: ProductFormState = {
  code: undefined,
  name: undefined,
  validFrom: null,
  validTill: null,
  description: undefined,
  subscriptionType: undefined,
  pricing: {
    oneTime: undefined,
    recurring: undefined
  },
  eligibility: {}
};

const managedForm = reduxForm({
  form: 'product',
  initialValues: INITIAL_PRODUCT_FORM_STATE,
})(ProductForm);

const validatedProductForm = withReduxFormValidation(managedForm);

export default connect(
  (state: AppState) => ({}),
  (dispatch: any) => ({
    onSubmit: (value: any) => dispatch(submitProduct(value))
  })
)(validatedProductForm);
