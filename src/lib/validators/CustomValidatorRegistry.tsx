import * as yup from "yup";
import {inRangeTest} from "./moment/DateRangeValidator";
import {requiredOneOfTest} from "./object/RequiredOneOfValidator";
import {someSelectionApprovedTest} from "./mixed/SomeSelectionApprovedValidator";


export function registerValidations() {
  yup.addMethod<yup.MixedSchema>(yup.mixed, 'inRange', function (from, to) {
    return inRangeTest(this)(from, to);
  });
  yup.addMethod<yup.MixedSchema>(yup.mixed, 'someSelectionApproved', function () {
    return someSelectionApprovedTest(this);
  });

  yup.addMethod<yup.ObjectSchema<any>>(yup.object, 'requiredOneOf', function (...args) {
    return requiredOneOfTest(this)(...args);
  });
}
