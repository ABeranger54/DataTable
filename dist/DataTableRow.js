"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsxRuntime = require("react/jsx-runtime");
/*
* DataTableRow component
* Represents a row in a Table, used in DataTable
*
* @props data: Array of values, each value corresponding to a column
* @props id: id of the row in the table
*/
function DataTableRow(props) {
  //Array of <td>
  var rowData = props.data.map(function (e, i) {
    var elem = e instanceof Date ? e.toLocaleDateString('fr-FR') : e;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      children: elem
    }, "row-" + props.id + "-" + i);
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
    children: rowData
  });
}
var _default = DataTableRow;
exports["default"] = _default;