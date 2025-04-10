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
      .withMessage("username should be at least 3 chars")
      .isLength({ max: 13 })
      .withMessage("usernmae should not be more than 13 chars"),
  ];
};

const userLoginValidator = () => {
  return [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").notEmpty().withMessage("Password can not be empty"),
  ];
};

export { userRegistrationVaildator, userLoginValidator };
