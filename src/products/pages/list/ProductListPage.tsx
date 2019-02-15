import React, {Component} from "react";
import {ProductList, ProductRow} from "../../components/list/ProductList";
import {connect} from "react-redux";
import {AppState} from "../../../Store";
import {getAllProducts} from "../../store/list/ProductListSelectors";
import {Dispatch} from "redux";
import {loadProductList} from "../../store/list/ProductListActions";
import {RouteComponentProps} from "react-router";

export interface ProductListPageProps extends RouteComponentProps{
  products: ProductRow[];
  loadProducts: () => void;
}

class ProductListPage extends Component<ProductListPageProps>{

  handleProductView = (id: string) => {
    this.props.history.push(`/product/${id}`);
  };

  componentDidMount(): void {
    this.props.loadProducts();
  }

  render(): React.ReactNode {
    console.log('how?');
    console.log(this.props);
    return (
      <ProductList
        rows={this.props.products}
        onView={this.handleProductView}
      />
    );
  }
}

const mapStateToProps = (state: AppState) => {
  console.log(state);
  return {
    products: getAllProducts(state)
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadProducts: () => dispatch(loadProductList())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductListPage);