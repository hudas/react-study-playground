import React, {Component} from "react";
import {ProductForm} from "../../components/form/ProductForm";
import {
  EligibilityRulesSelection, ProductEligibilityRulesFormState
} from "../../components/form/eligibility-rules/ProductEligibilityRules";
import {reduxForm} from "redux-form";
import {AppState} from "../../../Store";
import {connect} from "react-redux";
import {submitProduct} from "../../store/product/actions/SubmitProductAction";
import {withReduxFormValidation} from "../../../lib/form/validator/WithReduxFormValidation";
import {ProductGeneralDetailsFormState} from "../../components/form/general-details/ProductGeneralDetailsFormSection";
import {
  ProductPricingFormSectionState
} from "../../components/form/pricing/ProductPricingFormSection";
import {loadProduct} from "../../store/product/actions/LoadProductAction";
import {RouteComponentProps} from "react-router";
import {getProduct} from "../../store/product/ProductSelectors";


export type ProductFormState = ProductGeneralDetailsFormState & ProductPricingFormSectionState & ProductEligibilityRulesFormState;

const ManagedForm = reduxForm({
  form: 'product',
  enableReinitialize: true
})(ProductForm);

const ValidatedProductForm = withReduxFormValidation(ManagedForm);

export interface ProductUpdatePageProps extends RouteComponentProps<ProductUpdatePageRouteParams> {
  loadProduct: (id: string) => void;
  onSubmit: (value: ProductFormState) => void;
  product: ProductFormState;
}

interface ProductUpdatePageRouteParams {
  id: string;
}

class ProductUpdatePage extends Component<ProductUpdatePageProps> {

  componentDidMount(): void {
    if (this.existingId()) {
      this.props.loadProduct(this.existingId());
    }
  }

  render(): React.ReactNode {
    return (
      <ValidatedProductForm
        onSubmit={this.props.onSubmit}
        initialValues={this.props.product}
      />
    );
  }

  private existingId(): string {
    return this.props.match.params.id
  }
}

const mapStateToProps = (state: AppState) => ({
  product: getProduct(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  loadProduct: (id: string) => dispatch(loadProduct(id)),
  onSubmit: (value: any) => dispatch(submitProduct(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductUpdatePage);
