import * as yup from "yup";
import {inRangeTest} from "./moment/DateRangeValidator";


export function registerValidations() {
  yup.addMethod<yup.MixedSchema>(yup.mixed, 'inRange', inRangeTest(yup.mixed()));
}
