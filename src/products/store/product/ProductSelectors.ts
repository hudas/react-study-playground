import {AppState} from "../../../Store";
import {ProductState} from "./ProductState";
import {ProductFormState} from "../../pages/update/ProductUpdatePage";

const getProductState = (state: AppState): ProductState => state.product;

export const getProduct = (state: AppState): ProductFormState => getProductState(state).product;