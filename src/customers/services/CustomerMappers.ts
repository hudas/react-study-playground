import {ConsentSelection} from "../components/form/consents-form/CustomerConsentsField";
import {CustomerFormStateValue} from "../pages/update/CustomerUpdatePage";
import {ConsentDTO, CustomerDTO} from "./dto/CustomerUpdateDto";
import moment from "moment";

export function customerDtoToFormState(dto: Partial<CustomerDTO>): CustomerFormStateValue {
    return {
      firstName: dto.firstName,
      lastName: dto.lastName,
      birthDate: moment(dto.birthDate),
      address: dto.address,
      email: '',
      phone: '',
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

  return {
    ...form,
    birthDate: form.birthDate ? form.birthDate.toISOString() : undefined,
    consents: consentsDTO
  };
}

