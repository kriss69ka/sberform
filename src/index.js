import React from "react";
import { render } from "react-dom";
import { Form, Field } from "react-final-form";
import Fullname from "./FullName";
import "./App.css";
import {
  required,
  emailRegex,
  composeValidators,
  regexpValidator
} from "./validators";

const Fields = ({
  names,
  subscription,
  fieldsState = {},
  children,
  originalRender
}) => {
  if (!names.length) {
    return (originalRender || children)(fieldsState);
  }
  const [name, ...rest] = names;
  return (
    <Field name={name} subscription={subscription}>
      {fieldState => (
        <Fields
          names={rest}
          subscription={subscription}
          originalRender={originalRender || children}
          fieldsState={{ ...fieldsState, [name]: fieldState }}
        />
      )}
    </Field>
  );
};

class App extends React.Component {
  state = {
    checkboxChecked: false,
    submitted: false,
    approved: false
  };

  onSubmit = values => {
    console.log(JSON.stringify(values));
    fetch("/submit", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ credit: values })
    })
      .then(res => res.json())
      .then(res => this.setState({ submitted: true, approved: res.approved }));
  };

  render() {
    const { checkboxChecked, submitted, approved } = this.state;

    return (
      <>
        {submitted && approved && <div>кредит одобрен</div>}
        {submitted && !approved && <div>кредит не одобрен</div>}
        {!submitted && (
          <>
            <h1>SberForm</h1>
            <div className="sberform">
              <Form
                onSubmit={this.onSubmit}
                initialValues={{ employed: false }}
                render={({
                  handleSubmit,
                  form,
                  submitting,
                  pristine,
                  values
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Fullname fieldsName="main" />

                    <div className="input">
                      <Field
                        name="email"
                        validate={composeValidators(
                          required,
                          regexpValidator(
                            emailRegex,
                            "Введите email в формате email@mail.com"
                          )
                        )}
                      >
                        {({ input, meta }) => (
                          <div>
                            <label>Ввеедите Email: </label>
                            <input {...input} type="text" placeholder="Email" />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>
                    <div>
                      <label>Есть ли у Вас супруг(а)? </label>

                      <Field
                        name="isMarried"
                        component="input"
                        type="checkbox"
                        checked={checkboxChecked}
                        onClick={() =>
                          this.setState({ checkboxChecked: !checkboxChecked })
                        }
                      />
                    </div>
                    {checkboxChecked && (
                      <div>
                        <Fullname />
                      </div>
                    )}
                    <div className="input">
                      <Field name="credit" validate={required}>
                        {({ input, meta }) => (
                          <div>
                            <label>Желаемая сумма кредита: </label>
                            <input
                              {...input}
                              type="number"
                              placeholder="Сумма кредите"
                            />
                            {meta.error && meta.touched && (
                              <span>{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>
                    <div className="buttons">
                      <button type="submit" disabled={submitting || pristine}>
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={form.reset}
                        disabled={submitting || pristine}
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                )}
              />{" "}
            </div>
          </>
        )}
      </>
    );
  }
}

render(<App />, document.getElementById("root"));
