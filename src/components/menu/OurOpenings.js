import React, { useState, useEffect, useRef, useMemo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadUsersStart, deleteUsersStart } from "../../redux/Actions/actions";
import { loadOurEmployeesStart,deleteOurEmployeeStart } from "../../redux/Actions/OurEmployeesActions";
import { Link } from "react-router-dom";
import { ToggleButton } from "primereact/togglebutton";
import { loadOurOpeningsStart,deleteOurOpeningstart } from "../../redux/Actions/OurOpeningsActions";

const baseUrl = process.env.REACT_APP_BASE_URL;

const OurOpenings = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dt = useRef(null);
    const [employeeValue, setEmployeeValue] = useState();
    // const [deleteEmployeeDialog, setDeleteOpeningDialog] = useState(false);
    const [OpeningValue, setOpeningValue] = useState();
    const [deleteOpeningsDialog, setDeleteOpeningDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const OpeningData = useSelector((state) => state?.openingDetail);
    console.log('OpeningData~~~~~~~~~~~>',OpeningData)
    const OpeningList=OpeningData?.OurOpenings?.data?.data?.rows
    const isSuccess = OpeningData?.isSuccess;
    const isLoading = OpeningData?.isLoading;

    useEffect(() => {
        // dispatch(loadOurEmployeesStart());
        dispatch(loadOurOpeningsStart());
    }, [isSuccess]);

    const gotoPrevious = () => {
        history.goBack();
    };

    const hideDeleteOpeningDialog = () => {
        setDeleteOpeningDialog(false);
    };

    const confirmDeleteOpening = (OpeningValue) => {
        console.log("value delete", OpeningValue.id);
        setOpeningValue(OpeningValue.id);
        setDeleteOpeningDialog(true);
    };

    const deleteUsers = async () => {
        setOpeningValue(OpeningValue);
        dispatch(deleteOurOpeningstart(OpeningValue));
        setDeleteOpeningDialog(false);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Link to={`/addnew-opening/`}>
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
                <Link to={`/update-Opening/${rowData.id}`}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mt-2 mr-2" />
                </Link>
                <Link to={`/SingleOpening/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mt-2 mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2 mr-2" onClick={() => confirmDeleteOpening(rowData)} />
            </div>
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
            <h5 className="m-0">List Of Our Openings</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteUsersDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteOpeningDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteUsers} />
        </>
    );

    // const next = () => {
    //     setPageNo(pageNo + 1);
    // };
    // const previouse = () => {
    //     pageNo >= 2 ? setPageNo(pageNo - 1) : setPageNo(1);
    // };

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card" style={{ margin: "1%" }}>
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <DataTable
                        ref={dt}
                        value={OpeningList}
                        loading={isLoading}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users"
                        globalFilter={globalFilter}
                        emptyMessage="No Users found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column body={idBodyTemplate} header="Sr no." headerStyle={{ width: "5%", minWidth: "10rem" }}></Column>
                        <Column style={{ display: "none" }} field="uniqueId" header="UNIQUEID" sortable headerStyle={{ width: "10%", minWidth: "10rem" }}></Column>
                        <Column field="job_title" header="Job Title" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="experience" header="Experience" sortable headerStyle={{ width: "10%", minWidth: "7rem" }}></Column>
                        <Column field="description" header="Desciption" sortable headerStyle={{ width: "35%", minWidth: "25rem" }}></Column>
                        <Column field="location" header="Location" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column body={actionBodyTemplate}></Column>

                    </DataTable>
                    <Dialog visible={deleteOpeningsDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={hideDeleteOpeningDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {OpeningValue && (
                                <span>
                                    Are you sure you want to delete <b>{OpeningValue.id}</b>?
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

export default React.memo(OurOpenings, comparisonFn);
