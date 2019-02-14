import {ProductCreateDto} from "./dto/ProductCreateDto";
import {EntityId} from "../../lib/integration/Response";
import axios, {AxiosResponse} from "axios";

export function createProduct(dto: Partial<ProductCreateDto>): Promise<EntityId> {
  return axios.post("http://localhost:3000/api/product", dto)
    .then((response: AxiosResponse<EntityId>) => response.data);
}