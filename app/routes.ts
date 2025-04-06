import { type RouteConfig, index, route} from "@react-router/dev/routes";


export default [index("routes/home.jsx"), 
    route("/login", "routes/login.jsx"),
    route("/sign-up", "routes/signup.jsx"),
    route("/dashboard", "routes/member.jsx"),
    route("/unauthorized", "routes/unauthorized.jsx"),
    route("/therapist", "routes/therapist.jsx"),
    route("/questionnaire", "routes/questions.jsx"),
    route("/profile", "routes/profile.jsx"),
    route("/pricing", "routes/pricing.jsx")
] satisfies RouteConfig;
