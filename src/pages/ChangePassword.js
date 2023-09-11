import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { changePassStart } from "../redux/Actions/forgotPassActions";
import { resetPassStart } from "../redux/Actions/forgotPassActions";
import { changePassStart } from "../redux/Actions/forgotPassActions";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Link } from "react-router-dom/cjs/react-router-dom";
import bannerImage from '../assets/demo/Images/koli-logo.png'

const ChangePassword = () => {
    const [data, setData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const history = useHistory();
    const dispatch = useDispatch();
    const [submitted, setSubmitted] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const users = useSelector((state) => state?.data);
    const ResetPassData = useSelector((state) => state?.forgotPassDetail)
    console.log('ResetPassData~~~~~~~>', ResetPassData)
    const isSucess = ResetPassData?.isSuccess;
    const isLoading = ResetPassData?.isLoading;

    useEffect(() => {
        if (isSucess) {
            localStorage.clear();
            history.push("/login");
        }
    }, [isSucess])
    useEffect(() => {
        if (users?.users?.status == 200) {
            window.location.reload();
        }
    })

    const validatePassword = () => {
        // Define your password validation criteria
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
        if (!data?.newPassword.match(passwordRegex)) {
            setPasswordError(
                'Password should be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*).'
            );
        } else {
            setPasswordError('');
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
        validatePassword();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setData(data);
        if (data.email != '' && data.newPassword != '' && data.currentPassword != '') {
            dispatch(changePassStart(data));
        }
    };

    return (
        <div className="flex justify-content-center border-round pt-8">
            <div className="card" style={{ width: '35rem' }}>
                <div className="flex justify-content-center">
                    <img src={bannerImage} alt="logo" style={{ width: "65%" }} />
                </div>

                <h3 className="text-center mb-8">Change Password</h3>
                <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="formgrid grid">
                        <div className="field col">
                            <label>Current Password</label>
                        </div>
                        <div className="field col">
                            <Password className={classNames({ "p-invalid": submitted && !data.currentPassword || submitted && passwordError })} id="currentPassword" name="currentPassword" label="currentPassword" type="password" placeholder="Password" value={data.currentPassword} onChange={handleChange} toggleMask feedback={false} />
                            {(submitted && !data.currentPassword && <small className="p-error">password is required.</small>) || (submitted && passwordError && <small className="p-error">{passwordError}.</small>)}
                        </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label>New Password</label>
                        </div>

                        <div className="field col">
                            <Password className={classNames({ "p-invalid": submitted && !data.newPassword || submitted && passwordError })} id="newPassword" name="newPassword" label="newPassword" type="password" placeholder="Password" value={data.newPassword} onChange={handleChange} toggleMask feedback={false} />
                            {(submitted && !data.newPassword && <small className="p-error">password is required.</small>) || (submitted && passwordError && <small className="p-error">{passwordError}.</small>)}
                        </div>
                    </div>
                    {/*confirm password */}
                    <div className="formgrid grid">
                        <div className="field col">
                            <label>Confirm Password</label>
                        </div>

                        <div className="field col">
                            <Password className={classNames({ "p-invalid": submitted && !data.confirmPassword })} id="password" name="confirmPassword" label="confirmPassword" type="password" placeholder="Confirm Password" value={data.confirmPassword} onChange={handleChange} toggleMask feedback={false} />
                            {(submitted && !data.confirmPassword && <small className="p-error">confirm is required.</small>) || (submitted && data.newPassword !== data.confirmPassword && <small className="p-error">Password dose not matched!</small>)}
                        </div>
                    </div>

                    {/* <div className="formgrid grid">
                        <div className="field col">
                            <Button label="Submit" loading={isLoading} icon="pi pi-check" className="p-button-success mr-2 mb-2" />
                        </div>
                    </div> */}
                    <div className="formgrid grid mt-3">
                        <div className="field col">
                            <Button label="Apply" icon="pi pi-check" loading={isLoading} className="p-button-success mr-2 mb-2" />
                        </div>
                        <div className="field">
                            <Button label="Cancel" onClick={() => history.goBack()} icon="pi pi-times" className="p-button-danger mr-2 mb-2" />
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}
export default ChangePassword;
