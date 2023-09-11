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

const baseUrl = process.env.REACT_APP_BASE_URL;

const OurEmployees = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dt = useRef(null);
    // const [userValue, setUserValue] = useState();
    const [employeeValue, setEmployeeValue] = useState();
    // const [deleteUserDialog, setDeleteEmployeeDialog] = useState(false);
    const [deleteEmployeeDialog, setDeleteEmployeeDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const EmployeesListData = useSelector((state) => state?.employeesDetail);
    console.log('EmployeesListData~~~~~~~~>',EmployeesListData)
    const EmployeesList=EmployeesListData?.OurEmployees?.data?.data?.rows
    const isSuccess = EmployeesListData?.isSuccess;
    const isLoading = EmployeesListData?.isLoading;

    useEffect(() => {
        dispatch(loadOurEmployeesStart());
    }, [isSuccess]);

    const gotoPrevious = () => {
        history.goBack();
    };

    const hideDeleteEmployeeDialog = () => {
        setDeleteEmployeeDialog(false);
    };

    const confirmDeleteUsers = (employeeValue) => {
        console.log("value delete", employeeValue.id);
        setEmployeeValue(employeeValue.id);
        setDeleteEmployeeDialog(true);
    };

    const deleteUsers = async () => {
        setEmployeeValue(employeeValue);
        dispatch(deleteOurEmployeeStart(employeeValue));
        setDeleteEmployeeDialog(false);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Link to={`/addnew-our-employee/`}>
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
                <Link to={`/update-our-employee/${rowData.id}`}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mt-2 mr-2" />
                </Link>
                <Link to={`/singleEmployee/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mt-2 mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2 mr-2" onClick={() => confirmDeleteUsers(rowData)} />
            </div>
        );
    };

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img width={"50"} src={rowData.image} alt={"frame"} />
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
            <h5 className="m-0">List Of Our Employees</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteUsersDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteEmployeeDialog} />
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
                <div className="card">
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <DataTable
                        ref={dt}
                        value={EmployeesList}
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
                        <Column field="firstName" header="First Name" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="lastName" header="Last Name" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="image" header="Profile Picture" alt='image' body={imageBodyTemplate} headerStyle={{ width: "10%", minWidth: "10rem" }}></Column>
                        <Column field="designation" header="Designation" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="experience" header="Experience" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column body={actionBodyTemplate}></Column>

                    </DataTable>
                    <Dialog visible={deleteEmployeeDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={hideDeleteEmployeeDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {employeeValue && (
                                <span>
                                    Are you sure you want to delete <b>{employeeValue.id}</b>?
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

export default React.memo(OurEmployees, comparisonFn);
