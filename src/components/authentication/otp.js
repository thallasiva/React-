import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const OTP = () => {

    const navigate = useNavigate();

    const otpForm = {
        otpNuber: '',
    }

    const otpError = {
        otpNuber: ''
    };

    const [errors, setErrors] = useState(otpError);
    const [formData, setFormData] = useState(otpForm);


    const verifyOtp = () => {
        navigate('/dashboard');
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newErrors = { ...otpError }
        handleErrors('otpNuber',formData.otpNuber,newErrors);

        if(!newErrors.otpNuber) {
            verifyOtp();
        }else {
            setErrors(newErrors);
        }
    }

    const handleInputChange = (e) => {

        const { name, value } = e.target;

        setFormData((prevs) => ({
            ...prevs,
            [name]: value,
        }))

    }

    const handleErrors = (name, value, newErrors) => {
        let errorMessage = '';

        if (name === 'otpNuber') {
            errorMessage = "Otp is required";
        }
        newErrors[name] = errorMessage;
    }

    return (
        <div className="login-container">
            <div className="p-3">
                <h3 className="text-center"> Please check your email </h3>
                <p className="text-center text-sm"> We have sent you a Sign in code to email address associated with your account  </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">One Time Password</label>
                    <input type="email" className="form-control" value={formData.otpNuber} onChange={handleInputChange} />
                    {errors.otpNuber && <span className="text-danger"> {errors.otpNuber}</span>}
                </div>
                

                <button type="submit" className="btn btn-primary w-100" >Verify</button>
            </form>
        </div>
    )
}

export default OTP;