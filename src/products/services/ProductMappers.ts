import {ProductFormState} from "../pages/update/ProductUpdatePage";
import {EligibilityRuleSelectionDto, ProductDto} from "./dto/ProductDto";
import {EligibilityRulesSelection} from "../components/form/eligibility-rules/ProductEligibilityRules";
import {ProductListDto} from "./dto/ProductListDto";
import {ProductRow} from "../components/list/ProductList";
import moment from "moment";

export function productToDto(product: ProductFormState): Partial<ProductDto> {
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

export function dtoToProduct(product: Partial<ProductDto>): ProductFormState {
  return {
    ...product,
    validFrom: moment(product.validFrom),
    validTill: moment(product.validTill),
    eligibility: dtoToEligibilitySelection(product.eligibility)
  } as ProductFormState
}

function dtoToEligibilitySelection(selectionDto: EligibilityRuleSelectionDto[]): EligibilityRulesSelection {
  return selectionDto.reduce(
    (accumulator: EligibilityRulesSelection, current: EligibilityRuleSelectionDto) =>
      ({...accumulator, [current.ruleId]: current.selected}),
    {}
  )
}



export function productListDtoToRows(listDto: Partial<ProductListDto>[]): Partial<ProductRow>[] {
  return listDto.map(dto => ({
    ...dto,
    validFrom: moment(dto.validFrom),
    validTill: moment(dto.validTill)
  }))
}