import React from "react";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./pages/Login";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import Register from "./pages/register";
import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword---";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
    return (
        <div>

            <Switch>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/ForgotPassword">
                    <ForgotPassword />
                </Route>
                {/* <Route path="/ChangePassword">
                    <ChangePassword />
                </Route> */}
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/ResetPassword">
                    <ResetPassword />
                </Route>
                <Route path="/">
                    <AdminDashboard />
                </Route>
                {localStorage.getItem("ADMIN") ? <Redirect to="/" /> : <Redirect to="/login" />
                }
            </Switch>
        </div>
    );
};

export default App;
