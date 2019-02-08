import {Moment} from "moment";

export interface CustomerDTO {
  firstName: string;
  lastName: string;
  birthDate: Moment | null;
  address: string;
  consents: ConsentDTO[];
}

export interface ConsentDTO {
  id: string;
  allowed: boolean;
}