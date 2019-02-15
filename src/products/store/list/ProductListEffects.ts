import {
  loadProductList,
  loadProductListFailed, loadProductListSucceded,
} from "./ProductListActions";
import {getProductList} from "../../services/ProductService";
import {ProductListDto} from "../../services/dto/ProductListDto";
import {ProductRow} from "../../components/list/ProductList";
import {productListDtoToRows} from "../../services/ProductMappers";

export function loadProductListEffect() {
  return (dispatch: any) => {
    dispatch(loadProductList());
    return getProductList()
      .then((listDto: ProductListDto[]) => productListDtoToRows(listDto) as ProductRow[])
      .then((rows: ProductRow[]) => dispatch(loadProductListSucceded(rows)))
      .catch((() => dispatch(loadProductListFailed())));
  }
}
