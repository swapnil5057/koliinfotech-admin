import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { deleteAppliedForJobStart, loadAppliedForJobStart } from "../../redux/Actions/AppliedForJobActions";

const AppliedForJob = () => {
    let emptyContactFile = {
        yourName: "",
        description: "",
        email: "",
        phone: "",
    };

    const dispatch = useDispatch();
    const history = useHistory();
    const dt = useRef(null);
    const [aplliedJob, setAplliedJob] = useState(emptyContactFile);
    const [deleteAplliedJobDialog, setDeleteAplliedJobDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [pageNo, setPageNo] = useState(1)
    const AppliedForJobSelector = useSelector((state) => state?.AppliedForJobDetail);
    const AppliedForJobData = AppliedForJobSelector?.AppliedForJobList?.data?.data?.rows;
    console.log('AppliedForJobSelector~~~~~~~~~>',AppliedForJobData)
    const isSuccess = AppliedForJobSelector?.isSuccess;
    const isLoading = AppliedForJobSelector?.isLoading;

    useEffect(() => {
        dispatch(loadAppliedForJobStart());
    }, [isSuccess]);

    const gotoPrevious = () => {
        history.goBack();
    };

    const hideDeleteAplliedJobDialog = () => {
        setDeleteAplliedJobDialog(false);
    };

    const confirmDeleteAplliedJob = (aplliedJob) => {
        setAplliedJob(aplliedJob);
        setDeleteAplliedJobDialog(true);
    };

    const deleteAplliedJob = () => {
        setAplliedJob(aplliedJob);
        dispatch(deleteAppliedForJobStart(aplliedJob?.id));
        setDeleteAplliedJobDialog(false);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Link to={`/addnew-ourService/`}>
                        <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
                    </Link>
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-angle-left" className="p-button-secondary mr-2" onClick={gotoPrevious} />
                </div>
            </React.Fragment>
        );
    };


    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Link to={`/SingleAppliedForJob/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mt-2 mr-2 ml-5" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2 mr-2 ml-2" onClick={() => confirmDeleteAplliedJob(rowData)} />
            </div>
        );
    };

    const idBodyTemplate = (rowData, index) => {
        return (
            <>
                <div className="actions">
                    <p>
                        <b>{index.rowIndex + 1}</b>
                    </p>
                </div>
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Applied For Job Candidate's List</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteMediaFileDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteAplliedJobDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteAplliedJob} />
        </>
    );
    // const next = () => {
    //     setPageNo(pageNo + 1)
    // }
    // const previouse = () => {
    //     pageNo >= 2 ? setPageNo(pageNo - 1) : setPageNo(1)
    // }
    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card" >
                    <Toolbar className="mb-4"  right={rightToolbarTemplate}></Toolbar>
                    <DataTable
                        ref={dt}
                        loading={isLoading}
                        value={AppliedForJobData}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Media-files"
                        globalFilter={globalFilter}
                        emptyMessage="No Media-files found."
                        header={header}
                        responsiveLayout="scroll" >
                        <Column body={idBodyTemplate} header="Sr no." headerStyle={{ width: "5%", minWidth: "10rem" }}></Column>
                        <Column field="first_name" header="First Name" sortable headerStyle={{ width: "10%", minWidth: "10rem" }}></Column>
                        <Column field="last_name" header="Last Name" sortable headerStyle={{ width: "10%", minWidth: "10rem" }}></Column>
                        <Column field="email" header="Email Add" sortable headerStyle={{ width: "10%", minWidth: "10rem" }}></Column>
                        <Column field="phone" header="Location" sortable headerStyle={{ width: "10%", minWidth: "10rem" }}></Column>
                        <Column field="current_location" header="Phone No." sortable headerStyle={{ width: "10%", minWidth: "10rem" }}></Column>
                        <Column field="experience" header="Experience" sortable headerStyle={{ width: "5%", minWidth: "5rem" }}></Column>
                        <Column field="skills" header="Skills" sortable headerStyle={{ width: "10%", minWidth: "15rem" }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                    <Dialog visible={deleteAplliedJobDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteMediaFileDialogFooter} onHide={hideDeleteAplliedJobDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {aplliedJob && (
                                <span>
                                    Are you sure you want to delete <b>{aplliedJob.yourName}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(AppliedForJob, comparisonFn);
