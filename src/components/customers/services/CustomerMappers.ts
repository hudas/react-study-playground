import {ConsentDTO, CustomerDTO} from "./dto/CustomerUpdateDto";
import {CustomerFormStateValue} from "../components/form/CustomerForm";
import {ConsentSelection} from "../components/form/consents-form/CustomerConsentsForm";

export function customerDtoToFormState(dto: Partial<CustomerDTO>): CustomerFormStateValue {
    return {
      firstName: dto.firstName,
      lastName: dto.lastName,
      birthDate: dto.birthDate,
      address: dto.address,
      consents: customerConsentDtoToFormState(dto.consents || [])
    };
}

function customerConsentDtoToFormState(consentsDto: ConsentDTO[]): ConsentSelection {
  return consentsDto.reduce(
    (acumulated: ConsentSelection, current: ConsentDTO) => {
      acumulated[current.id] = current.allowed
      return acumulated
    },
    {}
  )
}

export function customerFormStateToDto(form: CustomerFormStateValue): Partial<CustomerDTO> {
  const consentsDTO = Object.keys(form.consents || {})
    .map(key => ({
      id: key,
      allowed: form.consents[key]
    }));

  return {...form, consents: consentsDTO};
}
