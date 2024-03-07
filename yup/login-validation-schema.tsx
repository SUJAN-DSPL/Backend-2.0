import * as yup from "yup";

export const loginValidationSchema = yup
  .object({
    email: yup
      .string()
      .email("please enter valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be 8 chars minimum"),
  })
  .required();
