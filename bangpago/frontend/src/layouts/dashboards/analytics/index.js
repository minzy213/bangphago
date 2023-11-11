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

function Analytics() {
	const [stores, setStores] = useState([]);

	function get_next() {}

	function get_data(url) {
		axios.get(url).then(response => {
			setStores(response.data.results);
		});
	}
	const location = useLocation().pathname;
	useEffect(() => {
		if (location === "/Recommand") {
			console.log(1111);
			get_data("http://127.0.0.1:8000/theme/");
		} else if (location === "/popular") {
			//다른거로 바꾸기
			get_data("http://127.0.0.1:8000/theme/?limit=20&offset=40");
		} else if (location === "/different") {
			//다른거로 바꾸기
			get_data("http://127.0.0.1:8000/theme/?limit=20&offset=60");
		} else {
			//다른거로 바꾸기
			get_data("http://127.0.0.1:8000/theme/?limit=20&offset=80");
		}
	}, [location]);

	return (
		<DashboardLayout>
			<DashboardNavbar />
			<MDBox py={3}>
				<MDBox mt={2}>
					<Grid container spacing={3}>
						{stores.map((store, idx) => (
							<Grid item key={idx} xs={12} md={6} lg={4} sx={{ marginRight: "5%", marginLeft: "5%" }}>
								<MDBox mt={3}>
									<BookingCard
										image={store.thumbnail}
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
		</DashboardLayout>
	);
}

export default Analytics;
