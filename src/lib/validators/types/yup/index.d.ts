import { MixedSchema } from 'yup'
import * as moment from "moment";

declare module 'yup' {
  interface MixedSchema {
    inRange(from: moment.Moment, to: moment.Moment): MixedSchema;
    someConsentsSelected(): MixedSchema;
  }

  interface ObjectSchema<T> {
    requiredOneOf(...properties: (keyof T)[]): ObjectSchema<T>;
  }
}