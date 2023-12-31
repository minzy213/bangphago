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

/** 
  All of the routes for the Material Dashboard 2 PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 PRO React layouts
import Analytics from "layouts/dashboards/analytics";
import Sales from "layouts/dashboards/sales";

// @mui icons
import Icon from "@mui/material/Icon";
import React, { useState } from "react";
const routes = [
	{
		type: "collapse",
		name: "모든 테마",
		key: "All",
		icon: <Icon fontSize="medium">smsOutlined</Icon>,
		noCollapse: true,
		route: "/All",
		component: <Analytics />,
	},
	{ type: "title", title: "추천기준", key: "title-pages" },
	{
		type: "collapse",
		name: "댓글기반 추천",
		key: "Recommand",
		route: "/Recommand",
		icon: <Icon fontSize="medium">recommendoutlined</Icon>,
		noCollapse: true,
		component: <Analytics />,
	},
	{
		type: "collapse",
		name: "인기순",
		key: "popular",
		route: "/popular",
		icon: <Icon fontSize="medium">groupsoutlined</Icon>,
		noCollapse: true,
		component: <Analytics />,
	},
	{
		type: "collapse",
		name: "색다름",
		key: "different",
		route: "/different",
		icon: <Icon fontSize="medium">announcementoutlined</Icon>,
		noCollapse: true,
		component: <Analytics />,
	},
];

export default routes;
