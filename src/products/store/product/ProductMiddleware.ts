import {Dispatch, MiddlewareAPI} from "redux";
import {ProductActions, ProductActionTypes} from "./actions/ProductActions";
import {SubmitProduct, submitProductFinished} from "./actions/SubmitProductAction";
import {ActionStatus} from "../../../Store";
import * as services from "../../services/ProductService";
import * as mappers from "../../services/ProductMappers";
import {LoadProduct, loadProductFailed, loadProductSucceeded} from "./actions/LoadProductAction";
import {ProductDto} from "../../services/dto/ProductDto";


export const productMiddleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => (action: ProductActions) => {
  switch (action.type) {
    case ProductActionTypes.LOAD:
      handleProductLoad(action, dispatch);
      break;
    case ProductActionTypes.SUBMIT:
      handleProductSubmit(action, dispatch);
      break;
  }

  next(action);
};

function handleProductLoad(action: LoadProduct, dispatch: Dispatch) {
  if (action.status === ActionStatus.REQUEST) {
    services.getProduct(action.id)
      .then((response: Partial<ProductDto>) => dispatch(loadProductSucceeded(mappers.dtoToProduct(response))))
      .catch(() => dispatch(loadProductFailed()));
  }
}

function handleProductSubmit(action: SubmitProduct, dispatch: Dispatch) {
  if (action.status === ActionStatus.REQUEST) {
    services.createProduct(mappers.productToDto(action.product))
      .then(() => dispatch(submitProductFinished(ActionStatus.SUCCESS)))
      .catch(() => dispatch(submitProductFinished(ActionStatus.FAILURE)))
  }
}