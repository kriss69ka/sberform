import React from "react";
import { Field } from "react-final-form";
import { required } from "./validators";
export default class FullName extends React.Component {
  render() {
    // const [a] = ;
    return (
      <>
        <div className="input">
          <Field name={`${this.props.a}firstName`} validate={required}>
            {({ input, meta }) => (
              <div>
                <label>Ввеедите имя: </label>
                <input {...input} type="text" placeholder="Имя" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
        </div>

        <div className="input">
          <Field name={`${this.props.a}lastName`} validate={required}>
            {({ input, meta }) => (
              <div>
                <label>Ввеедите фамилию: </label>
                <input {...input} type="text" placeholder="Фамилия" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
        </div>
        <div className="input">
          <Field name={`${this.props.a}phone`} validate={required}>
            {({ input, meta }) => (
              <div>
                <label>Ввеедите номер телефона: </label>
                <input {...input} type="text" placeholder="Телефон" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
        </div>
      </>
    );
  }
}
