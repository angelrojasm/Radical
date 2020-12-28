import React, { useState, useEffect } from 'react';
import api from '../api/api'
import '../css/EditInput.css'

const EditInput = props => {

	const [atr, setAtr] = useState(props.value)
	const [editingAtr, setEditingAtr] = useState(props.value)
	const [editingError, setEditingError] = useState(false)
	const [editing,setEditing] = useState(false)

	useEffect(() => {
		setAtr(props.value)
		setEditingAtr(props.value)
	},[props.value])

	function changeValue(val) {
		props.changeValue(val)
	}
	function toggleEditing() {
		let x = !editing
		setEditing(x)
	}

	async function handleSave(e) {
		if(editingAtr === "") {
			setEditingError(true)
		} else {		
			e.preventDefault();
			if(editingAtr != atr) {

			await api.user().update(props.field,editingAtr)
			}
			setAtr(editingAtr)
			toggleEditing()
			setEditingError(false)
		}
	}
	return (
		<div id='edit-input'>
			{editing? (
				<div>
					<input id="input-value" type="text" value={editingAtr} onChange={(e)=>{
						e.preventDefault();
						setEditingAtr(e.target.value)
						}} />
					<button className="toggle-button" onClick={handleSave}>Save</button>
					{editingError && <p style={{color: 'red', fontSize: '0.75em'}}>* Value can not be empty</p>}
				</div>
			): (
				<div>
					{atr === ""? <p>Please fill in the value.</p>:<p>{atr}</p>}
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
