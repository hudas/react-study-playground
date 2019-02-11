import {MixedSchema} from "yup";
import {ConsentSelection} from "../../../customers/components/form/consents-form/CustomerConsentsField";

export const someConsentsSelectedTest = (schema: MixedSchema) => {
  return schema.test(
    'someConsentsSelected',
    'One of consents is required',
    function (this: any, value: ConsentSelection) {


      const someSelected = Object.keys(value).some((consentId) => value[consentId]);

      if (someSelected) {
        return true;
      }

      const {path} = this;
      return this.createError({path: path, message: 'One of consents is required '});
    })
};
