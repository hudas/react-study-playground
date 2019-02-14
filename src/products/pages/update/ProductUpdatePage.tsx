import React from "react";
import {ProductForm} from "../../components/form/ProductForm";
import {Moment} from "moment";
import {
  EligibilityRulesSelection
} from "../../components/form/eligibility-rules/ProductEligibilityRules";
import {reduxForm} from "redux-form";
import {AppState} from "../../../Store";
import {connect} from "react-redux";
import {submitProduct} from "../../store/actions/SubmitProductAction";


export interface ProductFormState {
  code: string;
  name: string;
  validFrom: Moment | null;
  validTill: Moment | null;
  description: string;
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


const managedProductForm = reduxForm({
  form: 'product',
  initialValues: INITIAL_PRODUCT_FORM_STATE,
})(ProductForm);

export default connect(
  (state: AppState) => ({}),
  (dispatch: any) => ({
    onSubmit: (value: any) => dispatch(submitProduct(value))
  })
)(managedProductForm);
