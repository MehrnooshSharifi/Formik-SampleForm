import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import "../App.css";
import Input from "./Common/Input";
import RadioInput from "./Common/RadioInput";
import SelectComponent from "./Common/SelectComponent";
import CheckBoxInput from "./Common/CheckBoxInput";

const radioOption = [
  { label: "male", value: "0" },
  { label: "femail", value: "1" },
];

const selectOption = [
  { label: "select nationality", value: "" },
  { label: "Iran", value: "IR" },
  { label: "Germany", value: "GER" },
  { label: "USA", value: "US" },
];

const checkBoxOption = [
  { label: "React.js", value: "React.js" },
  { label: "Vue.js", value: "Vue.js" },
];

let initialValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  number: "",
  gender: "",
  nationality: "",
  intrest: [],
  terms: false,
};

const onSubmit = (values) => {
  axios.post("http://localhost:3001/users" , values)
};

// const validate = (values) => {
//   let errors = {};
//   if (!values.name) errors.name = "Name is Required";
//   if (!values.email) errors.email = "email is Required";
//   if (!values.password) errors.password = "password is Required";
//   return errors;
// };

const validationSchema = Yup.object({
  name: Yup.string()
    .required("name is required")
    .min(6, "Name Lenght must be 6 character"),
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is required"),
  password: Yup.string().required("Password is Required").min(6),
  number: Yup.string()
    .required("Phone Number is Required")
    .matches(/[0-9]{11}$/, "Invalid Phone Number")
    .nullable(),

  passwordConfirm: Yup.string()
    .required("password Confirmation is Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),

  gender: Yup.string().required("gender is Required"),
  nationality: Yup.string().required("Select Your Nationality"),

  intrest: Yup.array().min(1).required("Select one of Items"),
  terms: Yup.boolean()
    .required("The terms and conditions must be accepted.")
    .oneOf([true], "The terms and conditions must be accepted."),
});

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(null);
  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    // validate,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  console.log(formik.values);
  useEffect(() => {
    axios
      .get("http://localhost:3001/users/1")
      .then((res) => setFormValues(res.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" />
        <Input formik={formik} name="number" label="PhoneNumber" />
        <Input formik={formik} name="password" label="Password" />
        <Input
          formik={formik}
          name="passwordConfirm"
          label="password Confirmation"
          type="password"
        />
        <RadioInput formik={formik} name="gender" radioOption={radioOption} />
        <SelectComponent
          selectOption={selectOption}
          name="nationality"
          formik={formik}
        />
        <CheckBoxInput
          formik={formik}
          name="intrest"
          checkBoxOption={checkBoxOption}
        />

        <input
          type="checkbox"
          id="terms"
          name="terms"
          value={true}
          onChange={formik.handleChange}
          checked={formik.values.terms}
        />
        <label htmlFor="terms">Terms and Conditions</label>

        {formik.errors.terms && formik.touched.terms && (
          <div className="error">{formik.errors.terms}</div>
        )}

        <button type="submit" disabled={!formik.isValid} >
          submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
