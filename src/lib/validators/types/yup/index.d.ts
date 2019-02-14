import { MixedSchema } from 'yup'
import * as moment from "moment";

declare module 'yup' {
  interface MixedSchema {
    inRange(from: moment.Moment, to: moment.Moment): MixedSchema;
    someSelectionApproved(): MixedSchema;
  }

  interface ObjectSchema<T> {
    requiredOneOf(...properties: (keyof T)[]): ObjectSchema<T>;
    validRangeProperties(fromProperty: string, tillProperty: string): ObjectSchema<T>;
  }
}