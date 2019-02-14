import {MixedSchema} from "yup";
import {ConsentSelection} from "../../../customers/components/form/consents-form/CustomerConsentsField";
import {AppMultiCheckboxInputSelection} from "../../form/inputs/AppMultiCheckboxInput";

export const someSelectionApprovedTest = (schema: MixedSchema) => {
  return schema.test(
    'someSelectionApproved',
    'One of selections is required',
    function (this: any, value: AppMultiCheckboxInputSelection) {

      console.log(value);
      const someSelected = Object.keys(value || {}).some((consentId) => value[consentId]);

      if (someSelected) {
        return true;
      }

      const {path} = this;
      return this.createError({path: path, message: 'One of selections is required '});
    })
};
