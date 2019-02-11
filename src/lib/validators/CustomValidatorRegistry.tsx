import * as yup from "yup";
import {myValidationMethodTest} from "./moment/DateRangeValidator";

export function registerValidations() {
  yup.addMethod<yup.Schema<any>>(yup.string, 'myValidationMethod', function(args) {
    return myValidationMethodTest(this, args);
  });
}
