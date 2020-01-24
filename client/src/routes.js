import Dashboard from "./views/Dashboard";
import Student from './views/Student';
import Teacher from './views/Teacher'
const dashboardRoutes = [{
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        layout: "/"
    }, {
        path: "/student",
        name: "Student",
        component: Student,
        layout: "/nonadmin"
    },
    {
        path: "/teacher",
        name: "Teacher",
        component: Teacher,
        layout: "/admin"
    }
];

export default dashboardRoutes;