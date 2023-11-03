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

function Billing() {
	return (
		<BaseLayout stickyNavbar>
			<MDBox mt={7}>
				<MDBox mb={0}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={7}>
							<BillingInformation
								themeName="원한 대충 겁나게 길어버려서 넘아가는 그런 이름이다."
								themeImg="https://roomescape-backend-image.s3.ap-northeast-2.amazonaws.com/theme/d1a62adc-01ed-4a02-a1d9-7db7f820ff92.jpg"
								telNum="010-6551-6561"
								Intro="유람선을 타고 친구들과 함께 여행을 즐기던 중 갑자기 찾아온 거센 폭풍우… 삽시간에 유람선을 덥치게 되고 운이 좋게 살아남은 당신은 작은 밀림에 눈을 뜨게 된다. 사람? 아니 원숭이? 정체불명의 생명체는 당신의 친구를 허름한 건물 안으로 끌고 가버린다 . 친구를 구하기 위해 무작정 건물 안으로 들어간 당신. 그런데 무언가 이상하다.... 갇혀있는 친구, 눈앞에 보이는 이상한 기계들. 과연 이곳은 어디일까? 당신은 무사히 이곳을 탈출할 수 있을까?...."
								time="60"
								Grade="3.0"
								Location="서울특별시 노원구 어딘가 어느빌딩 1층 가장 안쪽..."
								Category="카테고리"
							/>
						</Grid>
						<Grid item xs={12} md={5}>
							<Transactions />
						</Grid>
					</Grid>
				</MDBox>
			</MDBox>
		</BaseLayout>
	);
}

export default Billing;
