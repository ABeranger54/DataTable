"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _DataTableRow = _interopRequireDefault(require("./DataTableRow"));
require("../style/dataTable.css");
var _FormRowSelect = _interopRequireDefault(require("./FormRowSelect"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } /*
                                                                      * DataTable component
                                                                      * Can sort columns by ascending / descending order
                                                                      * Can apply search filter via search bar
                                                                      * Has paging system, user can choose how many entries per page the table can display (via dropdown)
                                                                      * Show entry boundaries (per page) and total entries in table
                                                                      *
                                                                      * @props data: Array of objects, each object represent a row
                                                                      * @props column: Array of objects, each object contains column name and column id
                                                                      */
function DataTable(props) {
  //Define all options values to fill FormRowSelect, which handle number of entries that a page can show
  var entriesPerPageSelect = ["1", "2", "3", "4", "5", "6", "7", "8"];

  //State definitions

  //Column id from the table to be sorted
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    filterValue = _useState2[0],
    setFilterValue = _useState2[1];
  //Column sorting order ascend if true, descend if false
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    ascOrder = _useState4[0],
    setAscOrder = _useState4[1];
  //Search bar value
  var _useState5 = (0, _react.useState)(""),
    _useState6 = _slicedToArray(_useState5, 2),
    searchValue = _useState6[0],
    setSearchValue = _useState6[1];
  //Number of entries displayed per table page
  var _useState7 = (0, _react.useState)(entriesPerPageSelect[0]),
    _useState8 = _slicedToArray(_useState7, 2),
    entriesCountValue = _useState8[0],
    setEntriesCountValue = _useState8[1];
  //Current table page to be displayed
  var _useState9 = (0, _react.useState)(0),
    _useState10 = _slicedToArray(_useState9, 2),
    pageValue = _useState10[0],
    setPageValue = _useState10[1];

  //Array of <th> to fill table head
  //onClick on <th> provides an ascending/descending sort by column
  var head = props.columns.map(function (e, i) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
      onClick: function onClick() {
        return onHeaderClick(e.data);
      },
      children: e.title
    }, "head" + i);
  });

  //Search filter
  //Iterate through all columns of all rows to check if searchValue state is included
  //Retrieve in data all rows in which one or more columns contains search value
  var data = props.data.filter(function (row) {
    var included = props.columns.filter(function (c) {
      var elem = row[c.data] instanceof Date ? row[c.data].toLocaleDateString('fr-FR') : row[c.data];
      return elem && elem.toLowerCase().includes(searchValue.toLowerCase());
    });
    return included.length;
  });

  //Sort filter
  //If sorting is requested on a column, will sort column by ascending / descending value
  //filterValue represents column id
  //ascOrder represents sorting order
  if (filterValue) {
    data.sort(function (a, b) {
      if (ascOrder) {
        if (a instanceof Date) {
          return a.getTime() > b.getTime();
        }
        return a[filterValue] > b[filterValue];
      } else {
        if (a instanceof Date) {
          return a.getTime() < b.getTime();
        }
        return a[filterValue] < b[filterValue];
      }
    });
  }

  //Paging filter

  //Lower and Upper row ids boundaries defined from current table page id
  var entriesLower = pageValue * entriesCountValue;
  var entriesUpper = pageValue * entriesCountValue + entriesCountValue;

  //Retrieve in fData all rows to be display on specific page number
  var fData = data.filter(function (e, i) {
    return i >= entriesLower && i < entriesUpper;
  });

  //Creating DataTableRow components into body to be displayed
  //DataTable represents a row in the table
  //data props is an array of values, each value corresponding to a column
  var body = fData.map(function (e, i) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DataTableRow["default"], {
      data: props.columns.map(function (col) {
        return e[col.data];
      }),
      id: i
    }, "row-" + i);
  });

  /*
  * Callback function when a <th> element being clicked
  * if sorting was already appplied to the column, change sorting order
  * otherwise sort this column
  * 
  * @param colId: id of the column to be sorted
  * @return void
  */
  function onHeaderClick(colID) {
    if (colID === filterValue) {
      setAscOrder(!ascOrder);
    } else {
      setFilterValue(colID);
    }
  }

  /*
  * Callback function when FormRowSelect changes
  * Define number of elements being displayed on each table page
  * 
  * @param count: number of elements per page
  * @return void
  */
  function reduceRows(count) {
    setEntriesCountValue(parseInt(count));
    setPage(0);
  }

  /*
  * Callback function when "Previous" or "Next" being clicked
  * Checks if page number is valid by checking it's boundaries (based on total rows count in the table)
  * 
  * @param pageID: new page id
  * @retrun void
  */
  function setPage(pageID) {
    if (pageID <= Math.ceil(data.length / entriesCountValue) - 1 && pageID >= 0) {
      setPageValue(pageID);
    }
  }

  /*
  * Callback function when input search bar changes
  * Update searchValue state, which is used to filter entries
  * 
  * @param: val: search bar content value
  * @return void
  */
  function search(val) {
    setSearchValue(val);
    setPage(0);
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "dataTable",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "dataTableTop",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "entriesCountDiv",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_FormRowSelect["default"], {
          name: "entriesCount",
          label: "Show",
          onChangeState: reduceRows,
          options: entriesPerPageSelect.map(function (e) {
            return {
              value: e,
              label: e
            };
          })
        }), "entries"]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "searchDiv",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
          className: "searchLabel",
          htmlFor: "search",
          children: "Search:"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "text",
          className: "search",
          onChange: function onChange(e) {
            return search(e.target.value);
          }
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("table", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("thead", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
          children: head
        })
      }), body.length > 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
        children: body
      })]
    }), !body.length && /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "tableNoElement",
      children: "No data available in table"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "dataTableBottom",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: ["Showing ", data.length ? entriesLower + 1 : 0, " to ", entriesUpper > data.length ? data.length : entriesUpper, " of ", data.length, " entries"]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "pageNavigator",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "previous",
          onClick: function onClick() {
            return setPage(pageValue - 1);
          },
          children: "Previous"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "next",
          onClick: function onClick() {
            return setPage(pageValue + 1);
          },
          children: "Next"
        })]
      })]
    })]
  });
}
var _default = DataTable;
exports["default"] = _default;