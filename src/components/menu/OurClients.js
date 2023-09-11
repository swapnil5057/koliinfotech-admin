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
import { loadClintsStart, deleteClientStart } from "../../redux/Actions/OurClintsActions";
import { Link } from "react-router-dom";
import { ToggleButton } from "primereact/togglebutton";

const baseUrl = process.env.REACT_APP_BASE_URL;

const OurClients = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const dt = useRef(null);
    const [clientValue, setClientValue] = useState();
    const [deleteClientDialog, setDeleteClientDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const usersListData = useSelector((state) => state?.userDetails);
    const ClientsListData = useSelector((state) => state?.clientDetail);
    const loadClientData = ClientsListData?.client?.data?.data?.rows
    const isSuccess = ClientsListData?.isSuccess;
    const isLoading = ClientsListData?.isLoading;

    useEffect(() => {
        dispatch(loadClintsStart());
    }, [isSuccess]);

    const usersList = usersListData?.users?.data?.data?.rows;


    const gotoPrevious = () => {
        history.goBack();
    };

    const hideDeleteClientDialog = () => {
        setDeleteClientDialog(false);
    };

    const confirmDeleteClient = (clientValue) => {
        console.log("value delete", clientValue.id);
        setClientValue(clientValue.id);
        setDeleteClientDialog(true);
    };

    const deleteUsers = async () => {
        setClientValue(clientValue);
        dispatch(deleteClientStart(clientValue));
        setDeleteClientDialog(false);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Link to={`/addnew-client/`}>
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
                <Link to={`/update-client/${rowData.id}`}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mt-2 mr-2" />
                </Link>
                <Link to={`/singleClient/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mt-2 mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2 mr-2" onClick={() => confirmDeleteClient(rowData)} />
            </div>
        );
    };

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img width={"50"} src={rowData.profilePicture} alt={"frame"} />
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
            <h5 className="m-0">List Of Our Clients</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteUsersDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteClientDialog} />
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
                <div className="card" >
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <DataTable
                        ref={dt}
                        value={loadClientData}
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
                        <Column field="name" header="Client's Name" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        {/* <Column field="profilePicture" header="Profile image" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column> */}
                        {/* <Column field="profilePicture" header="Profile image" alt='image' body={imageBodyTemplate} headerStyle={{ width: "10%", minWidth: "20rem" }}></Column> */}
                        <Column field="profilePicture" header="Image" alt='image' body={imageBodyTemplate} headerStyle={{ width: "10%", minWidth: "15rem" }}></Column>
                        <Column field="review" header="Review" sortable headerStyle={{ width: "35%", minWidth: "15rem" }}></Column>
                        <Column body={actionBodyTemplate}></Column>

                    </DataTable>
                    <Dialog visible={deleteClientDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={hideDeleteClientDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {clientValue && (
                                <span>
                                    Are you sure you want to delete <b>{clientValue.id}</b>?
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

export default React.memo(OurClients, comparisonFn);
