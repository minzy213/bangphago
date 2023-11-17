import React, { useState } from "react";
import "./search.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

export default function BBox() {
	const [searchValue, setSearchValue] = useState("");

	const InputChange = e => {
		setSearchValue(e.target.value);
	};

	const onSubmit = () => {
		axios
			.get("http://127.0.0.1:8000/search/", {
				params: {
					text: searchValue,
				},
			})
			.then(function (response) {
				window.location = "/Recommand";
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	return (
		<Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="닉네임을 입력하세요..."
				type="text"
				value={searchValue}
				onChange={InputChange}
				inputProps={{ "aria-label": "search" }}
			/>
			<IconButton
				type="submit"
				sx={{ p: "10px" }}
				aria-label="search"
				onClick={onSubmit} //받은 데이터 리다이렉팅 하며 넘겨줘야함
			>
				<SearchIcon />
			</IconButton>
		</Paper>
	);
}
