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
import { CardContent, Grid } from "@mui/material";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Typography from "@mui/material/Typography";
// Billing page components
import Bill from "layouts/pages/account/billing/components/Bill";
import low_act from "./low_act.png";
import high_act from "./high_act.png";
import dark from "./dark.png";
import bright from "./bright.png";
import { useState } from "react";

function BillingInformation({
	themeName,
	themeImg,
	telNum,
	Intro,
	time,
	Grade,
	Location,
	Category,
	activity,
	brightness,
}) {
	const category = Category.padEnd(15, "\u00A0");

	function activity_img() {
		if (activity === null) {
			return null;
		} else if (activity === "1") {
			return (
				<Grid item marginRight={4}>
					<MDBox
						component="img"
						src={high_act}
						borderRadius="lg"
						shadow="md"
						width="100%"
						height="100%"
						position="relative"
						zIndex={1}
					/>
				</Grid>
			);
		} else {
			return (
				<Grid item marginRight={4}>
					<MDBox
						component="img"
						src={low_act}
						borderRadius="lg"
						shadow="md"
						width="100%"
						height="100%"
						position="relative"
						zIndex={1}
					/>
				</Grid>
			);
		}
	}
	function brightness_img() {
		if (brightness === null) {
			return null;
		} else if (brightness === "1") {
			return (
				<Grid item marginRight={4}>
					<MDBox
						component="img"
						src={bright}
						borderRadius="lg"
						shadow="md"
						width="100%"
						height="100%"
						position="relative"
						zIndex={1}
					/>
				</Grid>
			);
		} else {
			return (
				<Grid item marginRight={4}>
					<MDBox
						component="img"
						src={dark}
						borderRadius="lg"
						shadow="md"
						width="100%"
						height="100%"
						position="relative"
						zIndex={1}
					/>
				</Grid>
			);
		}
	}

	return (
		<Card id="delete-account">
			<MDBox pt={1} pb={2} px={2}>
				<MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
					<Grid container justifyContent="center" alignItems="center" sx={{ marginTop: "1%", marginBottom: "3.2%" }}>
						<Grid item xs={4} display="center" sx={{ marginLeft: "-9%" }}>
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
						<Grid item xs={6} sx={{ marginLeft: "5%" }}>
							<MDBox pt={3} px={0}>
								<MDTypography
									variant="h2"
									fontWeight="medium"
									sx={{
										whiteSpace: "nowrap",
										textOverflow: "ellipsis",
										width: "100%",
										display: "block",
										overflow: "hidden",
									}}
								>
									<strong>{themeName}</strong>
									<br />
									<br />
								</MDTypography>
								<p
									style={{
										width: "100%",
										display: "-webkit-box",
										WebkitBoxOrient: "vertical",
										WebkitLineClamp: "8",
										overflow: "hidden",
									}}
								>
									전화번호: {telNum}
									<br />
									카테고리: {category}
									<br />
									소요시간: {time} &emsp;/&emsp; 평점: {Grade}
									<br />
									상세주소: {Location}
									<br />
									<br />
									설명: {Intro}
								</p>
							</MDBox>
						</Grid>
					</Grid>
				</MDBox>
				<Grid container justifyContent="right" alignItems="center">
					{activity_img()}
					{brightness_img()}
				</Grid>
			</MDBox>
		</Card>
	);
}

export default BillingInformation;
