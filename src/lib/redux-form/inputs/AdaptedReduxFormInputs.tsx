import {withReduxFieldProps} from "../adapter/ReduxFormPropsAdapter";
import {AppTextInput} from "../../form/inputs/AppTextInput";
import {AppSelectInput} from "../../form/inputs/AppSelectInput";
import {AppDateInput} from "../../form/inputs/AppDateInput";

export const AppReduxFormTextInput = withReduxFieldProps(AppTextInput);
export const AppReduxFormSelectInput = withReduxFieldProps(AppSelectInput);
export const AppReduxFormDateInput = withReduxFieldProps(AppDateInput);