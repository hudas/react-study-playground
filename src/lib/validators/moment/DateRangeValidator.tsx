import {MixedSchema, Schema,} from "yup";
import {Moment} from "moment";

export const inRangeTest = (schema: MixedSchema) => {
  return (from: Moment, to: Moment): MixedSchema => {

    return schema.test(
      'inRangeValidation',
      'Date is not in allowed range',
      function (this: any, value: Moment) {

        if (value.isBetween(from, to)) {
          return true;
        }

        const {path, message} = this;
        return this.createError({path, message});
      })
  }
};
