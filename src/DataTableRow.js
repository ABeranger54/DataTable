/*
* DataTableRow component
* Represents a row in a Table, used in DataTable
*
* @props data: Array of values, each value corresponding to a column
* @props id: id of the row in the table
*/
function DataTableRow(props) {
    
    //Array of <td>
    const rowData = props.data.map((e, i) => <td key={"row-" + props.id + "-" + i}>{e}</td>)

    return (
        <tr>
            {rowData}
        </tr>
    );
}

export default DataTableRow;
