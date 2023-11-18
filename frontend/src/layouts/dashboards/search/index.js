import React from "react";
import BBox from "./components/searchbox/search";
import { Grid } from "@mui/material";
import Background from "./components/background/Background";

export default function SearchPage() {
	return (
		<div>
			<Grid
				container
				justifyContent="center"
				alignItems="center"
				sx={{ marginTop: "24%", position: "fixed", top: "7%", left: "14%", zIndex: "modal" }}
			>
				<BBox />
			</Grid>
			<Background />
		</div>
	);
}
