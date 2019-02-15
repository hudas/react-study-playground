
export interface CustomerDTO {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  consents: ConsentDTO[];
}

export interface ConsentDTO {
  id: string;
  allowed: boolean;
}