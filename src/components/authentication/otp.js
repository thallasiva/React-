import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Api_url, REQUEST_OTP } from "../../services/apiservice";
import axios from "axios";


const OTP = () =>
{

    const navigate = useNavigate();

    const [getOtpDetails, setOtpData] = useState({});

    const otpForm = {
        otpNumber: ''
    };

    const otpError = {
        otpNumber: ''
    }

    const validation = {
        otpNumber: (value) => (value ? "" : "Otp Number is Required.")
    }


    const [formDatam, setFormData] = useState(otpForm);
    const [error, setErrors] = useState(otpError);



    useEffect(() =>
    {

        const logingResponse = JSON.parse(localStorage.getItem('loginResponse'));
        console.log("login response", logingResponse);

        let payload = {
            email: logingResponse.responseData.userDetails.email,
            reqFor: "Login"
        };

        axios.post(Api_url + REQUEST_OTP, payload).then((resp) =>
        {
            console.log("otp request response", resp);

            if(resp.responseCode === 1) {
                alert("invalid");
            }else {
                setOtpData(resp.responseData)
            }

        }).catch({
            // console.log("while submitting the error");
        });

    }, []);



    // validatd otp api call
    


    const handleSubmit = (e) =>
    {
        e.preventDefault(); // డిఫాల్ట్ ఫారం సబ్మిట్‌ను ఆపడం


        const errorMessages = Object.keys(formDatam).reduce((acc, fields) =>
        {
            acc[fields] = validation[fields](formDatam[fields]);
            return acc;
        }, {});

        setErrors(errorMessages);

        if (Object.values(errorMessages).every((err) => err === ""))
        {
            console.log("form submitd");

        };

    };

    const handleInputChange = (e) =>
    {
        e.preventDefault();

        const { name, value } = e.target;

        setFormData((previos) => ({
            ...previos,
            [name]: value
        }));

        setErrors((prevError) => ({
            ...prevError,
            name: validation[name](value)
        }));

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
                    <input type="tel" className="form-control" name="otpNumber" onChange={handleInputChange} />
                    {error.otpNumber && <span className="text-danger"> {error.otpNumber}</span>}
                </div>


                <button type="submit" className="btn btn-primary w-100" >Verify</button>
            </form>
        </div>
    )
}

export default OTP;