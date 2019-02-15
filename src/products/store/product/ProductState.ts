import {ProductFormState} from "../../pages/update/ProductUpdatePage";

export interface ProductState {
  product: ProductFormState;
}

export const INITIAL_PRODUCT_STATE: ProductState = {
  product: {
    code: undefined,
    name: undefined,
    description: undefined,
    subscriptionType: undefined,
    validFrom: null,
    validTill: null,
    pricing: {
      oneTime: undefined,
      recurring: undefined
    },
    eligibility: {}
  }
};