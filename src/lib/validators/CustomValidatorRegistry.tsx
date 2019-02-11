import * as yup from "yup";
import {inRangeTest} from "./moment/DateRangeValidator";
import {requiredOneOfTest} from "./object/RequiredOneOfValidator";


export function registerValidations() {
  yup.addMethod<yup.MixedSchema>(yup.mixed, 'inRange', function (arg1, arg2) {
    return inRangeTest(this)(arg1, arg2);
  });
  yup.addMethod<yup.ObjectSchema<any>>(yup.object, 'requiredOneOf', function (...args) {
    return requiredOneOfTest(this)(...args);
  });
}
