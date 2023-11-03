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
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Bill from "layouts/pages/account/billing/components/Bill";

function BillingInformation({ themeName, themeImg, telNum, Intro, time, Grade, Location, Category }) {
	return (
		<Card id="delete-account">
			<MDBox pt={3} px={2}>
				<MDTypography variant="h6" fontWeight="medium">
					<strong>{themeName}</strong>
				</MDTypography>
			</MDBox>
			<MDBox pt={1} pb={2} px={2}>
				<MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
					<Grid container justifyContent="center" alignItems="center">
						<Grid item xs={6}>
							<img
								src={themeImg}
								style={{
									width: "100%",
									border: "0 solid rgba(0, 0, 0, 0.125)",
									borderRadius: "0.75rem",
									boxShadow:
										"0rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1), 0rem 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06)",
								}}
							/>
						</Grid>
						<Grid item xs={6}>
							<p style={{ marginBottom: "77%", marginLeft: "6%" }}>
								카테고리: {Category}
								<br />
								소요시간: {time}
								<br />
								평점: {Grade}점
								<br />
								전화번호: {telNum}
								<br />
								상세주소: {Location}
							</p>
						</Grid>
						<Grid item mt={3}>
							<p>intro: {Intro} 수정하려면 pages/account/billing/component/BillingInformation/index</p>
						</Grid>
					</Grid>
				</MDBox>
			</MDBox>
		</Card>
	);
}

export default BillingInformation;
