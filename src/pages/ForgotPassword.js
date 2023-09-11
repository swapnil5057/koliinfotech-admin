import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { addForgotPassStart } from '../redux/Actions/forgotPassActions';

const ForgotPassword = () => {

    const [submitted, setSubmitted] = useState(false)
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: ""
    });

    const ForgotPaddSelector=useSelector((state)=>state?.forgotPassDetail)
    console.log('ForgotPaddSelector!~~~~~~>',ForgotPaddSelector)
    const isLoading=ForgotPaddSelector?.isLoading
    const isSuccess=ForgotPaddSelector?.isSuccess


    const history = useHistory();
    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const adminChangePass = {
            email: data.email,
        };
        if (data?.email!="") {
            dispatch(addForgotPassStart(adminChangePass));
        }
    }

    // if (users?.length > 0) {
    //     console.log("first~~~~~~~~~", users)
    // }

    useEffect(() => {
        if (isSuccess) {
                history.push('/login');
            }
    })
    
    // if (users?.success === true) {
    //     history.push('/admindashboard');
    // }

    return (

        <div className="flex justify-content-center border-round mt-8">
            <div className="card" style={{ width: '35rem' }}>
                <div className="flex justify-content-center">
                    <img src='assets/layout/images/koli-logo.png' alt="logo" style={{ width: '50%' }} />
                </div>
                <h3 className="text-center mb-5">Change Password</h3>
                <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="field">
                        <label>Enter Your Email</label>
                    </div>
                    <div className="formgrid grid">

                        <div className="field col">
                            <InputText
                                className={classNames({ "p-invalid": submitted && !data.email && !validateEmail(data.email) })}
                                id="email"
                                name="email"
                                label="Email Address"
                                placeholder="Enter email"
                                value={data.email}
                                onChange={handleChange}
                                autoFocus />
                            {submitted && !data.email && <small className="p-error">Email is required.</small> || submitted && !validateEmail(data.email) && <small className="p-error">Please Enter Valid Email!</small>}
                            <span style={{fontSize:'10px',color:'green'}}>
                            {isSuccess == true ? 'Reset Password link has been sent to your email! Pleach your mail box':null}
                            </span>
                        </div>
                    </div>

                    <div className="formgrid grid mt-3">
                        <div className="field col">
                            <Button label="Apply" icon="pi pi-check" loading={isLoading} className="p-button-success mr-2 mb-2" />
                        </div>
                        <div className="field">
                            <Button label="Cancel" onClick={() => history.push("/login")} icon="pi pi-times" className="p-button-danger mr-2 mb-2" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;

