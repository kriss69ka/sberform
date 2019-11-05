export const emailRegex = `^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$`;

export const required = value => (value ? undefined : "Required");
export const mustBeNumber = value =>
  isNaN(value) ? "Must be a number" : undefined;
export const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const regexpValidator = (expression, message) => value => {
  const exp = new RegExp(expression);
  return exp.test(value) ? undefined : `${message}`;
};
