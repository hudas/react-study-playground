import {submitProduct, submitProductFinished} from "./actions/SubmitProductAction";
import {ActionStatus, AppState} from "../../../Store";
import {loadProductFailed, loadProductSucceeded} from "./actions/LoadProductAction";
import {ProductDto} from "../../services/dto/ProductDto";
import * as services from "../../services/ProductService";
import * as mappers from "../../services/ProductMappers";
import * as selectors from "./ProductSelectors";

export function loadProductEffect(id: string) {
  return (dispatch: any) => {
    services.getProduct(id)
      .then((response: Partial<ProductDto>) => dispatch(loadProductSucceeded(mappers.dtoToProduct(response))))
      .catch(() => dispatch(loadProductFailed()));
  }
}

export function submitProductEffect() {
  return (dispatch: any, getState: () => AppState) => {
    dispatch(submitProduct());

    const formStateDto = mappers.productToDto(selectors.getProduct(getState()));

    return services.createProduct(formStateDto)
      .then(() => dispatch(submitProductFinished(ActionStatus.SUCCESS)))
      .catch(() => dispatch(submitProductFinished(ActionStatus.FAILURE)))
  }
}