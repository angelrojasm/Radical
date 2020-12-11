import React, { useState, useEffect } from 'react';
import '../css/EditInput.css'

const EditInput = props => {

	const [atr, setAtr] = useState(props.value)
	const [editing,setEditing] = useState(false)

	function changeValue(val) {
		props.changeValue(val)
	}
	function toggleEditing() {
		let x = !editing
		setEditing(x)
	}

	return (
		<div id='edit-input'>
			{editing? (
				<div>
					<input id="input-value" type="text" value={atr} onChange={(e)=>{
						e.preventDefault();
						setAtr(e.target.value)
						}} />
					<button className="toggle-button" onClick={(e) => {
						e.preventDefault();
						toggleEditing()
					}}>Save</button>
				</div>
			): (
				<div>
					<p>{atr}</p>
					<button className="toggle-button" onClick={(e) => {
						e.preventDefault();
						toggleEditing()
					}}>Edit</button>
				</div>
			)}
		</div>
	);
};
export default EditInput;
