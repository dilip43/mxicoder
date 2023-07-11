import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToDo } from "../feature/toDoSlicer";

const AddTodo = () => {
	const dispatch = useDispatch();
	const [state, setState] = useState({
		content: "",
		contentError: null,
	});
	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
			[`${e.target.name}Error`]: null,
		});
	};

	const { content, contentError } = state;

	const add = () => {
		if (content === "") {
			setState({ ...state, contentError: "You must write something!" });
			return;
		}
		dispatch(addToDo({ newContent: content }));
		setState({ ...state, content: "" });
	};

	return (
		<div>
			<h2>What's your plan for today</h2>
			<input
				type='text'
				value={content}
				name='content'
				onChange={handleChange}></input>
			<button type='button' className='button' onClick={add}>
				Add
			</button>
			{contentError ? <div className='error'>{contentError}</div> : null}
		</div>
	);
};
export default AddTodo;
