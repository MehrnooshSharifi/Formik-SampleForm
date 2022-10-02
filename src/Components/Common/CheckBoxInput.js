import React from "react";
const CheckBoxInput = ({ label, formik, name, checkBoxOption }) => {
  return (
    <div className="formControl">
      {checkBoxOption.map((item) => (
        <React.Fragment key={item.value}>
          <input
            type="checkbox"
            id={item.value}
            name={name}
            value={item.value}
            onChange={formik.handleChange}
            checked={formik.values[name].includes(item.value)}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </React.Fragment>
      ))}

      {formik.errors[name] && formik.touched.gender && (
        <div className="error">{formik.errors.gender}</div>
      )}
    </div>
  );
};

export default CheckBoxInput;
