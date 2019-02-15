
export interface ProductDto {
  code: string;
  name: string;
  validFrom: string;
  validTill: string;
  description: string;
  pricing: {
    oneTime: number;
    recurring: number;
  },
  eligibility: EligibilityRuleSelectionDto[];
}

export interface EligibilityRuleSelectionDto {
  ruleId: string;
  selected: boolean;
}