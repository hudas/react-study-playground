import React from 'react';
import {CustomerGeneralDetailsForm} from "../form/general-details-form/CustomerGeneralDetailsForm";
import {Customer} from "../../store/customer/CustomerState";

export interface CustomerViewProps {
  customer: Partial<Customer>;
}

export function CustomerView({ customer }: CustomerViewProps) {
  return (
    <CustomerGeneralDetailsForm value={customer} disabled/>
  );
}