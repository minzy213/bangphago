import React from "react";
import "./Background.css";
import { Grid } from "@mui/material";
import brandWhite from "assets/images/logoDark.png";
import brandDark from "assets/images/logo.png";
import MDTypography from "components/MDTypography";

export default function Background() {
	return (
		<Grid
			className="page-name"
			container
			justifyContent="center"
			alignItems="center"
			sx={{ marginTop: "20%", position: "fixed" }}
		>
			<MDTypography>
				<img src={brandDark} className="logo-img" style={{ width: "230%" }} />
			</MDTypography>

			<MDTypography sx={{ marginLeft: "13%", marginBottom: "14%" }}>
				<h1>
					당신만을 위한 방탈출 추천 AI
					<br />
					방파고
				</h1>
			</MDTypography>
		</Grid>
	);
}
