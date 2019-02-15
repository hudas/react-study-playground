import React from 'react';
import {CustomerGeneralDetailsForm} from "../form/general-details-form/CustomerGeneralDetailsForm";
import {CustomerFormStateValue} from "../../pages/update/CustomerUpdatePage";

export interface CustomerViewProps {
  customer: Partial<CustomerFormStateValue>;
}

export function CustomerView({ customer }: CustomerViewProps) {
  return (
    <CustomerGeneralDetailsForm value={customer} disabled/>
  );
}