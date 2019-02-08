import axios, {AxiosResponse} from "axios";
import {CustomerDTO} from "./dto/CustomerUpdateDto";
import {CustomerRow} from "../components/list/CustomerList";

export function getCustomer(id: string): Promise<Partial<CustomerDTO>> {
  return axios.get<CustomerDTO>(`http://localhost:3000/api/customer/${id}`)
    .then((response: AxiosResponse<CustomerDTO>) => response.data);
}

export function createCustomer(dto: Partial<CustomerDTO>): Promise<any> {
  return axios.post("http://localhost:3000/api/customer", dto);
}

export function updateCustomer(id: string, dto: Partial<CustomerDTO>): Promise<any> {
  return axios.put(`http://localhost:3000/api/customer/${id}`, dto);
}

export function getCustomerList(): Promise<CustomerRow[]> {
  return axios.get<CustomerRow[]>('http://localhost:3000/api/customer/list')
    .then((response: AxiosResponse<CustomerRow[]>) => response.data);
}