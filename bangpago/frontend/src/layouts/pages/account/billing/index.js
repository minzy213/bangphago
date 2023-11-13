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
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Billing() {
	const [detail, setDetail] = useState({});

	function get_detail(id) {
		axios.get("http://127.0.0.1:8000/theme/" + id).then(response => {
			setDetail(response.data);
		});
	}

	const location = useLocation().pathname.split("/");
	useEffect(() => {
		get_detail(location[3]);
	}, []);

	return (
		<BaseLayout stickyNavbar>
			<MDBox mt={7}>
				<MDBox mb={0}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={8} ml={-2}>
							<BillingInformation
								themeName={detail.title}
								themeImg={detail.image}
								telNum="010-6551-6561 -> 없음"
								Intro={detail.intro}
								time={detail.time}
								Grade={detail.grade}
								Location="강남 비트포비아 1호점-> 없음"
								Category="카테고리-> 없음"
							/>
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
