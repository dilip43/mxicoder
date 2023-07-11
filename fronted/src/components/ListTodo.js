import { Button, Space, message } from "antd";
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { AiFillEdit, AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteToDo, editTodo } from "../feature/toDoSlicer";

const ListTodo = () => {
	const { todoList } = useSelector((state) => state.toDo);
	const dispatch = useDispatch();
	const [isEditing, setEditing] = useState(false);
	const [state, setState] = useState({
		id: "",
		content: "",
		contentError: null,
	});
	const onEditToggle = (id, content) => {
		setEditing(true);
		setState({ ...state, id, content });
	};
	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
			[`${e.target.name}Error`]: null,
		});
	};
	const { content, contentError, id } = state;
	const edit = () => {
		if (content === "") {
			setState({ ...state, contentError: "You must write something!" });
			return;
		}
		dispatch(editTodo({ content, id }));
		setEditing(false);
	};
	return (
		<div>
			{isEditing ? (
				<div className='form'>
					<h2>TO DO's</h2>
					<input
						type='text'
						value={content}
						name='content'
						onChange={handleChange}></input>
					<button type='button' className='button' onClick={edit}>
						Edit
					</button>
					{contentError ? (
						<div className='error'>{contentError}</div>
					) : null}
				</div>
			) : (
				<table className='todos'>
					<thead>
						<tr>
							<th>List</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{todoList.map(({ id, content }) => {
							return (
								<tr className='grid' key={id}>
									<td className='content'>{content}</td>
									<td className='todo-action'>
										<AiOutlineCloseCircle
											className='close'
											onClick={() =>
												dispatch(deleteToDo({ id }))
											}
										/>
										<AiFillEdit
											className='edit'
											onClick={() =>
												onEditToggle(id, content)
											}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</div>
	);
};
export default ListTodo;
