import React from "react";
const RadioInput = ({ label, formik, name, radioOption }) => {
  return (
    <div className="formControl">
      {radioOption.map((item) => (
        <React.Fragment key={item.value}>
          <input
            type="radio"
            id={item.value}
            name={name}
            value={item.value}
            onChange={formik.handleChange}
            checked={formik.values[name] === item.value}
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

export default RadioInput;
