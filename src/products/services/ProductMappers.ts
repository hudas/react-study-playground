import {ProductFormState} from "../pages/update/ProductUpdatePage";
import {EligibilityRuleSelectionDto, ProductCreateDto} from "./dto/ProductCreateDto";
import {EligibilityRulesSelection} from "../components/form/eligibility-rules/ProductEligibilityRules";
import {ProductListDto} from "./dto/ProductListDto";
import {ProductRow} from "../components/list/ProductList";
import moment from "moment";

export function productToDto(product: ProductFormState): Partial<ProductCreateDto> {
  return {
    ...product,
    validFrom: product.validFrom && product.validFrom.toISOString(),
    validTill: product.validTill && product.validTill.toISOString(),
    eligibility: eligibilitySelectionToDto(product.eligibility)
  }
}

function eligibilitySelectionToDto(eligibility: EligibilityRulesSelection): EligibilityRuleSelectionDto[] {
  return Object.keys(eligibility)
    .map((ruleId) => ({ ruleId, selected: eligibility[ruleId] }))
}

export function productListDtoToRows(listDto: Partial<ProductListDto>[]): Partial<ProductRow>[] {
  return listDto.map(dto => ({
    ...dto,
    validFrom: moment(dto.validFrom),
    validTill: moment(dto.validTill)
  }))
}