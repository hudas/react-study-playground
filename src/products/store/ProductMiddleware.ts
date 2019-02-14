import {Dispatch, MiddlewareAPI} from "redux";
import {ProductActions, ProductActionTypes} from "./actions/ProductActions";
import {SubmitProduct, submitProductFinished} from "./actions/SubmitProductAction";
import {ActionStatus} from "../../Store";
import * as services from "../services/ProductService";
import * as mappers from "../services/ProductMappers";


export const productMiddleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => (action: ProductActions) => {
  switch (action.type) {
    case ProductActionTypes.SUBMIT:
      handleProductSubmit(action, dispatch);
      break;
  }

  next(action);
};

function handleProductSubmit(action: SubmitProduct, dispatch: any) {
  if (action.status === ActionStatus.REQUEST) {
    services.createProduct(mappers.productToDto(action.product))
      .then(() => dispatch(submitProductFinished(ActionStatus.SUCCESS)))
      .catch(() => dispatch(submitProductFinished(ActionStatus.FAILURE)))
  }
}