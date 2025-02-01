import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Api_url, REQUEST_OTP, VALIDATE_OTP } from "../../services/apiservice";
import axios from "axios";


const OTP = () => {

    const navigate = useNavigate();

    const [getOtpDetails, setOtpData] = useState({});
    const [logingResponse, setLoginResponse] = useState(null);

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



    useEffect(() => {
        const storedLoginResponse = JSON.parse(localStorage.getItem('loginResponse'));
        console.log("login response", storedLoginResponse);
        setLoginResponse(storedLoginResponse);
        // const storedLoginResponse = JSON.parse(localStorage.getItem('loginResponse'));
        // console.log("login response", storedLoginResponse);
        // setLoginResponse(storedLoginResponse);  // Corrected variable name here

        if (storedLoginResponse) {
            let payload = {
                email: storedLoginResponse.responseData.userDetails.email,
                reqFor: "Login"
            };

            axios.post(Api_url + REQUEST_OTP, payload).then((resp) => {
                console.log("otp request response", resp);

                if (resp.responseCode === 1) {
                    alert("invalid");
                } else {
                    setOtpData(resp.data.responseData)
                }

            })
                .catch({
                    // console.log("while submitting the error");
                    // console.error("Error while requesting OTP", err);

                });
        }
    }, []);

    const validateOtp = () => {
        console.log("getOtpDetails", getOtpDetails);

        if (!logingResponse);

        console.log("getOtpDetails", getOtpDetails);


        let payload = {
            "email": logingResponse.responseData.userDetails.email,
            "otpId": getOtpDetails.otpId,
            "otpNumber": formDatam.otpNumber
        };

        axios.post(Api_url + VALIDATE_OTP, payload).then((resp) => {
            console.log("=========>", resp)
            if(resp.data.responseCode === 1) {
                alert("invalied request")
            } else {
                localStorage.setItem('otpValidateResponse',JSON.stringify(resp))
                navigate('/dashboard');

            }

        }).catch((err) => {
            console.error("error occured", err);
        })
    }



    // validatd otp api call



    const handleSubmit = (e) => {
        e.preventDefault(); // డిఫాల్ట్ ఫారం సబ్మిట్‌ను ఆపడం


        const errorMessages = Object.keys(formDatam).reduce((acc, fields) => {
            acc[fields] = validation[fields](formDatam[fields]);
            return acc;
        }, {});

        setErrors(errorMessages);

        if (Object.values(errorMessages).every((err) => err === "")) {
            console.log("form submitd");

            validateOtp();

        };

    };

    const handleInputChange = (e) => {
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