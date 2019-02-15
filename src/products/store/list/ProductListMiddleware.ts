import {
  LoadProductList, loadProductListFailed, loadProductListSucceded,
  ProductListActionTypes,
} from "./ProductListActions";
import {Action, Dispatch, MiddlewareAPI} from "redux";
import {ActionStatus} from "../../../Store";
import {getProductList} from "../../services/ProductService";
import {ProductListDto} from "../../services/dto/ProductListDto";
import {ProductRow} from "../../components/list/ProductList";
import {productListDtoToRows} from "../../services/ProductMappers";


export const productListMiddleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
  switch (action.type) {
    case ProductListActionTypes.LOAD:
      handleLoadProductList(action as LoadProductList, dispatch);
      break;
    default:

  }

  return next(action);
};

function handleLoadProductList(action: LoadProductList, dispatch: any) {
  if (action.status === ActionStatus.REQUEST) {
    getProductList()
      .then((listDto: ProductListDto[]) => productListDtoToRows(listDto) as ProductRow[])
      .then((rows: ProductRow[]) => dispatch(loadProductListSucceded(rows)))
      .catch((() => dispatch(loadProductListFailed())));
  }
}
