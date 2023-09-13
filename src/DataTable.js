import { useState } from "react";
import DataTableRow from "./DataTableRow";
import "../style/dataTable.css"
import React from "react";
import FormRowSelect from "./FormRowSelect";

/*
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
    const entriesPerPageSelect = ["1", "2", "3", "4", "5", "6", "7", "8"];

    //State definitions

    //Column id from the table to be sorted
    const [filterValue, setFilterValue] = useState(null);
    //Column sorting order ascend if true, descend if false
    const [ascOrder, setAscOrder] = useState(true);
    //Search bar value
    const [searchValue, setSearchValue] = useState("");
    //Number of entries displayed per table page
    const [entriesCountValue, setEntriesCountValue] = useState(entriesPerPageSelect[0]);
    //Current table page to be displayed
    const [pageValue, setPageValue] = useState(0)

    //Array of <th> to fill table head
    //onClick on <th> provides an ascending/descending sort by column
    const head = props.columns.map((e, i) => <th onClick={() => onHeaderClick(e.data)} key={"head" + i}>{e.title}</th>);

    //Search filter
    //Iterate through all columns of all rows to check if searchValue state is included
    //Retrieve in data all rows in which one or more columns contains search value
    const data = props.data.filter(row => {
        const included = props.columns.filter((c) => {
            const elem = (row[c.data] instanceof Date) ? row[c.data].toLocaleDateString('fr-FR') : row[c.data];
            return elem && elem.toLowerCase().includes(searchValue.toLowerCase());
        })
        return included.length;
    })

    //Sort filter
    //If sorting is requested on a column, will sort column by ascending / descending value
    //filterValue represents column id
    //ascOrder represents sorting order
    if(filterValue){
        data.sort((a, b) => {
            if(ascOrder){
                if(a instanceof Date){
                    return a.getTime() > b.getTime();
                }
                return a[filterValue] > b[filterValue];
            }else{
                if(a instanceof Date){
                    return a.getTime() < b.getTime();
                }
                return a[filterValue] < b[filterValue];
            }
        });
    }

    //Paging filter

    //Lower and Upper row ids boundaries defined from current table page id
    const entriesLower = pageValue * entriesCountValue;
    const entriesUpper = pageValue * entriesCountValue + entriesCountValue;

    //Retrieve in fData all rows to be display on specific page number
    const fData = data.filter((e, i) => {
        return (i >= entriesLower && i < entriesUpper);
    })

    //Creating DataTableRow components into body to be displayed
    //DataTable represents a row in the table
    //data props is an array of values, each value corresponding to a column
    const body = fData.map((e, i) => <DataTableRow key={"row-" + i} data={props.columns.map((col) => e[col.data])} id={i} />)

    /*
    * Callback function when a <th> element being clicked
    * if sorting was already appplied to the column, change sorting order
    * otherwise sort this column
    * 
    * @param colId: id of the column to be sorted
    * @return void
    */
    function onHeaderClick(colID){
        if(colID === filterValue){
            setAscOrder(!ascOrder);
        }else{
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
    function reduceRows(count){
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
    function setPage(pageID){
        if(pageID <= Math.ceil(data.length / entriesCountValue) - 1 && pageID >= 0){
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
    function search(val){
        setSearchValue(val);
        setPage(0);
    }

    return (
        <div className="dataTable">
            <div className="dataTableTop">
                <div className="entriesCountDiv">
                    {/* Dropdown component to change number of rows per page*/}
                    <FormRowSelect name="entriesCount" label="Show" onChangeState={reduceRows} options={entriesPerPageSelect.map(e => {return {value: e, label: e}})} />
                    entries
                </div>
                <div className="searchDiv">
                    <label className="searchLabel" htmlFor="search">Search:</label>
                    <input type="text" className="search" onChange={(e) => search(e.target.value)} />
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        {/* Array of <th> */}
                        {head}
                    </tr>
                </thead>
                {body.length > 0 && <tbody>{body}</tbody>}
            </table>
            {!body.length && <p className="tableNoElement">No data available in table</p>}
            <div className="dataTableBottom">
                <div>
                    {/* Page indicator (exemple: "Showing 4 to 6 of 7 entries") */}
                    Showing {(data.length) ? entriesLower + 1 : 0} to {(entriesUpper > data.length) ? data.length : entriesUpper} of {data.length} entries
                </div>
                <div className="pageNavigator">
                    <p className="previous" onClick={() => setPage(pageValue - 1)}>Previous</p>
                    <p className="next" onClick={() => setPage(pageValue + 1)}>Next</p>
                </div>
            </div>
        </div>
    );
}

export default DataTable;
