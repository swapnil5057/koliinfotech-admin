import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import classNames from "classnames";
import { addOurOpeningsStart,updateOurOpeningsStart,loadOurOpeningsStart } from "../../redux/Actions/OurOpeningsActions";
import { InputTextarea } from "primereact/inputtextarea";

let emptyOpening = {
    job_title: "",
    experience: "",
    location: "",
    description: "",
    image: "",
};

const AddEditOuropenings = () => {
    const [ourOpening, setOurOpening] = useState(emptyOpening);
    var { id, job_title, location, description, experience, image } = ourOpening;
    const dispatch = useDispatch();
    const history = useHistory();
    var { id } = useParams();
    const formData = new FormData();
    const [submitted, setSubmitted] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [mediaError, setMediaError] = useState(false);
    const OpeningSelector = useSelector((state) => state?.openingDetail)
    const OpeningList = OpeningSelector?.OurOpenings?.data?.data?.rows
    console.log('Opening list~~~~~~~~~~~~~~~>>>>>', OpeningList)
    const isSucess = OpeningSelector?.isSuccess;
    const isLoading = OpeningSelector?.isLoading;

    useEffect(() => {
        dispatch(loadOurOpeningsStart());
    }, []);

    useEffect(() => {
        if (isSucess === true) {
            history.push('/admindashboard/ourOurOpenings-list')
        }
    }, [isSucess])

    useEffect(() => {
        if (id) {
            setEditMode(true);
            const singlestatus = OpeningList ? OpeningList.find((item) => item.id === Number(id)) : null;
            setOurOpening({ ...singlestatus });
        } else {
            setEditMode(false);
            setOurOpening({ ...ourOpening })
        }
    }, [id]);

    const gotoPrevious = () => {
        history.goBack();
    };

    const addUpdatestatus = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        setOurOpening(ourOpening)
        if (job_title &&
            location &&
            description &&
            experience &&
            image &&
            !mediaError)
            if (!editMode) {
                console.log('job title', job_title, 'experience', experience, 'location', location, 'description', description, "image", image)
                formData.append("job_title", job_title)
                formData.append("location", location)
                formData.append("description", description)
                formData.append("experience", experience)
                formData.append("image", image)
                console.log( "image add======================>", image)
                 dispatch(addOurOpeningsStart(formData));
            } else {
                formData.append("id", id)
                formData.append("job_title", job_title)
                formData.append("location", location)
                formData.append("description", description)
                formData.append("experience", experience)
                formData.append("image", image)
                console.log( "image  upadte ======================>", image)
                dispatch(updateOurOpeningsStart(formData));
            }
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value);
        setOurOpening({ ...ourOpening, [name]: val });
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
            setOurOpening({ ...ourOpening, [e.target.name]: e.target.files[0] })
            return false;
        }
    }


    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3"> {!editMode ? "Add New Opening" : `Update Opening`}</div>
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
                    <div className="field">
                        <label htmlFor="name">Job Title</label>
                        <InputText id="title" value={ourOpening?.job_title} onChange={(e) => onInputChange(e, "job_title")} className={classNames({ "p-invalid": submitted && !ourOpening.job_title })} required autoFocus />
                        {submitted && !ourOpening.job_title && <small className="p-error">Job Title is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">Experience</label>
                        <InputText id="title" value={ourOpening?.experience} onChange={(e) => onInputChange(e, "experience")} className={classNames({ "p-invalid": submitted && !ourOpening.experience })} required autoFocus />
                        {submitted && !ourOpening.experience && <small className="p-error">Experience is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">Location</label>
                        <InputText id="title" value={ourOpening?.location} onChange={(e) => onInputChange(e, "location")} className={classNames({ "p-invalid": submitted && !ourOpening.location })} required autoFocus />
                        {submitted && !ourOpening.location && <small className="p-error">Location is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">Image</label>
                        <InputText
                            className={classNames({ "p-invalid": submitted && mediaError || submitted && !ourOpening.image })}
                            id="image"
                            type="file"
                            accept="/image/*"
                            name="image"
                            placeholder="Select an Image"
                            onChange={handleImageSelect}
                            required autoFocus
                        />
                        {submitted && !ourOpening.image && <small className="p-error">Profile Picture is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">Description</label>
                        <InputTextarea className={classNames({ "p-invalid": submitted && !ourOpening.description })} value={ourOpening.description} placeholder="Description" name="description" onChange={(e) => onInputChange(e, "description")} rows={4} cols={30} />
                        {submitted && !ourOpening.description && <small className="p-error">Description is required.</small>}
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

export default AddEditOuropenings;
