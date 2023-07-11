import React, { useEffect, useRef } from "react";
import { Button, message, Space, Table } from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	FilePdfOutlined,
} from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import AddTodo from "./AddTodo";
import ListTodo from "./ListTodo";
import { useSelector } from "react-redux";
import "./Dashboard.css";

const Dashboard = () => {
	const navigate = useNavigate();
	const { todoList } = useSelector((state) => state.toDo);

	useEffect(() => {
		const checkUser = () => {
			if (!localStorage.getItem("username")) {
				navigate("/");
			}
		};
		checkUser();
	}, [navigate]);

	const signout = () => {
		localStorage.removeItem("username");
		navigate("/");
	};

	const onApprove = () => {};

	const createOrder = () => {};

	return (
		<div className='div1'>
			<div>
				<AddTodo />
				<ListTodo />
			</div>
			<div>
				<Button type='primary'>
					<CSVLink
						filename={"Expense_Table.csv"}
						data={todoList}
						className='btn btn-primary'
						onClick={() => {
							message.success("The file is downloading");
						}}>
						Export to CSV
					</CSVLink>
				</Button>

				<PayPalScriptProvider
					options={{
						"client-id":
							"Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
					}}>
					<PayPalButtons
						style={{ layout: "vertical" }}
						onApprove={onApprove}
						createOrder={createOrder}
					/>
				</PayPalScriptProvider>
			</div>
			<button onClick={signout}>Sign out</button>
		</div>
	);
};

export default Dashboard;
