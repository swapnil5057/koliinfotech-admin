import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import banner2 from '../assets/demo/Images/03.jpg';
// import banner from '../assets/demo/Images/team2.png'
import { loadOurEmployeesStart } from "../redux/Actions/OurEmployeesActions";
import { loadClintsStart } from "../redux/Actions/OurClintsActions";

const Dashboard = (props) => {
    const dispatch = useDispatch();
    const [lineOptions, setLineOptions] = useState(null);
    const Employees = useSelector((state) => state?.employeesDetail?.OurEmployees?.data?.data?.count);
    const Clients = useSelector((state) => state?.clientDetail?.client?.data?.data?.count);
    console.log('Dashboard Clients~~~~~~~~~>',Clients)

    useEffect(() => {
        dispatch(loadOurEmployeesStart());
        dispatch(loadClintsStart());
    }, []);


    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: "#495057",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
                y: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
            },
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: "#ebedef",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#ebedef",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
                y: {
                    ticks: {
                        color: "#ebedef",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
            },
        };
        setLineOptions(lineOptions);
    };

    useEffect(() => {
        if (props.colorMode === "light") {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [props.colorMode]);


    return (
        <div style={{ overflowY: "hidden", overflowX: "hidden" }}>
            <div className="grid">
                <div className="col-12 lg:col-6 xl:col-6">
                        <div className="card mb-0">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">EMPLOYEES</span>
                                    <div className="text-900 font-medium text-xl">{Employees ?Employees : 0}</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                    <i className="pi pi-list text-purple-500 text-xl" />
                                </div>
                            </div>
                        </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-6">
                        <div className="card mb-0">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">CLIENTS</span>
                                    <div className="text-900 font-medium text-xl">{Clients ? Clients : 0}</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                                    <i className="pi pi-users text-blue-500 text-xl" />
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <div className="card align-items-center justify-content-center flex mt-3" style={{height:'70vh'}}>
                <img src={banner2} alt="Image" className="align-items-center dashboard-banner" style={{ borderRadius: "2%" }} />
            </div>

        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname && prevProps.colorMode === nextProps.colorMode;
};

export default React.memo(Dashboard, comparisonFn);
