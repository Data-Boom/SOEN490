import { createMuiTheme } from "@material-ui/core/styles";
import { getIn } from "formik";

export const shouldComponentUpdate = (nextProps, currentProps) => {
  return nextProps.name !== currentProps.name
    || nextProps.required !== currentProps.required
    || nextProps.disabled !== currentProps.disabled
    || nextProps.readOnly !== currentProps.readOnly
    || nextProps.formik.isSubmitting !== currentProps.formik.isSubmitting
    || nextProps.component !== currentProps.component
    || Object.keys(nextProps).length !== Object.keys(currentProps).length
    || getIn(nextProps.formik.values, currentProps.name) !== getIn(currentProps.formik.values, currentProps.name)
    || getIn(nextProps.formik.errors, currentProps.name) !== getIn(currentProps.formik.errors, currentProps.name)
    || getIn(nextProps.formik.touched, currentProps.name) !== getIn(currentProps.formik.touched, currentProps.name)

}

export const disabledTheme = createMuiTheme({
  palette: {
    text: {
      disabled: 'black'
    }
  }
});