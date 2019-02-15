import * as yup from "yup";
import {inRangeTest} from "./moment/DateRangeValidator";
import {requiredOneOfTest} from "./object/RequiredOneOfValidator";
import {someConsentsSelectedTest} from "./mixed/SomeConsentSelectedValidator";


export function registerValidations() {
  yup.addMethod<yup.MixedSchema>(yup.mixed, 'inRange', function (from, to) {
    return inRangeTest(this)(from, to);
  });
  yup.addMethod<yup.MixedSchema>(yup.mixed, 'someConsentsSelected', function () {
    return someConsentsSelectedTest(this);
  });

  yup.addMethod<yup.ObjectSchema<any>>(yup.object, 'requiredOneOf', function (...args) {
    return requiredOneOfTest(this)(...args);
  });
}
