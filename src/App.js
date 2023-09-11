import React from "react";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./pages/Login";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import Register from "./pages/register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {

    const isToken = localStorage.getItem("ADMIN");

    return (
        <div>
            <Switch>
                <Route exact path="/">
                    {isToken ? <Redirect to="/admindashboard" /> : <Redirect to="/login" />}
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/ForgotPassword">
                    <ForgotPassword />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/ResetPassword">
                    <ResetPassword />
                </Route>
                <Route path="/">
                    {isToken
                        ?
                        <AdminDashboard />
                        :
                        <Login />}
                </Route>
            </Switch>
        </div>
    );
};

export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// import AdminDashboard from "./components/AdminDashboard";
// import Login from "./pages/Login";
// import Register from "./pages/register";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";

// const App = () => {
//     const isToken = localStorage.getItem("ADMIN");

//     return (
//         <Router>
//             <Switch>
//                 <Route exact path="/">
//                     {isToken ? <Redirect to="/admindashboard" /> : <Redirect to="/login" />}
//                 </Route>
//                 <Route path="/register">
//                     <Register />
//                 </Route>
//                 <Route path="/ForgotPassword">
//                     <ForgotPassword />
//                 </Route>
//                 <Route path="/login">
//                     <Login />
//                 </Route>
//                 <Route path="/ResetPassword">
//                     <ResetPassword />
//                 </Route>
//                 <Route path="/admindashboard">
//                     {isToken ? <AdminDashboard /> : <Login />}
//                 </Route>
//             </Switch>
//         </Router>
//     );
// };

// export default App;