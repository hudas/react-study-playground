import {ProductDto} from "./dto/ProductDto";
import {EntityId} from "../../lib/integration/Response";
import axios, {AxiosResponse} from "axios";
import {ProductListDto} from "./dto/ProductListDto";

export function getProduct(id: string): Promise<Partial<ProductDto>> {
  return axios.get(`http://localhost:3000/api/product/${id}`)
    .then((response: AxiosResponse<ProductDto>) => response.data);
}

export function createProduct(dto: Partial<ProductDto>): Promise<EntityId> {
  return axios.post("http://localhost:3000/api/product", dto)
    .then((response: AxiosResponse<EntityId>) => response.data);
}

export function getProductList(): Promise<ProductListDto[]> {
  return axios.get("http://localhost:3000/api/product")
    .then((response: AxiosResponse<ProductListDto[]>) => response.data);
}