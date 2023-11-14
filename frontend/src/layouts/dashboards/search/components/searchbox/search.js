import React, { useState } from "react";
import "./search.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

export default function BBox() {
	const [nickname, setNickname] = useState("");

	const onInputChange = e => {
		setNickname(e.target.value);
	};

	const onSubmit = () => {
		console.log(nickname);
	};
	return (
		<Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="닉네임을 입력하세요..."
				value={nickname}
				onChange={onInputChange}
				inputProps={{ "aria-label": "search" }}
			/>
			<IconButton
				type="submit"
				sx={{ p: "10px" }}
				aria-label="search"
				onClick={() => {
					axios
						.get()
						.then(response => {
							setText([...response.data]);
							console.log(response.data);
						})
						.catch(function (error) {
							console.log(error);
						});
				}} //받은 데이터 리다이렉팅 하며 넘겨줘야함
			>
				<SearchIcon />
			</IconButton>
		</Paper>
	);
}
