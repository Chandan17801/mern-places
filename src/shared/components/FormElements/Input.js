import React, { useReducer, useEffect } from "react";
import { validate } from "../../util/Validator";

import "./Input.css";

const reducer = (prevState, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...prevState,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCHED":
      return {
        ...prevState,
        isTouched: true,
      };
    default:
      return prevState;
  }
};

const Input = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    value: props.value || "",
    isValid: props.valid || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = state;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const isTouchHandler = () => {
    dispatch({ type: "TOUCHED" });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={isTouchHandler}
        value={state.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={isTouchHandler}
        value={state.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !state.isValid && state.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!state.isValid && state.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
