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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function BookingCard({ image, title, time, difficulty, grade, location, store_id }) {
	return (
		<Card display="flex" className="card" sx={{ width: "130%", position: "relative" }}>
			<MDBox
				position="relative"
				borderRadius="lg"
				mt={-3}
				mx={2}
				className="card-header"
				sx={{ transition: "transform 300ms cubic-bezier(0.34, 1.61, 0.7, 1)", width: "40%" }}
			>
				<MDBox
					component="img"
					src={image}
					alt={title}
					borderRadius="lg"
					shadow="md"
					width="60%"
					height="70%"
					position="relative"
					zIndex={1}
				/>
				<MDBox
					borderRadius="lg"
					shadow="md"
					width="50%"
					height="100%"
					position="absolute"
					left={0}
					top="0"
					sx={{
						backgroundImage: `url(${image})`,
						transform: "scale(0.94)",
						filter: "blur(12px)",
						backgroundSize: "cover",
					}}
				/>
			</MDBox>
			<MDBox pt={3} px={3} sx={{ width: "70%", position: "absolute", left: "26%" }}>
				<MDTypography variant="h5" fontWeight="regular" sx={{ mt: 2 }}>
					<strong>
						<a
							href={store_id}
							style={{
								color: "black",
								fontSize: "180%",
								display: "block",
								overflow: "hidden",
								whiteSpace: "nowrap",
								textOverflow: "ellipsis",
							}}
						>
							{title}
						</a>
					</strong>
				</MDTypography>
				<MDTypography variant="body2" color="text" sx={{ mt: 1.5, mb: 1 }}>
					난이도: {difficulty.toString()} / 시간: {time.toString()}분 / 평점: {grade}/5
				</MDTypography>
			</MDBox>
			<Divider />
			<MDBox display="flex" justifyContent="space-between" alignItems="center" pt={0.5} pb={3} px={3} lineHeight={1}>
				<MDBox color="text" display="flex" alignItems="center">
					<Icon color="inherit" sx={{ m: 0.5 }}>
						place
					</Icon>
					<MDTypography variant="button" fontWeight="light" color="text">
						{location}
					</MDTypography>
				</MDBox>
			</MDBox>
		</Card>
	);
}

// Typechecking props for the BookingCard
BookingCard.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	difficulty: PropTypes.number.isRequired,
	grade: PropTypes.number.isRequired,
	store_id: PropTypes.number.isRequired,
	location: PropTypes.node.isRequired,
};

export default BookingCard;
