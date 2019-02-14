import {ObjectSchema, } from "yup";
import {Moment} from "moment";


export const validRangePropertiesTest = (schema: ObjectSchema<any>) => {
  return (fromProperty: string, tillProperty: string): ObjectSchema<any> => {

    return schema.test(
      'validRangeProperties',
      'Date range is invalid',
      function (this: any, value: any) {

        const {path} = this;

        const fromValue: Moment = value[fromProperty];
        const tillValue: Moment = value[tillProperty];

        if (!fromValue && !tillValue) {
          return true;
        }

        if (!fromValue && tillValue) {
          return this.createError({path: fromProperty, message: 'Date range is invalid, field is required'});
        }

        if (fromValue && !tillValue) {
          return this.createError({path: tillProperty, message: 'Date range is invalid, field is required'});
        }

        if (tillValue.isBefore(fromValue)) {
          return {
            ...this.createError({path, message: 'Date range is invalid'}),
            inner: [
              this.createError({path: fromProperty, message: 'Date range is invalid'}),
              this.createError({path: tillProperty, message: 'Date range is invalid'}),
            ]
          }
        }

        return true;
      })
  }
};
