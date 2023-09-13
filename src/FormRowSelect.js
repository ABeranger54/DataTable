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
    const options = props.options.map((e, i) => (<option value={e.value} key={i}>{e.label}</option>));
    
    return (
        <div className={"formInput formSelectRow_" + props.name}>
            <label htmlFor={props.name}>{props.label}</label>
            <select id={props.name} name={props.name} onChange={e => setPropsStateOnChange(e.target.value)} defaultValue="default" disabled={props.disabled}>
                {props.default && <option value="default" disabled>{props.default}</option>}
                {options}
            </select>
        </div>
    );

    /*
    * Function used to call the onChange callback function of <select>
    *
    * @props val: value of the selected option
    * @return void
    */
    function setPropsStateOnChange(val){
        if(props.onChangeState){
            return props.onChangeState(val);
        }
    }
}

export default FormRowSelect;
