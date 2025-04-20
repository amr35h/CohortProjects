import { body } from "express-validator";

const userRegistrationVaildator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required ")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username should be at least 3 chars")
      .isLength({ max: 13 })
      .withMessage("Username should not be more than 13 chars"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 3 })
      .withMessage("Password Sholud be at lease 3 chars"),
    body("role").notEmpty().withMessage("Role can't be empty"),
  ];
};

const userLoginValidator = () => {
  return [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").notEmpty().withMessage("Password can not be empty"),
  ];
};

export { userRegistrationVaildator, userLoginValidator };
