import React from "react";
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
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import TablePagination from "@mui/material/TablePagination";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";
import { TableFooter } from "@mui/material";

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

function createData(comment_id, name, grade, content, full_content) {
	return {
		comment_id,
		name,
		grade,
		content,
		full_content,
	};
}

function Row({ row, onClick, isExpanded = false }) {
	return (
		<React.Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }} onClick={onClick}>
				<TableCell component="th" scope="row">
					{row.name}
				</TableCell>
				<TableCell align="right">{row.name}</TableCell>
				<TableCell align="right">{row.grade}</TableCell>
				<TableCell align="right">{row.content}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={isExpanded} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								원본 댓글
							</Typography>
							{row.full_content}
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

const rows = [
	createData("1", "Frozen", 6.0, "testing", "전체 댓글1"),
	createData("2", "Icecream", 9.0, "testing", "전체 댓글2"),
	createData("3", "Eclair", 6.0, "testing", "전체 댓글3"),
	createData("4", "Cupcake", 3.7, "testing", "전체 댓글4"),
	createData("5", "Gingerbread", 16.0, "testing", "전체 댓글5"),
	createData("6", "gfgfgfgss", 16.0, "testing", "전체 댓글5"),
	createData("7", "gfgfgfgsserwew", 16.0, "testing", "전체 댓글5"),
	createData("8", "gfsgsfgfgsserwew", 16.0, "testing", "전체 댓글5"),
	createData("9", "agfgfgfgsserwew", 16.0, "testing", "전체 댓글5"),
	createData("10", "gfgfgfsgsserwew", 16.0, "testing", "전체 댓글5"),
];

export default function Transactions() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [index, setIndex] = React.useState(0);
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// const onClickReview = React.useCallback(()=>{

	// })

	const onClickRow = React.useCallback(
		comment_id => {
			setIndex(comment_id);
		},
		[setIndex],
	);

	return (
		<MDBox>
			<TableContainer component={Paper} pt={3} pb={2} px={2}>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell>닉네임</TableCell>
							<TableCell>평점</TableCell>
							<TableCell>내용</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map(row => (
							<Row
								key={row.comment_id}
								row={row}
								isExpanded={row.comment_id === index ? true : false}
								onClick={e => {
									e.preventDefault();
									onClickRow(row.comment_id);
								}}
							/>
							// <TableRow
							// 	id={row.comment_id}
							// 	key={row.comment_id}
							// 	onClick={e => {
							// 		// setIndex(1);
							// 		// console.log(e);
							// 		// console.log(e.target);
							// 		setIndex(e.currentTarget.id);
							// 		// console.log(e.currentTarget.id);
							// 	}}
							// >
							// 	{/* <MuiTableRowRoot> */}
							// 	<TableCell>{row.name}</TableCell>
							// 	<TableCell>{row.grade}</TableCell>
							// 	<TableCell>{row.content}</TableCell>
							// 	{/* </MuiTableRowRoot> */}
							// </TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
								colSpan={3}
								count={rows.length}
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
