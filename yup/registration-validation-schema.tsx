import * as yup from "yup";

export const registrationValidationSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("please enter valid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be 8 chars minimum"),
    confirm_password: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();
