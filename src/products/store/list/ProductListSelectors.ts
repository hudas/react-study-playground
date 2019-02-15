import {AppState} from "../../../Store";
import {ProductRow} from "../../components/list/ProductList";

const getProductListState = (state: AppState) => state.productList;

export const getAllProducts = (state: AppState): ProductRow[] => {
  console.log('geeting');
  console.log(getProductListState(state).rows);
  return getProductListState(state).rows;
};