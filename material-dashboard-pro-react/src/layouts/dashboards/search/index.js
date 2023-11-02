import React from "react";
import BBox from "./components/search";
import { Grid } from "@mui/material";

export default function SearchPage() {
	return (
		<div>
			<Grid container justifyContent="center" alignItems="center" sx={{ marginTop: "20%" }}>
				<BBox />
			</Grid>
		</div>
	);
}
