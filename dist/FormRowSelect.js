"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsxRuntime = require("react/jsx-runtime");
/*
* FormRowSelect component
* Represents a <select> dropdown
* Handles non-selectable default value and callback function on change
*
* @props name: html name/id of the select tag
* @props label: innerHTML value of the label tag
* @props options: Array of object representing options in select tag. Format of object: {value: String, label: String}
* @props disabled: boolean representing the disabled state of the dropdown
* @props default: label for default option value. No props.default = no default option value
* @props onChangeState: Callback function executed when the dropdown's value changes
*/

function FormRowSelect(props) {
  //Retrieve options as <option> tags with associated value, key and label
  var options = props.options.map(function (e, i) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
      value: e.value,
      children: e.label
    }, i);
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "formInput formSelectRow_" + props.name,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
      htmlFor: props.name,
      children: props.label
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("select", {
      id: props.name,
      name: props.name,
      onChange: function onChange(e) {
        return setPropsStateOnChange(e.target.value);
      },
      defaultValue: "default",
      disabled: props.disabled,
      children: [props["default"] && /*#__PURE__*/(0, _jsxRuntime.jsx)("option", {
        value: "default",
        disabled: true,
        children: props["default"]
      }), options]
    })]
  });

  /*
  * Function used to call the onChange callback function of <select>
  *
  * @props val: value of the selected option
  * @return void
  */
  function setPropsStateOnChange(val) {
    if (props.onChangeState) {
      return props.onChangeState(val);
    }
  }
}
var _default = FormRowSelect;
exports["default"] = _default;