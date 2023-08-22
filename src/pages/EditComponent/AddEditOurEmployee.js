import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from 'primereact/dropdown';
import classNames from "classnames";
import { addOurEmployeesStart,loadOurEmployeesStart,updateOurEmployeesStart } from "../../redux/Actions/OurEmployeesActions";

let emptyMediaFile = {
    firstName: "",
    lastName: "",
    position: "",
    designation: "",
    experience: "",
    image: "",
};

const AddEditOurEmployee = () => {
    // const [ourProduct, setOurEmployee] = useState(emptyMediaFile);
    const [ourEmployee, setOurEmployee] = useState(emptyMediaFile);
    var { id, firstName, lastName, position, designation, experience, image } = ourEmployee;
    // var { id, firstName, lastName, position, designation, experience, image } = ourProduct;
    const formData = new FormData();
    const dispatch = useDispatch();
    const history = useHistory();
    var { id } = useParams();
    const [submitted, setSubmitted] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [mediaError, setMediaError] = useState(false);
    const EmployeeSelector = useSelector((state) => state?.employeesDetail)
    const EmployeeData=EmployeeSelector?.OurEmployees?.data?.data?.rows
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~>>>>>', ourEmployee)
    const ProductSelector = useSelector((state) => state?.productsDetail)
    const ServiceData = EmployeeSelector?.OurServices?.data?.data?.rows;
    const ProductsData = ProductSelector?.OurProducts?.data?.data?.rows;
    const isSucess = EmployeeSelector?.isSuccess;
    const isLoading = EmployeeSelector?.isLoading;

    const Position = [
        { id: 1, position: 'HR Assistant' },
        { id: 2, position: 'Manager' },
        { id: 3, position: 'Team Leader' },
        { id: 4, position: 'Frontend Developer' },
        { id: 5, position: 'Backend Developer' },
    ];
    const Designation = [
        { id: 1, designation: 'Node JS' },
        { id: 2, designation: 'PHP laravel' },
        { id: 3, designation: 'Python' },
        { id: 4, designation: 'React JS' },
        { id: 5, designation: 'React Native / Flutter' },
        { id: 6, designation: 'React Native' },
        { id: 7, designation: 'HR Manager' },
        { id: 8, designation: 'Receptionist' },
    ];

    useEffect(() => {
        dispatch(loadOurEmployeesStart());
    }, []);

    useEffect(() => {
        if (isSucess === true) {
            history.push('/admindashboard/OurEmployees-list')
        }
    }, [isSucess])

    useEffect(() => {
        if (id) {
            setEditMode(true);
            const singlestatus = EmployeeData ? EmployeeData.find((item) => item.id === Number(id)) : null;
            setOurEmployee({ ...singlestatus });
        } else {
            setEditMode(false);
            setOurEmployee({ ...ourEmployee })
        }
    }, [id]);

    const gotoPrevious = () => {
        history.goBack();
    };

    const addUpdatestatus = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setOurEmployee(ourEmployee)
        if (firstName &&
            lastName &&
            position &&
            designation &&
            experience &&
            image &&
            !mediaError)
            if (!editMode) {
                formData.append("firstName", firstName)
                formData.append("lastName", lastName)
                formData.append("position", position)
                formData.append("designation", designation)
                formData.append("experience", experience)
                formData.append("image", image)
                console.log('firstName',firstName,'lastName',lastName,'position',position,'designation',designation,"experience",experience,"image",image)
                dispatch(addOurEmployeesStart(formData));
            } else {
                formData.append("id", id)
                formData.append("firstName", firstName)
                formData.append("lastName", lastName)
                formData.append("position", position)
                formData.append("designation", designation)
                formData.append("experience", experience)
                formData.append("image", image)
                dispatch(updateOurEmployeesStart(formData));
            }
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value);
        setOurEmployee({ ...ourEmployee, [name]: val });
    };

    const handleImageSelect = (e) => {
        let imageFile = e.target.files[0];
        if (!imageFile) {
            setMediaError('Please select image.');
            return false;
        } else if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            setMediaError('Please select valid image.');
            return false;
        } else {
            setMediaError('');
            setOurEmployee({ ...ourEmployee, [e.target.name]: e.target.files[0] })
            return false;
        }
    }


    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3"> {!editMode ? "Add New Employee" : `Update Employee`}</div>
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

    return (
        <div className="surface-section card" style={{ margin: "1%", padding: "1%" }}>
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="name">First Name</label>
                            <InputText id="title" value={ourEmployee?.firstName} onChange={(e) => onInputChange(e, "firstName")} className={classNames({ "p-invalid": submitted && !ourEmployee.firstName })} required autoFocus />
                            {submitted && !ourEmployee.firstName && <small className="p-error">First Name is required.</small>}
                        </div>
                        <div className="field col">
                            <label htmlFor="name">Last Name</label>
                            <InputText id="title" value={ourEmployee?.lastName} onChange={(e) => onInputChange(e, "lastName")} className={classNames({ "p-invalid": submitted && !ourEmployee.lastName })} required autoFocus />
                            {submitted && !ourEmployee.lastName && <small className="p-error">Last Name is required.</small>}
                        </div>
                    </div>
                    {/* --------------------~~~~~~~~~~~~~-----------!!!!!!!!!!!------------~~~~~~~~~~-------------------- */}
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="name">Position</label>
                            <Dropdown id="position" value={ourEmployee?.position} onChange={(e) => onInputChange(e, "position")} className={classNames({ "p-invalid": submitted && !ourEmployee.position })} required
                                options={Position}
                                optionValue="position"
                                placeholder="Choose a Service"
                                optionLabel="position"> </Dropdown>
                            {submitted && !ourEmployee.position && <small className="p-error">Position is required.</small>}
                        </div>
                        <div className="field col">
                            <label htmlFor="name">Designation</label>
                            <Dropdown id="designation" value={ourEmployee?.designation} onChange={(e) => onInputChange(e, "designation")} className={classNames({ "p-invalid": submitted && !ourEmployee.designation })} required
                                options={Designation}
                                optionValue="designation"
                                placeholder="Choose a Service"
                                optionLabel="designation"> </Dropdown>
                            {submitted && !ourEmployee.designation && <small className="p-error">Designation is required.</small>}
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="name">Experience</label>
                            <InputText id="title" value={ourEmployee?.experience} onChange={(e) => onInputChange(e, "experience")} className={classNames({ "p-invalid": submitted && !ourEmployee.experience })} required autoFocus />
                            {submitted && !ourEmployee.experience && <small className="p-error">experience is required.</small>}
                        </div>
                        <div className="field col">
                            <label htmlFor="name">Profile Picture</label>
                            <InputText
                                className={classNames({ "p-invalid": submitted && mediaError || submitted && !ourEmployee.image })}
                                id="image"
                                type="file"
                                accept="/image/*"
                                name="image"
                                placeholder="Select an Image"
                                onChange={handleImageSelect}
                                required autoFocus
                            />
                            {submitted && !ourEmployee.image && <small className="p-error">Profile Picture is required.</small>}
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary mr-2 mb-2" onClick={gotoPrevious} />
                        </div>
                        <div className="field col">
                            <Button label={!editMode ? "Add" : "UPDATE"} loading={isLoading} icon="pi pi-check" className="p-button-warning mr-2 mb-2" onClick={addUpdatestatus} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEditOurEmployee;
