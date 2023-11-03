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
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ReviewList from "./components/ReviewList";
// import MDButton from "components/MDButton";

// Billing page components
import Transaction from "layouts/pages/account/billing/components/Transaction";

function Transactions() {
	return (
		<Card sx={{ height: "100%" }}>
			<MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
				<MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
					댓글
				</MDTypography>
				<MDBox display="flex" alignItems="flex-start">
					<MDBox color="text" mr={0.5} lineHeight={0}>
						<Icon color="inherit" fontSize="small">
							articleOutlined
						</Icon>
					</MDBox>
				</MDBox>
			</MDBox>
			<ReviewList />
		</Card>
	);
}

export default Transactions;
