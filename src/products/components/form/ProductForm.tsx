import React from "react";
import {reduxForm, InjectedFormProps} from "redux-form";
import ProductGeneralDetailsFormSection from "./general-details/ProductGeneralDetailsFormSection";
import {Moment} from "moment";

interface ProductFormState {
  code: string;
  name: string;
  validFrom: Moment | null | 'a';
  validTill: Moment | null;
  description: String;
}

const INITIAL_PRODUCT_FORM_STATE: ProductFormState = {
  code: undefined,
  name: undefined,
  validFrom: null,
  validTill: null,
  description: undefined
};

function ProductForm({handleSubmit}: InjectedFormProps<ProductFormState>) {
  console.log('Rerendering whole form?');
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ProductGeneralDetailsFormSection/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'product',
  initialValues: INITIAL_PRODUCT_FORM_STATE,
  onSubmit: (value: any) => { console.log(value) }
})(ProductForm);
