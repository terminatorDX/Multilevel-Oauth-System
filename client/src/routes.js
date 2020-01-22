import Dashboard from "./views/Dashboard";
const dashboardRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        layout: "/admin"
    }
];

export default dashboardRoutes;
