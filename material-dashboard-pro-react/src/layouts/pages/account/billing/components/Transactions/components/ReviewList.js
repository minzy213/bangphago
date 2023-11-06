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
					{row.name}
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
							{row.full_content}
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

const rows = [
	createData("1", "Frozen", 6.0, "#300 testinasdassssssssssssdasdasdasdasdasdg", "전체 댓글1"),
	createData("2", "Icecream", 9.0, "testing", "전체 댓글2"),
	createData("3", "Eclair", 6.0, "testing", "전체 댓글3"),
	createData("4", "Cupcake", 3.7, "testing", "전체 댓글4"),
	createData("5", "Gingerbread", 16.0, "testing", "전체 댓글5"),
	createData("6", "gfgfgfgss", 16.0, "testing", "전체 댓글5"),
	createData("7", "gfgfgfgsserwew", 16.0, "testing", "전체 댓글5"),
	createData("8", "gfsgsfgfgsserwew", 16.0, "testing", "전체 댓글5"),
	createData("9", "agfgfgfgsserwew", 16.0, "testing", "전체 댓글5"),
	createData("11", "gfgfgfsgsserwew", 16.0, "testing", "전체 댓글5"),
	createData("12", "gfgfgfsgsserwew", 16.0, "testing", "전체 댓글5"),
	createData("13", "gfgfgfsgsserwew", 16.0, "testing", "전체 댓글5"),
	createData("14", "gfgfgfsgsserwew", 16.0, "testing", "전체 댓글5"),
	createData("15", "gfgfgsdfsserwew", 16.0, "testing", "전체 댓글5"),
	createData("16", "gfgfgfsgsserwew", 16.0, "testing", "전체 댓글5"),
	createData("17", "gfadasdfvvsrwew", 16.0, "testing", "전체 댓글5"),
	createData("18", "gfgfgfsgssesdsw", 16.0, "testing", "전체 댓글5"),
	createData("19", "gfgfgfsserwsdss", 16.0, "testing", "전체 댓글5"),
	createData("20", "gfgfgfsgsaaaaew", 16.0, "testing", "전체 댓글5"),
	createData("21", "gfgfgfsgssaaaaw", 16.0, "testing", "전체 댓글5"),
	createData("22", "gfgfgfs111erwew", 16.0, "testing", "전체 댓글5"),
	createData("23", "gfgfgfsgsse1111", 16.0, "testing", "전체 댓글5"),
];

export default function Transactions() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
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
		<MDBox>
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
						{rows.map((row, idx) => {
							if (startIdx <= idx && idx < endIdx) {
								return (
									<Row
										key={row.comment_id}
										row={row}
										isExpanded={row.comment_id === index ? true : false}
										onClick={e => {
											e.preventDefault();
											onClickRow(row.comment_id);
										}}
									/>
								);
							} else {
								return null;
							}
						})}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[10, 5]}
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
