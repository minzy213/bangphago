/**
=========================================================
* Material Dashboard 2 PRO React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import BookingCard from "examples/Cards/BookingCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function Analytics() {
	const [stores, setStores] = useState([]);
	const [next, setNext] = useState();
	const [prev, setPrev] = useState();

	function get_next() {
		get_data(next);
	}

	function get_prev() {
		get_data(prev);
	}

	function get_data(url) {
		axios.get(url).then(response => {
			setStores(response.data.results);
			setNext(response.data.next);
			setPrev(response.data.previous);
		});
	}
	const location = useLocation().pathname;
	useEffect(() => {
		if (location === "/Recommand") {
			//다른거로 바꾸기
			get_data("http://127.0.0.1:8000/Recommand/");
		} else if (location === "/popular") {
			//다른거로 바꾸기
			get_data("http://127.0.0.1:8000/popular/");
		} else if (location === "/different") {
			//다른거로 바꾸기
			get_data("http://127.0.0.1:8000/different/");
		} else {
			get_data("http://127.0.0.1:8000/theme/");
		}
	}, [location]);

	return (
		<DashboardLayout>
			<DashboardNavbar />
			<MDBox py={3}>
				<MDBox mt={2}>
					<Grid container spacing={3}>
						{stores.map(store => (
							<Grid item key={store.id} xs={12} md={6} lg={4} sx={{ marginRight: "5%", marginLeft: "5%" }}>
								<MDBox mt={3}>
									<BookingCard
										image={store.image}
										title={store.title}
										time={store.time}
										difficulty={store.level}
										grade={store.grade}
										location="강남점" //{store.companyName}
										store_id={store.company + "/" + store.id}
									/>
								</MDBox>
							</Grid>
						))}
					</Grid>
				</MDBox>
			</MDBox>
			<MDBox sx={{ float: "right", width: "15%" }}>
				<Button
					sx={{
						width: "5%",
						display: "flex",
						position: "fixed",
						bottom: "5rem",
						right: "3rem",
						borderRadius: "30%",
						shadow: "sm",
					}}
				>
					{prev === null ? (
						<span className="material-icons" style={{ fontSize: "80px", color: "black" }}>
							navigate_before
						</span>
					) : (
						<span className="material-icons" style={{ fontSize: "80px", color: "black" }} onClick={get_prev}>
							navigate_before
						</span>
					)}
				</Button>
				<Button
					sx={{
						width: "5%",
						display: "flex",
						position: "fixed",
						bottom: "5rem",
						right: "0.2rem",
						borderRadius: "30%",
						shadow: "sm",
					}}
				>
					{next === null ? (
						<span className="material-icons" style={{ fontSize: "80px", color: "black" }}>
							navigate_next
						</span>
					) : (
						<span className="material-icons" style={{ fontSize: "80px", color: "black" }} onClick={get_next}>
							navigate_next
						</span>
					)}
				</Button>
			</MDBox>
		</DashboardLayout>
	);
}

export default Analytics;
