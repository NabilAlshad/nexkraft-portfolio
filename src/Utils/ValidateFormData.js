export const validate = (data) => {
  const errors = {};
  const stringCheck = /^[A-Za-z\s]*$/;
  const numberCheck = /^[0-9]+$/;
  const dateCheck =
    /^(?:(?:19|20)[0-9]{2})[- /.](?:0[1-9]|1[0-2])[- /.](?:0[1-9]|[12][0-9]|3[01])$/;

  //item check
  if (!data.titleValue) {
    errors.titleValue = "item is required";
  } else if (!stringCheck.test(data.titleValue)) {
    errors.titleValue = "item is not valid";
  }

  //quantity check
  if (!data.quantity) {
    errors.quantity = "quantity is required!";
  } else if (!numberCheck.test(data.quantity)) {
    errors.quantity = "quantity must be a number. ";
  }

  //price check

  if (!data.price) {
    errors.price = "price is required!";
  } else if (!numberCheck.test(data.price)) {
    errors.price = "price must be a number. ";
  }

  //date check
  if (!data.date) {
    errors.date = "date is required!";
  } else if (!dateCheck.test(data.date)) {
    errors.date = "date is not valid";
  }

  return errors;
};
