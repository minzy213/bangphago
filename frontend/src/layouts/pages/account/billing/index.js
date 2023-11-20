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

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React components
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Billing page components
import BaseLayout from "layouts/pages/account/components/BaseLayout";
import PaymentMethod from "layouts/pages/account/billing/components/PaymentMethod";
import Invoices from "layouts/pages/account/billing/components/Invoices";
import BillingInformation from "layouts/pages/account/billing/components/BillingInformation";
import Transactions from "layouts/pages/account/billing/components/Transactions";
import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function Billing() {
	const [detail, setDetail] = useState(null);
	const [dataLoad, setDataLoad] = useState(false);

	const fetchDetail = useCallback(
		id => {
			setDataLoad(true);
			axios.get("http://127.0.0.1:8000/theme/" + id).then(response => {
				setDetail(response.data);
				setDataLoad(false);
			});
		},
		[setDetail, axios],
	);

	const location = useLocation();

	useEffect(() => {
		fetchDetail(location.pathname.split("/")[3]);
	}, [location]);

	return (
		<BaseLayout stickyNavbar>
			<MDBox mt={7}>
				<MDBox mb={0}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={8} ml={-2}>
							{detail ? (
								<BillingInformation
									themeName={detail.title}
									themeImg={detail.image}
									telNum={detail.company.tel}
									Intro={detail.intro}
									time={detail.time}
									Grade={detail.grade}
									Location={detail.company.title}
									Category={detail.category.name}
								/>
							) : (
								<CircularProgress
									color="inherit"
									size="10rem"
									thickness={7}
									sx={{ float: "right", marginRight: "25%", marginTop: "20%" }}
								/>
							)}

							{/* <BillingInformation
								themeName={detail?.title}
								themeImg={detail?.image}
								telNum={detail?.company?.tel}
								Intro={detail?.intro}
								time={detail?.time}
								Grade={detail?.grade}
								Location={detail?.company?.title}
								Category={detail?.category?.name}
							/> */}
						</Grid>
						<Grid item xs={12} md={4} ml={-1}>
							<Transactions />
						</Grid>
					</Grid>
				</MDBox>
			</MDBox>
		</BaseLayout>
	);
}

export default Billing;
