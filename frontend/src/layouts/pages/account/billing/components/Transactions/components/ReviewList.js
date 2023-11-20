import React, { useEffect, useState } from "react";
import MDBox from "components/MDBox";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableHeaderColumn from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import TablePagination from "@mui/material/TablePagination";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";
import { TableFooter } from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";

function TablePaginationActions(props) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = event => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = event => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = event => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = event => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
				{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
				{theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	);
}

function Row({ row, onClick, isExpanded = false }) {
	return (
		<React.Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }} onClick={onClick} style={{ cursor: "pointer" }}>
				<TableCell
					style={{
						display: "block",
						width: "100px",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					{row.user.name}
				</TableCell>
				<TableCell style={{ width: "15%" }} align="center">
					{row.grade}
				</TableCell>
				<TableCell
					style={{
						display: "block",
						width: "200px",
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					{row.content}
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={isExpanded} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								원본 댓글
							</Typography>
							{row.content}
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

const rows = [];

export default function Transactions() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [index, setIndex] = React.useState(0);
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
	const [reviews, setReviews] = useState([]);
	const [reviewcount, setReviewCount] = useState(0);

	const location = useLocation().pathname.split("/");
	useEffect(() => {
		axios.get("http://127.0.0.1:8000/review/?page=" + (page + 1) + "&themeId=" + location[3]).then(response => {
			setReviews(response.data.reviews);
			setReviewCount(response.data.review_count);
		});
	}, [page, setReviews]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const onClickRow = React.useCallback(
		comment_id => {
			if (index === comment_id) {
				setIndex(null);
			} else {
				setIndex(comment_id);
			}
		},
		[setIndex, index],
	);
	const startIdx = React.useMemo(() => {
		return page * rowsPerPage;
	}, [page, rowsPerPage]);

	const endIdx = React.useMemo(() => {
		return startIdx + rowsPerPage;
	}, [startIdx, rowsPerPage]);

	return (
		<MDBox sx={{}}>
			<TableContainer component={Paper} pt={3} pb={2} px={2}>
				<Table aria-label="collapsible table">
					<TableHead style={{ display: "table-row-group" }}>
						<TableRow>
							<TableCell>닉네임</TableCell>
							<TableCell>평점</TableCell>
							<TableCell>내용</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{reviews.map(row => {
							return (
								<Row
									key={row.id}
									row={row}
									isExpanded={row.id === index ? true : false}
									onClick={e => {
										e.preventDefault();
										onClickRow(row.id);
									}}
								/>
							);
						})}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[10]}
								colSpan={3}
								count={reviewcount}
								rowsPerPage={rowsPerPage}
								page={page}
								SelectProps={{
									inputProps: {
										"aria-label": "rows per page",
									},
									native: true,
								}}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</MDBox>
	);
}
