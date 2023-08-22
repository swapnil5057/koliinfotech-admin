import React from "react";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./pages/Login";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import Register from "./pages/register";
import ChangePassword from "./pages/ChangePassword";

const App = () => {
    return (
        <div>
            {localStorage.getItem("ADMIN") ? <Redirect to="/admindashboard" /> : <Redirect to="/login" />}
            <Switch>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/ChangePassword">
                    <ChangePassword />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/">
                    <AdminDashboard />
                </Route>
            </Switch>
        </div>
    );
};

export default App;
