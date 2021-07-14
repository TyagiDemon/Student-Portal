import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: "25ch",
	},
}));

export default function AddStudent() {
	let stored = localStorage.getItem(window.location);
	let saved = JSON.parse(stored);

	const classes = useStyles();

	const [student, setStudent] = useState({
		roll: "",
	});

	const addStudent = async () => {
		if (!saved) {
			alert("Please login to continue");
			return;
		}
		const query = {
			username: saved,
			roll: student.roll,
		};

		var finalRes = "";

		try {
			await axios.post("http://localhost:5000/teacher/addStudent", query);
		} catch (error) {
			finalRes = error.response.data;
		}

		if (finalRes == "")
		{
			alert(`Added Roll No: ${student.roll}`);
			window.location.reload(false);	
		} else {
			alert(finalRes);
		}
	};
	return (
		<>
			<h2>Add Student</h2>
			<form className={classes.root} noValidate autoComplete="off">
				<TextField
					id="filled-full-width"
					label="Roll No"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="filled"
					value={student.roll}
					onChange={(event) => {
						setStudent({
							...student,
							roll: event.target.value,
						});
					}}
				/>

				<Button
					variant="contained"
					onClick={addStudent}
					style={{
						backgroundColor: "steelblue",
						color: "white",
						margin: "0 auto",
						width: "80%",
					}}
				>
					Add
				</Button>
			</form>
		</>
	);
}