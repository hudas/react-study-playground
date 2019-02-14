import {ProductFormState} from "../pages/update/ProductUpdatePage";
import {EligibilityRuleSelectionDto, ProductCreateDto} from "./dto/ProductCreateDto";
import {EligibilityRulesSelection} from "../components/form/eligibility-rules/ProductEligibilityRules";

export function productToDto(product: ProductFormState): Partial<ProductCreateDto> {
  console.log('got it???');
  console.log(product);
  return {
    ...product,
    validFrom: product.validFrom && product.validFrom.toISOString(),
    validTill: product.validTill && product.validTill.toISOString(),
    eligibility: eligibilitySelectionToDto(product.eligibility)
  }
}

export function eligibilitySelectionToDto(eligibility: EligibilityRulesSelection): EligibilityRuleSelectionDto[] {
  return Object.keys(eligibility)
    .map((ruleId) => ({ ruleId, selected: eligibility[ruleId] }))
}