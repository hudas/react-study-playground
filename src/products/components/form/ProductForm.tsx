import React from "react";
import {reduxForm, Field, FormProps, InjectedFormProps} from "redux-form";

function ProductForm({handleSubmit}: InjectedFormProps<{ firstName: string}>) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <div>
            <Field
              name="firstName"
              component="input"
              type="text"
              placeholder="First Name"
            />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'product',
  onSubmit: (value: any) => { console.log(value) }
})(ProductForm);
