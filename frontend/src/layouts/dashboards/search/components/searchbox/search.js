import React, { useState } from "react";
import "./search.css";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const StyledFormControlLabel = styled(props => <FormControlLabel {...props} />)(({ theme, checked }) => ({
	".MuiFormControlLabel-label": checked && {
		color: theme.palette.primary.light,
	},
}));

function MyFormControlLabel(props) {
	const radioGroup = useRadioGroup();

	let checked = false;

	if (radioGroup) {
		checked = radioGroup.value === props.value;
	}

	return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
	/**
	 * The value of the component.
	 */
	value: PropTypes.any,
};

export default function BBox() {
	const [searchValue, setSearchValue] = useState("");
	const [isname, setIsName] = useState(true);

	const InputChange = e => {
		setSearchValue(e.target.value);
	};

	const onSubmit = () => {
		axios
			.get("http://127.0.0.1:8000/search/", {
				params: {
					text: searchValue,
					isname: isname,
				},
			})
			.then(function (response) {
				window.location = "/Recommand";
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handleChange = event => {
		if (event.target.value === "first") {
			setIsName(true);
		} else {
			setIsName(false);
		}
		console.log(isname);
	};
	return (
		<Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 500 }}>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="추천 유형을 선택해주세요..."
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
			<RadioGroup name="use-radio-group" defaultValue="first" sx={{ marginLeft: "20px" }} onChange={handleChange}>
				<MyFormControlLabel value="first" label="닉네임" control={<Radio />} />
				<MyFormControlLabel value="second" label="추천 문장" control={<Radio />} />
			</RadioGroup>
		</Paper>
	);
}
