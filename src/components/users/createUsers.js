import React, { useEffect, useState } from "react";

import apiInstace from "../../interceptor/axiosInstance";
import { Api_url, USERS_LIST } from "../../services/apiservice";
import Confirmation from "../../shared/confirmation";
import axios from "axios";
import SuccessModal from "../../shared/success";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {


    const navigate = useNavigate();

    const createUserForm = {
        fname: '',
        lname: '',
        email: '',
        role: '',
        company_name: ''
    };

    const createUserError = {
        fname: '',
        lname: '',
        email: '',
        role: '',
        company_name: ''
    }
    const [formData, setFormData] = useState(createUserForm);
    const [errors, setErrors] = useState(createUserError);
    const [loginResponse, setLoginRequest] = useState(null);
    const [userList, setUserList] = useState([]);

    // confirmation modal
    const [enableConformationFlag, setConfirmationFlag] = useState(false);
    const [confirmationMsg,setConfirmationMsg] = useState("");
    const [enableSuccessFlag, setSuccesssFlag] = useState(false);


    const validations = {
        fname: (value) => (value ? "" : "First name is required"),
        lname: (value) => (value ? "" : "Last name is requied"),
        email: (value) => (value ? "" : "Email address is required"),
        role: (value) => (value ? "" : "Role Name is required"),
        company_name: (value) => (value ? "" : "Comapany name is required")
    };


    useEffect(() => {
        const loginRequestResponse = JSON.parse(localStorage.getItem("otpValidateResponse"));
        // console.log("loginRequestResponse", loginRequestResponse);
        if (loginRequestResponse && loginRequestResponse.data && loginRequestResponse.data.responseData) {
            console.log("loginRequestResponse====>", loginRequestResponse);

            setLoginRequest(loginRequestResponse.data.responseData)
        }
    }, []);

    useEffect(() => {
        if (loginResponse) {
            usersListApiCall();
        }

    }, [loginResponse]);


    const usersListApiCall = () => {
        console.log("otp request response", loginResponse);

        let payload = {
            REQ_ID: 6,
            _USER_ID: loginResponse[1][0].userId
        };


        apiInstace.post(`${Api_url}${USERS_LIST}`, payload).then((resp) => {
            console.log("response----->", resp.data.responseData[1]);

            let removeDuplicates = resp.data.responseData[1];
            console.log("suggested to remove duplicates", removeDuplicates);

            let removeDuplicated = removeDuplicates.filter((value, index, array) => array.findIndex(item => item.user_role === value.user_role) === index);
            console.log("removed duplicates", removeDuplicated);

            setUserList(removeDuplicated);

        }).catch(err => {
            console.error("fatch response is correct", err);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorMessage = Object.keys(formData).reduce((acc, fields) => {
            acc[fields] = validations[fields](formData[fields]);
            return acc
        }, {});
        setErrors(errorMessage);
        if (Object.values(errorMessage).every((err) => err === "")) {
            console.log("form submitted successfully");
            setConfirmationMsg("Are you sure want to create a new user?")
            setConfirmationFlag(true);

        } else {
            console.log("form submit validation is fail");
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((previos) => ({
            ...previos,
            [name]: value
        }));
        setErrors((previousError) => ({
            ...previousError,
            [name]: validations[name](value)
        }))
    };

    const handleConfirmation = () => {
        console.log("confimation modal enabled");
        createusers();
    }

   const createusers =() => {

    let payload = {
        "firstName": formData.fname,
        "lastName": formData.lname,
        "email": formData.email,
        "roleId": formData.role,
        "companyName":formData.company_name,
        "userId": loginResponse[1][0].userId
    }

    console.log("create user payload",payload);
    

    axios.post(Api_url+'/api/login/registration',payload).then((resp) => {
        console.log("resp",resp);
        
        if(resp.responseCode === 0) {
            alert("create user faild");
        }else {
            setConfirmationFlag(false);
            setSuccesssFlag(true);
        }
    });
   }

   const handleSuccessModal = () => {
    navigate('users/usersList');
   }


    return (
        <div className="p-4 m-4">

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-sm-6">
                        <label> First name </label>
                        <input type="text" name='fname' className="form-control" value={formData.fname} onChange={handleInputChange} />
                    </div>
                    {errors.fname && <span className="text-danger text-sm"> {errors.fname}</span>}

                    <div className="col-sm-6">
                        <label> First name </label>
                        <input type="text" name="lname" className="form-control" value={formData.lname} onChange={handleInputChange} />
                    </div>
                    {errors.lname && <span className="text-danger text-sm"> {errors.lname}</span>}

                </div>

                <div className="form-group">
                    <label> Enter Email Address </label>
                    <input type="text" name="email" className="form-control" value={formData.email} onChange={handleInputChange} />
                </div>
                {errors.email && <span className="text-danger text-sm"> {errors.email}</span>}


                <div className="form-group">

                    <label> Role </label>
                    {Array.isArray(userList) && userList.length > 0 ? (
                        <select className="form-control" name="role"  onChange={handleInputChange}>
                            <option value={''} disabled> Selected Role </option>
                            {userList.map(item => (
                                <option key={item.login_id} value={item.user_role}> {item.role_name}</option>
                            ))}
                        </select>

                    ) : (
                        <p> No user found</p>
                    )}
                </div>
                {errors.role && <span className="text-danger text-sm"> {errors.role}</span>}


                <div className="form-group">
                    <label> Comapny Name </label>
                    <input type="text" name="company_name" className="form-control" value={formData.company_name} onChange={handleInputChange} />
                </div>
                {errors.company_name && <span className="text-danger text-sm"> {errors.company_name}</span>}


                <button type="submit" className="btn btn-danger w-100 mt-4"> Submit </button>
            </form>

            {
                enableConformationFlag && (
                    <Confirmation
                        isOpen={enableConformationFlag}  // Ensure you pass the state
                        confirmationMsg={confirmationMsg}
                        onConfirm={handleConfirmation}
                        onCancel={() => setConfirmationFlag(false)}
                    />
                )
            }

            {
                enableSuccessFlag && (
                    <SuccessModal
                    isSuccessOpen={enableSuccessFlag}
                    confirmationMsg={confirmationMsg} 
                    onSuccess={handleSuccessModal}

                    onCancel={() => setSuccesssFlag(false)}

                    />
                )
            }
        </div>
    )

};

export default CreateUser;