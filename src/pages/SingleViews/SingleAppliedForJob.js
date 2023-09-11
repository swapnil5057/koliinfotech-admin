import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { getSingleContactStart } from "../../redux/Actions/ContactUsActions";
import { getSingleAppliedStart } from "../../redux/Actions/AppliedForJobActions";
import { Link } from "@mui/material";
const baseUrl = process.env.REACT_APP_BASE_URL;

const SingleAppliedForJob = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const SingleApplied = useSelector((state) => state?.AppliedForJobDetail);
    const SingleAppliedData = SingleApplied?.SingleApplied?.ourapplyjob;
    console.log('SingleAppliedData~~~~~~>', SingleAppliedData)

    useEffect(() => {
        dispatch(getSingleContactStart(id));
        dispatch(getSingleAppliedStart(id));
    }, [id]);

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-angle-left" className="p-button-secondary mr-2" onClick={gotoPrevious} />
                </div>
            </React.Fragment>
        );
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3">Applied Candidade Information</div>
                </div>
            </React.Fragment>
        );
    };

    const gotoPrevious = () => {
        history.goBack();
    };

    return (
        <div className="surface-section card" style={{ margin: "1%", padding: "1%" }}>
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <ul className="list-none p-0 m-0">
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Name</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">
                        {SingleAppliedData?.first_name} {SingleAppliedData?.last_name}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Gender</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">{SingleAppliedData?.gender}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Email</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">{SingleAppliedData?.email}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Phone Number</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">{SingleAppliedData?.phone}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Experience</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">{SingleAppliedData?.experience}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Available in days</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">{SingleAppliedData?.in_days
                    }</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Skills</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">{SingleAppliedData?.skills}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Resume</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">
                        {/* <Link to={SingleAppliedData?.resume} target="_blank">Resume</Link> */}
                        <a
                            href={SingleAppliedData?.resume}
                            download="Example-PDF-document"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <button>Download .pdf file</button>
                        </a>
                    </div>
                </li>

            </ul>
        </div>
    );
};

export default SingleAppliedForJob;
