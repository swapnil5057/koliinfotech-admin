import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { getSingleUsersStart } from "../../redux/Actions/actions";
import { getSingleClientsStart } from "../../redux/Actions/OurClintsActions";
const baseUrl = process.env.REACT_APP_BASE_URL;

const SingleClient = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    // const singleClient = useSelector((state) => state);
    const singleClient = useSelector((state) => state?.clientDetail);
    const singleClientdata = singleClient?.singleClient?.ourClientData;
    console.log("single client data~~~>",singleClientdata)
    const singleuserdata = useSelector((state) => state?.userDetails?.singleUser?.userData);
    useEffect(() => {
        dispatch(getSingleClientsStart(id));
    }, []);

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-angle-left" className="p-button-secondary mr-2" onClick={gotoPrevious} />
                </div>
            </React.Fragment>
        );
    };
    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img width={"50"} src={`${baseUrl}${rowData.profile_image}`} alt={"frame"} />
            </>
        );
    };
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3">{`Client Information ${singleClientdata?.userName}`}</div>
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
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Client's Name</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleClientdata?.name}</div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Profile Image</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">
                        <img src={singleClientdata?.profilePicture} width={"150"} />
                    </div>
                </li>
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Review</div>
                    <div className="text-800 text-xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleClientdata?.review}</div>
                </li>
                
                
            </ul>
        </div>
    );
};

export default SingleClient;
